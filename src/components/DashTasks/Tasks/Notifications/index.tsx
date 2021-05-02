import { Events, INotification } from "@/interfaces";
import { getNotifications, listEvents } from "@/packages/halo-api/play";
import { resourceContainer, taskWrapper } from "../../DashTasks.style";

import { AddNotification } from "./AddNotification";
import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { EventSelector } from "../../EventSelector";
import { ModalLayout } from "@/components/Modal";
import { NotificationViewer } from "./NotificationViewer";
import { actionButton } from "@/styles";
import { css } from "catom";
import { deleteNotification } from "@/packages/halo-api/admin";
import { eventHeadWrapper } from "../Event/Event.styles";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";

export function Notifications() {
  const { resp: events, error: eventError } = useResource(listEvents, []);
  const [selectedEvent, setSelectedEvent] = useState<Events>(null);
  return (
    <AnimateLayout
      onlyInitial
      element="section"
      animId="edit-notifications"
      class={taskWrapper}
    >
      <h2 class={eventHeadWrapper}>Notifications </h2>
      {!events ? (
        <div>
          {eventError ? (
            <>
              <div class={css({ color: "red" })}>{eventError}</div>
            </>
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
          {selectedEvent && <NotificationRenderer event={selectedEvent} />}
        </>
      )}
    </AnimateLayout>
  );
}

function NotificationRenderer({ event }: { event: Events }) {
  const {
    resp: notifs,
    fetchResource: fetchNotifs,
    error: fetchError,
  } = useResource(getNotifications, [event]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState<INotification>(null);
  const [addNotif, setAddNotif] = useState(false);
  if (fetchError) return <div class={css({ color: "red" })}>{fetchError}</div>;
  if (!notifs) return <div>Loading..</div>;
  function confirmDelete(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    setConfirm(notifs[e.currentTarget.dataset.index]);
  }
  function reset() {
    setConfirm(null);
    setError("");
    setMessage("");
  }

  async function deleteNotif() {
    if (message) return;
    setMessage("deleting..");
    const res = await deleteNotification({ event, ts: confirm.ts }).result;
    const { error, data } = res;
    setError(error || "");
    if (data) {
      setMessage(data as any);
      fetchNotifs(true).then(reset);
    }
  }
  const closeAddNotif = () => setAddNotif(false);
  if (addNotif)
    return (
      <AddNotification
        close={closeAddNotif}
        fetchNotifs={fetchNotifs}
        event={event}
      />
    );
  return (
    <>
      {confirm && (
        <ModalLayout close={reset}>
          <div class={css({ color: "red" })}>{error}</div>
          <div>Delete the notification?</div>
          <div>{message}</div>
          <div class={css({ textAlign: "right" })}>
            <button class={actionButton} onClick={deleteNotif}>
              ok
            </button>
          </div>
        </ModalLayout>
      )}
      <div class={resourceContainer}>
        <div class={css({ textAlign: "right", margin: ".5rem" })}>
          <button class={actionButton} onClick={() => setAddNotif(true)}>
            Add Notification
          </button>
        </div>
        <div>
          {notifs.map((x, i) => (
            <NotificationViewer
              notification={x}
              index={i}
              deleteNotif={confirmDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}
