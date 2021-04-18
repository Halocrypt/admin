import { actionButton, center } from "@/styles";
import { fixDate, readableDate } from "../Event/util";

import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { AnimatedInput } from "@/components/AnimatedInput";
import { Log } from "@/interfaces";
import { adminRoutes } from "@/util/api-routes";
import { css } from "catom";
import { eventHeadWrapper } from "../Event/Event.styles";
import { inputWrapperClass } from "@/components/SignIn/inputWrapperClass";

import { taskWrapper } from "../../DashTasks.style";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";
import { useFilteredLogs } from "./use-filtered-logs";
import { Paginate } from "@/components/Paginate/Paginate";

export function Logs() {
  const [key, _, keyError] = useResource<string>(adminRoutes.logserverKey);
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
  const [fetchedLogs, _, error] = useResource<Log[]>(adminRoutes.getLogs, {
    "x-access-key": accessKey,
  });
  const logs = useFilteredLogs(fetchedLogs, search);
  if (!fetchedLogs) return <div>Fetching...</div>;
  return (
    <div>
      <div class={center}>
        <AnimatedInput
          value={search}
          onInput={setSearch}
          labelText="username"
          wrapperClass={inputWrapperClass}
        />
      </div>
      <div class={css({ color: "red" })}>{error}</div>
      <div>
        {logs && (
          <Paginate
            items={logs}
            atOnce={100}
            buttonWrapperClass={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: ".5rem",
            })}
            buttonClass={actionButton}
            render={([user, question, answer, isCorrect, timeStamp]) => (
              <div
                style={isCorrect ? { border: "2px solid green" } : null}
                class={css({
                  padding: "1rem",
                  boxShadow: "var(--box-shadow)",
                  margin: ".5rem",
                  borderRadius: "5px",
                })}
              >
                <div>
                  <span class={css({ color: "var(--fg)", margin: ".5rem" })}>
                    {user}
                  </span>
                  <span>({question}) </span>
                </div>
                <div>
                  <span> {answer}</span>
                  <span> {isCorrect ? "✅" : "❌"}</span>
                </div>
                <div class={css({ textAlign: "right", fontSize: ".8rem" })}>
                  {readableDate(timeStamp)}
                </div>
              </div>
            )}
            dualButtons={true}
          />
        )}
      </div>
    </div>
  );
}
