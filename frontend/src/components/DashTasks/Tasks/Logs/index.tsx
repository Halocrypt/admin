import { actionButton, center } from "@/styles";
import { getLogKey, getLogs } from "@/packages/halo-api/admin";

import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { AnimatedInput } from "@/components/AnimatedInput";
import { Paginate } from "@/components/Paginate/Paginate";
import { css } from "catom";
import { eventHeadWrapper } from "../Event/Event.styles";
import { inputWrapperClass } from "@/components/SignIn/inputWrapperClass";
import { readableDate } from "../Event/util";
import { taskWrapper } from "../../DashTasks.style";
import { useFilteredLogs } from "./use-filtered-logs";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";

export function Logs() {
  const [key, _, keyError] = useResource(getLogKey);
  return (
    <AnimateLayout
      onlyInitial
      element="section"
      animId="edit-logs"
      class={taskWrapper}
    >
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
  const [fetchedLogs, _, error] = useResource(getLogs);
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
                style={isCorrect ? { borderColor: "green" } : null}
                class={css({
                  padding: "1rem",
                  boxShadow: "var(--box-shadow)",
                  margin: ".5rem",
                  borderRadius: "5px",
                  border: "2px solid transparent",
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
