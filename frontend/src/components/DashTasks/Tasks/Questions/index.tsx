import { Events, IEvent } from "@/interfaces";

import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { EventSelector } from "../../EventSelector";
import { QuestionsList } from "./QuestionsList";
import { adminRoutes } from "@/util/api-routes";
import { css } from "catom";
import { eventHeadWrapper } from "../Event/Event.styles";
import { taskWrapper } from "../../DashTasks.style";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";
import { useTimeout } from "@/hooks/use-timeout";

export function Questions() {
  const [events, _, error] = useResource<IEvent[]>(adminRoutes.getEvents);
  const timeOut = useTimeout(2000);
  if (!events && !timeOut) return null;
  const [selectedEvent, setSelectedEvent] = useState<Events>(null);

  return (
    <AnimateLayout
      element="section"
      animId="edit-questions"
      class={taskWrapper}
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