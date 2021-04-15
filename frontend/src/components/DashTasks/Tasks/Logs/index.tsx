import { actionButton, center } from "@/styles";

import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { AnimatedInput } from "@/components/AnimatedInput";
import { Form } from "@/components/Form";
import { Log } from "@/interfaces";
import { adminRoutes } from "@/util/api-routes";
import { css } from "catom";
import { eventHeadWrapper } from "../Event/Event.styles";
import { fixDate } from "../Event/util";
import { inputWrapperClass } from "@/components/SignIn/inputWrapperClass";
import { requests } from "@/bridge";
import { taskWrapper } from "../../DashTasks.style";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";
import { useTimeout } from "@/hooks/use-timeout";

export function Logs() {
  const [key, _, keyError] = useResource<string>(adminRoutes.logserverKey);
  const timeOut = useTimeout(2000);
  if (!key && !timeOut) return null;
  return (
    <AnimateLayout element="section" animId="edit-logs" class={taskWrapper}>
      <h2 class={eventHeadWrapper}>Logs </h2>
      {!key ? (
        <div>
          {keyError ? (
            <>
              <div class={css({ color: "red" })}>{keyError}</div>
            </>
          ) : (
            "Loading.."
          )}
        </div>
      ) : (
        <LogViewer accessKey={key} />
      )}
    </AnimateLayout>
  );
}

function LogViewer({ accessKey }: { accessKey: string }) {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [logs, setLogs] = useState<Log[]>(null);
  const [message, setMessage] = useState("");
  async function handleSubmit() {
    setMessage("Fetching..");
    const result = await requests.postJSON<Log[]>(
      adminRoutes.getLogs,
      { name: search },
      { "x-access-key": accessKey }
    ).result;
    setMessage("");
    const { data, error } = result;
    setError(error || "");
    if (data) {
      if (data.length == 0) return setError("No logs found for this user");
      setLogs(data);
    }
  }
  return (
    <div>
      <div class={center}>
        <Form onSubmit={handleSubmit}>
          <AnimatedInput
            value={search}
            onInput={setSearch}
            labelText="username"
            wrapperClass={inputWrapperClass}
          />
          <button class={actionButton}>Search</button>
        </Form>
      </div>
      <div class={css({ color: "red" })}>{error}</div>
      <div>{message}</div>
      <div>
        {logs &&
          logs.map(([question, answer, isCorrect, timeStamp]) => (
            <div
              style={isCorrect ? { border: "2px solid green" } : null}
              class={css({
                padding: "1rem",
                boxShadow: "var(--box-shadow)",
                margin: ".5rem",
                borderRadius: "5px",
              })}
            >
              <span>({question}) </span>
              <span> {answer}</span>
              <span> {isCorrect ? "✅" : "❌"}</span>
              <div class={css({ textAlign: "right", fontSize: ".8rem" })}>
                {fixDate(timeStamp)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
