import { A, redirect, useRef, useState } from "@hydrophobefireman/ui-lib";
import { EditUserProps, editUser, userDetails } from "@/packages/halo-api/user";
import { actionButton, center } from "@/styles";
import {
  deleteUser,
  disqualifyUser,
  requalifyUser,
} from "@/packages/halo-api/admin";
import {
  profileContents,
  profileViewer,
} from "../../components/DashTasks/Tasks/Users/Users.style";

import { AnimatedInput } from "@/components/AnimatedInput";
import { BackArrowIcon } from "@/components/Icons/BackArrow";
import { Form } from "@/components/Form";
import { HaloIcon } from "@/components/Icons/Halo";
import { IUser } from "@/interfaces";
import { ModalLayout } from "@/components/Modal";
import { css } from "catom";
import { fixDate } from "../../components/DashTasks/Tasks/Event/util";
import { inputWrapperClass } from "@/components/SignIn/inputWrapperClass";
import { useOverflowHidden } from "../../components/DashTasks/Tasks/Users/use-overflow-hidden";
import { usePropVal } from "../../components/DashTasks/Tasks/Users/use-prop-val";
import { useResource } from "@/hooks/use-resource";

interface ProfileViewerProps {
  user: IUser;
  close?(): void;
  onUpdate?(newUser: IUser): void;
  onDelete?(): void;
}
export function ProfileViewerWithContent({
  user,
  close,
  onUpdate,
  onDelete,
}: ProfileViewerProps) {
  useOverflowHidden();
  const [name, setName] = usePropVal(user.name);
  const [points, setPoints] = usePropVal(user.points);
  const [level, setLevel] = usePropVal(user.level);
  const [email, setEmail] = usePropVal(user._secure_ && user._secure_.email);
  const [inst, setInst] = usePropVal(
    user._secure_ && user._secure_.institution
  );
  const username = user.user;
  const verifiedEmail = user._secure_ && user._secure_.has_verified_email;
  const isDisQualified = user.is_disqualified;
  const lastQuestionAnsweredAt = user.last_question_answered_at;
  const accountCreatedAt = user.created_at;
  const disqualificationReason =
    user.disqualification_reason || "(Reason not specified)";
  const event = user.event;
  const isAdmin = user.is_admin;
  const ref = useRef<HTMLDivElement>();

  const [message, setMessage] = useState("");
  const [action, setAction] = useState<(...a: any) => void>(null);
  const [actionText, setActionText] = useState<string>(null);
  const [isDq, setIsDq] = useState(false);
  const [error, setError] = useState("");
  function resetMessages() {
    setMessage("");
    setError("");
  }
  async function handleEdit() {
    if (message) return;
    resetMessages();
    ref.current && ref.current.scroll({ behavior: "smooth", top: 0 });
    const body: EditUserProps = {
      name,
      points,
      level,
      email,
      institution: inst,
    };
    setMessage("Saving..");
    const res = await editUser(user.user, body).result;
    const { error, data } = res;
    setError(error || "");
    setMessage("");
    onUpdate && onUpdate(data);
  }
  function reset() {
    setAction(null);
    setIsDq(false);
    setActionText(null);
    setMessage(null);
  }
  function handleDisqualify() {
    if (actionText) return;
    setIsDq(true);
    setError(null);
    const initial = `Disqualify ${user.user} ( ${user.name} )?`;
    setActionText(initial);
    setAction(() => async (reason: string, points: number) => {
      setActionText("Disqualifying");
      const result = await disqualifyUser(user.user, { reason, points }).result;
      const { data, error } = result;
      setError(error || "");
      setActionText(initial);
      if (data) {
        onUpdate(data);
        reset();
      }
    });
  }
  function handleRequalify() {
    if (actionText) return;
    setError(null);
    const initial = `Requalify ${user.user} ( ${user.name} )?`;
    setActionText(initial);
    setAction(() => async () => {
      setActionText("Requalifying");
      const result = await requalifyUser(user.user).result;
      const { data, error } = result;
      setError(error || "");
      setActionText(initial);
      if (data) {
        onUpdate(data);
        reset();
      }
    });
  }
  function handleDelete() {
    if (actionText) return;
    setError(null);
    const initial = `Delete ${user.user} ( ${user.name} )?`;
    setActionText(initial);
    setAction(() => async () => {
      setActionText("Deleting..");
      const result = await deleteUser(user.user).result;
      const { data, error } = result;
      setError(error || "");
      setActionText(initial);
      if (data) {
        onDelete ? onDelete() : close();
      }
    });
  }
  if (error)
    return (
      <ModalLayout close={() => setError(null)}>
        <div class={css({ color: "red" })}>{error}</div>
      </ModalLayout>
    );
  return (
    <div class={profileViewer} ref={ref}>
      {close ? (
        <button onClick={close}>
          <BackArrowIcon />
        </button>
      ) : (
        <A href="/dash/users">
          <BackArrowIcon />
        </A>
      )}
      {action && actionText && (
        <ModalLayout close={reset}>
          <div>{message}</div>
          <div>{actionText}</div>
          {isDq ? (
            <DqReason onSubmit={action} />
          ) : (
            <button class={actionButton} onClick={action}>
              OK
            </button>
          )}
        </ModalLayout>
      )}
      <h1 class={css({ margin: "auto", textAlign: "center" })}>
        {isDisQualified ? (
          "Disqualified User"
        ) : isAdmin ? (
          <HaloIcon size="3rem" />
        ) : (
          "Profile Viewer"
        )}
      </h1>
      <div class={center}>
        <div style={error ? { color: "red" } : null}>{error || message}</div>
      </div>
      <div class={profileContents}>
        <div class={css({ textAlign: "right" })}>
          <button onClick={handleEdit} class={actionButton}>
            Save
          </button>
        </div>
        <AnimatedInput
          wrapperClass={inputWrapperClass}
          value={username}
          labelText="username"
          onInput={null}
          disabled
        />
        <AnimatedInput
          value={event}
          onInput={null}
          labelText="event"
          wrapperClass={inputWrapperClass}
          disabled
        />
        {isDisQualified && (
          <AnimatedInput
            value={disqualificationReason}
            onInput={null}
            labelText="Disqualification Reason"
            disabled
            wrapperClass={inputWrapperClass}
          />
        )}
        <AnimatedInput
          wrapperClass={inputWrapperClass}
          value={name}
          labelText="name"
          onInput={setName}
        />
        <AnimatedInput
          wrapperClass={inputWrapperClass}
          value={email}
          labelText="email"
          onInput={setEmail}
        />
        <AnimatedInput
          wrapperClass={inputWrapperClass}
          value={verifiedEmail ? "Yes" : "no"}
          disabled
          labelText="Verified Email"
          onInput={null}
        />
        <AnimatedInput
          wrapperClass={inputWrapperClass}
          value={inst}
          labelText="Institution"
          onInput={setInst}
        />
        <AnimatedInput
          wrapperClass={inputWrapperClass}
          value={`${points}`}
          labelText="Points"
          type="number"
          onInput={(x) => setPoints(+x)}
        />
        <AnimatedInput
          wrapperClass={inputWrapperClass}
          value={`${level}`}
          labelText="Level"
          type="number"
          onInput={(x) => setLevel(+x)}
        />
        <AnimatedInput
          wrapperClass={inputWrapperClass}
          value={fixDate(accountCreatedAt)}
          onInput={null}
          labelText="Account created at"
          disabled
        />
        <AnimatedInput
          wrapperClass={inputWrapperClass}
          value={fixDate(lastQuestionAnsweredAt)}
          onInput={null}
          labelText="Last question answered at"
          disabled
        />
        <div class={css({ textAlign: "right" })}>
          <button onClick={handleEdit} class={actionButton}>
            Save
          </button>
        </div>
        {!user.is_admin && (
          <div class={center}>
            <button
              class={actionButton}
              style={{ "--fg": user.is_disqualified ? "green" : "#ff5151" }}
              data-user={user.user}
              data-name={user.name}
              onClick={
                user.is_disqualified ? handleRequalify : handleDisqualify
              }
            >
              {user.is_disqualified ? "Requalify" : "Disqualify"}
            </button>
            <button
              class={actionButton}
              style={{ "--fg": "#ff5151" }}
              data-user={user.user}
              data-name={user.name}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfileViewer({ params }) {
  const { resp: user, error, setResp: setUser } = useResource(userDetails, [
    params.user,
  ]);
  if (error) return error;
  if (user)
    return (
      <ProfileViewerWithContent
        user={user.user_data}
        onUpdate={(x) => setUser({ user_data: x })}
        close={() => redirect("/dash/users")}
      />
    );
  return <div>Loading...</div>;
}

function DqReason({ onSubmit }: { onSubmit(...a: any): void }) {
  const [reason, setReason] = useState("");
  const [dqPoints, setDqPoints] = useState(10);
  return (
    <Form onSubmit={() => onSubmit(reason, dqPoints)}>
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
