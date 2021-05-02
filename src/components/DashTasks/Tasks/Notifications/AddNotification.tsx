import { Events, INotification, RenderableContent } from "@/interfaces";
import { closeActionContainer, editorRoot } from "../Editor.styles.ts";

import { AnimatedInput } from "@/components/AnimatedInput";
import { CloseIcon } from "@/components/Icons/Close";
import { FetchResourceCallback } from "@/hooks/use-resource";
import { NotificationViewer } from "./NotificationViewer";
import { RenderableTypeSelector } from "../Questions/QuestionEditor/RenderableTypeSelector";
import { actionButton } from "@/styles";
import { addNotification } from "@/packages/halo-api/admin";
import { client } from "@/bridge";
import { css } from "catom";
import { inputWrapperClass } from "@/components/SignIn/inputWrapperClass";
import { useInterval } from "@/hooks/use-interval";
import { useState } from "@hydrophobefireman/ui-lib";

export function AddNotification({
  close,
  fetchNotifs,
  event,
}: {
  close(): void;
  event: Events;
  fetchNotifs: FetchResourceCallback<true>;
}) {
  const [ts, setTs] = useState(+new Date());
  useInterval(() => setTs(+new Date()), 1000);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState<RenderableContent["type"]>(
    "text"
  );

  const user = client.getState().user;
  async function handleSave() {
    if (message || !content.trim()) return;
    const body: INotification = {
      ts,
      content: { content, type: contentType },
      issuedBy: user,
      title,
    };
    setError("");
    setMessage("Adding...");
    const result = await addNotification({ event, body }).result;
    const { data, error } = result;
    setError(error || "");
    if (data) {
      setMessage("Syncing...");
      fetchNotifs(true).then(close);
    }
  }
  return (
    <section class={editorRoot}>
      <div class={closeActionContainer}>
        <button class={actionButton} onClick={handleSave}>
          Save
        </button>
        <button onClick={close} class={actionButton}>
          <CloseIcon />
        </button>
      </div>
      <div class={css({ marginLeft: "1rem" })}>
        <div>{message}</div>
        <div class={css({ color: "red" })}>{error}</div>
      </div>
      <div>
        <NotificationViewer
          notification={{
            title,
            content: { type: contentType, content },
            issuedBy: user,
            ts,
          }}
        />
      </div>
      <AnimatedInput
        value={title}
        onInput={setTitle}
        labelText="Title"
        wrapperClass={inputWrapperClass}
      />
      <AnimatedInput
        value={content}
        onInput={setContent}
        labelText="Content"
        wrapperClass={inputWrapperClass}
      />
      <RenderableTypeSelector
        active={contentType}
        handleClick={({ currentTarget }) =>
          setContentType(currentTarget.dataset.type)
        }
      />
    </section>
  );
}
