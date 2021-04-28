import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { EventSelector } from "../../EventSelector";
import { Events } from "@/interfaces";
import { UsersList } from "./UsersList";
import { css } from "catom";
import { eventHeadWrapper } from "../Event/Event.styles";
import { listEvents } from "@/packages/halo-api/play";
import { taskWrapper } from "../../DashTasks.style";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";

export function Users() {
  const [events, _, error] = useResource(listEvents, []);

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
