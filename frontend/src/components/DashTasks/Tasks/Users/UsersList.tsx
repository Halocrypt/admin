import { Events, IUser, RendererProps } from "@/interfaces";
import { adminActionBox, userItem, userNameCss } from "./Users.style";
import { client, requests } from "@/bridge";

import { AnimatedInput } from "@/components/AnimatedInput";
import { Form } from "@/components/Form";
import { ModalLayout } from "@/components/Modal";
import { actionButton } from "@/styles";
import { adminRoutes } from "@/util/api-routes";
import { css } from "catom";
import { inputWrapperClass } from "@/components/SignIn/inputWrapperClass";
import { resourceContainer } from "../../DashTasks.style";
import { useFilteredUsers } from "./use-filtered-users";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";

export function UsersList({ event }: { event: Events }) {
  const [users, fetchUsers, error] = useResource<IUser[]>(
    adminRoutes.eventUsers(event)
  );

  if (error) return <div class={css({ color: "red" })}>{error}</div>;
  if (!users) return <div>Loading... </div>;
  return <UserRenderer event={event} fetchUsers={fetchUsers} users={users} />;
}

function UserRenderer({ fetchUsers, users }: RendererProps) {
  const [search, setSearch] = useState("");
  const filteredUsers = useFilteredUsers(users, search);
  const [message, setMessage] = useState(null);
  const [nextAction, setNextAction] = useState<(...a: any) => void>(null);
  const [error, setError] = useState("");

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
    const { currentTarget } = e;
    const { index } = currentTarget.dataset;
    const u = users[+index];
    setDq(u);
    const name = u.user;
    setNextAction(() => async (reason: string, points: number) => {
      setMessage("Disqualifying");
      const result = await requests.postJSON(adminRoutes.disqualifyUser(name), {
        reason,
        points,
      }).result;
      const { data, error } = result;
      setError(error || "");
      setMessage("");
      if (data) {
        onSuccess();
      }
    });
  }
  function handleDelete(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    const { currentTarget } = e;
    const { user, name } = currentTarget.dataset;
    setError("");
    setMessage(`Delete ${user} (${name})?`);
    setNextAction(() => async () => {
      setMessage("Deleting..");
      const result = await requests.get(adminRoutes.deleteUser(user)).result;

      const { data, error } = result;
      setError(error || "");
      if (data) {
        onSuccess();
      }
    });
  }
  function handleRequalify(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    const { currentTarget } = e;
    const { user, name } = currentTarget.dataset;
    setError("");
    setMessage(`Requalify ${user} (${name})?`);
    setNextAction(() => async () => {
      setMessage("Submitting..");
      const result = await requests.get(adminRoutes.reQualifyUser(user)).result;

      const { data, error } = result;
      setError(error || "");
      if (data) {
        onSuccess();
      }
    });
  }
  const me = client.getState().user;
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
        {filteredUsers.map((x, i) => (
          <div class={userItem}>
            <div>
              <span class={userNameCss}>{x.user}</span> ({x.name}) - ({x.points}{" "}
              points) {x.user === me && "(You)"}{" "}
              {x.is_disqualified && (
                <span class={css({ color: "red" })}>(Disqualified)</span>
              )}
            </div>
            <div class={adminActionBox} data-db-actions>
              <button
                class={actionButton}
                style={{ "--fg": x.is_disqualified ? "green" : "red" }}
                data-index={i}
                data-user={x.user}
                data-name={x.name}
                onClick={x.is_disqualified ? handleRequalify : handleDisqualify}
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
            </div>
          </div>
        ))}
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
        labelText="Disqualification Reason"
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