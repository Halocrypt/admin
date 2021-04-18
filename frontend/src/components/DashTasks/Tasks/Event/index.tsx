import { FetchResourceCallback, useResource } from "@/hooks/use-resource";
import { resourceContainer, taskWrapper } from "../../DashTasks.style";

import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { EventDetails } from "./EventDetails";
import { IEvent } from "@/interfaces";
import { adminRoutes } from "@/util/api-routes";
import { css } from "catom";
import { eventHeadWrapper } from "./Event.styles";

export function EventList() {
  const [events, fetchEvents, error] = useResource<IEvent[]>(
    adminRoutes.getEvents
  );

  return (
    <AnimateLayout element="section" animId="edit-event" class={taskWrapper}>
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
