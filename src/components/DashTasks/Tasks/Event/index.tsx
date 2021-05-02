import { FetchResourceCallback, useResource } from "@/hooks/use-resource";
import { resourceContainer, taskWrapper } from "../../DashTasks.style";

import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { EventDetails } from "./EventDetails";
import { IEvent } from "@/interfaces";
import { css } from "catom";
import { eventHeadWrapper } from "./Event.styles";
import { listEvents } from "@/packages/halo-api/play";

export function EventList() {
  const { resp: events, fetchResource: fetchEvents, error } = useResource(
    listEvents,
    []
  );

  return (
    <AnimateLayout
      onlyInitial
      element="section"
      animId="edit-event"
      class={taskWrapper}
    >
      <h2 class={eventHeadWrapper}>Events</h2>
      {!events ? (
        <div>
          {error ? (
            <div class={css({ color: "red" })}>{error}</div>
          ) : (
            "Loading.."
          )}
        </div>
      ) : (
        <Events events={events} fetchEvents={fetchEvents} />
      )}
    </AnimateLayout>
  );
}

function Events({
  events,
  fetchEvents,
}: {
  events: IEvent[];
  fetchEvents: FetchResourceCallback<true>;
}) {
  return (
    <div class={resourceContainer}>
      {events.map((x) => (
        <EventDetails event={x} onEdit={fetchEvents} />
      ))}
    </div>
  );
}
