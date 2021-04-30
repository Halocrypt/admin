import { Events, IUser, RendererProps } from "@/interfaces";
import { adminActionBox, userItem, userNameCss } from "./Users.style";
import {
  deleteUser,
  disqualifyUser,
  listUsers,
  requalifyUser,
} from "@/packages/halo-api/admin";

import { AnimatedInput } from "@/components/AnimatedInput";
import { Form } from "@/components/Form";
import { HaloIcon } from "@/components/Icons/Halo";
import { ModalLayout } from "@/components/Modal";
import { Paginate } from "@/components/Paginate/Paginate";
import { ProfileViewerWithContent } from "@/pages/ProfileViewer";
import { actionButton } from "@/styles";
import { client } from "@/bridge";
import { css } from "catom";
import { inputWrapperClass } from "@/components/SignIn/inputWrapperClass";
import { resourceContainer } from "../../DashTasks.style";
import { useFilteredUsers } from "./use-filtered-users";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";

export function UsersList({ event }: { event: Events }) {
  const [users, fetchUsers, error, setUsers] = useResource(listUsers, [event]);

  if (error) return <div class={css({ color: "red" })}>{error}</div>;
  if (!users) return <div>Loading... </div>;
  return (
    <UserRenderer
      event={event}
      fetchUsers={fetchUsers}
      users={users}
      setUsers={setUsers}
    />
  );
}

function UserRenderer({ fetchUsers, users, setUsers }: RendererProps) {
  const [search, setSearch] = useState("");
  const filteredUsers = useFilteredUsers(users, search);
  const [message, setMessage] = useState(null);
  const [nextAction, setNextAction] = useState<(...a: any) => void>(null);
  const [error, setError] = useState("");
  const [profView, setProfView] = useState<IUser>(null);
  const [dqUser, setDq] = useState<IUser>(null);

  function reset() {
    setMessage("");
    setError("");
    setDq(null);
    setNextAction(null);
  }
  const onSuccess = () => {
    setMessage("Syncing..");
    fetchUsers(true).then(reset);
  };
  function handleDisqualify(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    if (message) return;
    const { currentTarget } = e;
    const { index } = currentTarget.dataset;
    const u = users[+index];
    setDq(u);
    const name = u.user;
    setNextAction(() => async (reason: string, points: number) => {
      setMessage("Disqualifying");
      const result = await disqualifyUser(name, { reason, points }).result;
      const { data, error } = result;
      setError(error || "");
      setMessage("");
      if (data) {
        onSuccess();
      }
    });
  }
  function handleDelete(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    if (message) return;
    const { currentTarget } = e;
    const { user, name } = currentTarget.dataset;
    setError("");
    setMessage(`Delete ${user} (${name})?`);
    setNextAction(() => async () => {
      setMessage("Deleting..");
      const result = await deleteUser(user).result;

      const { data, error } = result;
      setError(error || "");
      if (data) {
        onSuccess();
      }
    });
  }
  function handleRequalify(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    if (message) return;
    const { currentTarget } = e;
    const { user, name } = currentTarget.dataset;
    setError("");
    setMessage(`Requalify ${user} (${name})?`);
    setNextAction(() => async () => {
      setMessage("Submitting..");
      const result = await requalifyUser(user).result;

      const { data, error } = result;
      setError(error || "");
      if (data) {
        onSuccess();
      }
    });
  }
  const me = client.getState().user;
  if (profView)
    return (
      <ProfileViewerWithContent
        close={() => setProfView(null)}
        user={profView}
        onUpdate={(newProf) => {
          const currentId = newProf._id;
          setUsers(users.map((x) => (x._id === currentId ? newProf : x)));
        }}
      />
    );
  return (
    <>
      {(message || dqUser) && (
        <ModalLayout close={reset}>
          <div class={css({ color: "red" })}>{error}</div>
          <div>
            {message}
            {dqUser && <DqReason onSubmit={nextAction} user={dqUser} />}
          </div>
          {!dqUser && (
            <div class={css({ textAlign: "right" })}>
              <button class={actionButton} onClick={nextAction}>
                ok
              </button>
            </div>
          )}
        </ModalLayout>
      )}
      <AnimatedInput
        value={search}
        onInput={setSearch}
        labelText="Search"
        wrapperClass={inputWrapperClass}
      />
      <div class={resourceContainer}>
        <Paginate
          atOnce={100}
          items={filteredUsers}
          dualButtons={true}
          buttonClass={actionButton}
          render={(x: IUser, i: number) => (
            <div class={userItem}>
              <div>
                <span class={userNameCss}>
                  {x.is_admin && (
                    <HaloIcon
                      size={"2rem"}
                      className={css({ transform: "translateY(.5rem)" })}
                    />
                  )}{" "}
                  {x.user}
                </span>{" "}
                ({x.name}) - ({x.points} points) {x.user === me && "(You)"}{" "}
                {x.is_disqualified && (
                  <span class={css({ color: "red" })}>(Disqualified)</span>
                )}
              </div>
              <div class={adminActionBox} data-db-actions>
                <button
                  data-index={i}
                  onClick={(e) =>
                    setProfView(filteredUsers[+e.currentTarget.dataset.index])
                  }
                  class={css({ textDecoration: "underline" })}
                >
                  Profile
                </button>
                {!x.is_admin && (
                  <>
                    <button
                      class={actionButton}
                      style={{ "--fg": x.is_disqualified ? "green" : "red" }}
                      data-index={i}
                      data-user={x.user}
                      data-name={x.name}
                      onClick={
                        x.is_disqualified ? handleRequalify : handleDisqualify
                      }
                    >
                      {x.is_disqualified ? "Requalify" : "Disqualify"}
                    </button>
                    <button
                      class={actionButton}
                      style={{ "--fg": "red" }}
                      data-user={x.user}
                      data-name={x.name}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
}

function DqReason({
  user,
  onSubmit,
}: {
  user: IUser;
  onSubmit(...a: any): void;
}) {
  const [reason, setReason] = useState("");
  const [dqPoints, setDqPoints] = useState(10);
  return (
    <Form onSubmit={() => onSubmit(reason, dqPoints)}>
      <div>
        Disqualify {user.user} ({user.name})?
      </div>
      <AnimatedInput
        wrapperClass={inputWrapperClass}
        value={reason}
        onInput={setReason}
        labelText="Reason"
      />
      <AnimatedInput
        wrapperClass={inputWrapperClass}
        value={"" + dqPoints}
        type="number"
        onInput={(x) => setDqPoints(+x)}
        labelText="Deduct Points"
      />

      <button class={actionButton}>Submit</button>
    </Form>
  );
}
