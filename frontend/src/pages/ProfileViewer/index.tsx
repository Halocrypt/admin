import { A, useRef, useState } from "@hydrophobefireman/ui-lib";
import { EditUserProps, editUser, userDetails } from "@/packages/halo-api/user";
import { actionButton, center } from "@/styles";
import {
  profileContents,
  profileViewer,
} from "../../components/DashTasks/Tasks/Users/Users.style";

import { AnimatedInput } from "@/components/AnimatedInput";
import { BackArrowIcon } from "@/components/Icons/BackArrow";
import { HaloIcon } from "@/components/Icons/Halo";
import { IUser } from "@/interfaces";
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
}
export function ProfileViewerWithContent({
  user,
  close,
  onUpdate,
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

  const [error, setError] = useState("");
  function resetMessages() {
    setMessage("");
    setError("");
  }
  async function handleSave() {
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
          <button onClick={handleSave} class={actionButton}>
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
          <button onClick={handleSave} class={actionButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileViewer({ params }) {
  const { resp: user, error } = useResource(userDetails, [params.user]);
  if (error) return error;
  if (user) return <ProfileViewerWithContent user={user.user_data} />;
  return <div>Loading...</div>;
}
