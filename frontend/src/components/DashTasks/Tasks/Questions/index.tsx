import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { EventSelector } from "../../EventSelector";
import { Events } from "@/interfaces";
import { QuestionsList } from "./QuestionsList";
import { css } from "catom";
import { eventHeadWrapper } from "../Event/Event.styles";
import { listEvents } from "@/packages/halo-api/admin";
import { taskWrapper } from "../../DashTasks.style";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";

export function Questions() {
  const [events, _, error] = useResource(listEvents);

  const [selectedEvent, setSelectedEvent] = useState<Events>(null);

  return (
    <AnimateLayout
      element="section"
      animId="edit-questions"
      class={taskWrapper}
      onlyInitial
    >
      <h2 class={eventHeadWrapper}>Questions</h2>
      {!events ? (
        <div>
          {error ? (
            <div class={css({ color: "red" })}>{error}</div>
          ) : (
            "Loading.."
          )}
        </div>
      ) : (
        <>
          <EventSelector
            events={events}
            setEvent={(e) => setSelectedEvent(e)}
          />
          {selectedEvent && <QuestionsList event={selectedEvent} />}
        </>
      )}
    </AnimateLayout>
  );
}
