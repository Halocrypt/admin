import { Events, IEvent, INotification } from "@/interfaces";
import {
  notificationDeleteBox,
  notificationItem,
} from "./Notifications.styles";
import { resourceContainer, taskWrapper } from "../../DashTasks.style";

import { AddNotification } from "./AddNotification";
import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { EventSelector } from "../../EventSelector";
import { ModalLayout } from "@/components/Modal";
import { NotificationViewer } from "./NotificationViewer";
import { actionButton } from "@/styles";
import { adminRoutes } from "@/util/api-routes";
import { css } from "catom";
import { eventHeadWrapper } from "../Event/Event.styles";
import { requests } from "@/bridge";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";
import { useTimeout } from "@/hooks/use-timeout";

export function Notifications() {
  const [events, _, eventError] = useResource<IEvent[]>(adminRoutes.getEvents);
  const [key, __, keyError] = useResource<string>(adminRoutes.notificationKey);
  const timeOut = useTimeout(2000);
  if ((!events || !key) && !timeOut) return null;
  const [selectedEvent, setSelectedEvent] = useState<Events>(null);
  return (
    <AnimateLayout
      element="section"
      animId="edit-notifications"
      class={taskWrapper}
    >
      <h2 class={eventHeadWrapper}>Notifications </h2>
      {!events || !key ? (
        <div>
          {eventError || keyError ? (
            <>
              <div class={css({ color: "red" })}>{eventError}</div>
              <div class={css({ color: "red" })}>{keyError}</div>
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
          {selectedEvent && (
            <NotificationRenderer event={selectedEvent} accessKey={key} />
          )}
        </>
      )}
    </AnimateLayout>
  );
}

function NotificationRenderer({
  accessKey,
  event,
}: {
  accessKey: string;
  event: Events;
}) {
  const [notifs, fetchNotifs, fetchError] = useResource<INotification[]>(
    adminRoutes.getNotifications(event)
  );
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
    setMessage("deleting..");
    const res = await requests.postJSON(
      adminRoutes.deleteNotification(event),
      { ts: confirm.ts },
      { "x-access-key": accessKey }
    ).result;
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
        accessKey={accessKey}
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
