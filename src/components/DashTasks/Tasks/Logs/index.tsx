import { actionButton, center } from "@/styles";
import { filterBox, filterButton } from "./logs.style";
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
  const { resp: key, error: keyError } = useResource(getLogKey, []);
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

const activeCss = { background: "var(--fg)", color: "var(--font)" };
const inactiveCss = { background: "var(--alpha)" };
function LogViewer({ accessKey }: { accessKey: string }) {
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const { resp: fetchedLogs, error } = useResource(getLogs, [accessKey]);
  const [filterType, setFilterType] =
    useState<"all" | "correct" | "incorrect">("all");
  function handleClick(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    const { currentTarget } = e;
    setFilterType(currentTarget.dataset.filter as any);
  }
  const logs = useFilteredLogs(fetchedLogs, search, username, filterType);
  if (!fetchedLogs) return <div>Fetching...</div>;
  return (
    <div>
      <div class={center}>
        <AnimatedInput
          value={search}
          onInput={setSearch}
          labelText="search"
          wrapperClass={inputWrapperClass}
        />
        <AnimatedInput
          value={username}
          onInput={setUsername}
          labelText="username"
          wrapperClass={inputWrapperClass}
        />
      </div>
      <div class={css({ color: "red" })}>{error}</div>
      <div class={filterBox}>
        <button
          class={filterButton}
          data-filter="all"
          onClick={handleClick}
          style={filterType === "all" ? activeCss : inactiveCss}
        >
          All
        </button>
        <button
          class={filterButton}
          data-filter="correct"
          onClick={handleClick}
          style={filterType === "correct" ? activeCss : inactiveCss}
        >
          Correct
        </button>
        <button
          class={filterButton}
          data-filter="incorrect"
          onClick={handleClick}
          style={filterType === "incorrect" ? activeCss : inactiveCss}
        >
          Incorrect
        </button>
      </div>
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
                  background: "var(--bg)",
                  transition: "0.3s ease",
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
