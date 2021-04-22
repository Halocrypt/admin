import { Events, IEvent } from "@/interfaces";

import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { EventSelector } from "../../EventSelector";
import { UsersList } from "./UsersList";
import { adminRoutes } from "@/util/api-routes";
import { css } from "catom";
import { eventHeadWrapper } from "../Event/Event.styles";
import { taskWrapper } from "../../DashTasks.style";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";

export function Users() {
  const [events, _, error] = useResource<IEvent[]>(adminRoutes.getEvents);

  const [selectedEvent, setSelectedEvent] = useState<Events>(null);

  return (
    <AnimateLayout
      onlyInitial
      element="section"
      animId="edit-users"
      class={taskWrapper}
    >
      <h2 class={eventHeadWrapper}>Users</h2>
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
          {selectedEvent && <UsersList event={selectedEvent} />}
        </>
      )}
    </AnimateLayout>
  );
}
