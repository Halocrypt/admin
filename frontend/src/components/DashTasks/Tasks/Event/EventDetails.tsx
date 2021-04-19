import { Events, IEvent } from "@/interfaces";
import {
  editButtonWrapper,
  eventDataLine,
  eventItem,
  eventName,
} from "./Event.styles";

import { FetchResourceCallback } from "@/hooks/use-resource";
import { actionButton } from "@/styles";
import { adminRoutes } from "@/util/api-routes";
import { css } from "catom";
import { dateTimeLocalCompat } from "./util";
import { fixDate } from "./util";
import { requests } from "@/bridge";
import { useState } from "@hydrophobefireman/ui-lib";
interface EditProps {
  event: IEvent;
  close?(): void;
  onEdit: FetchResourceCallback<true>;
}
export function EventDetails({ event, onEdit }: EditProps) {
  const [editing, setEditing] = useState(false);
  if (editing)
    return (
      <Editor
        event={event}
        close={() => setEditing(false)}
        onEdit={() => {
          return onEdit(true).then(() => setEditing(false));
        }}
      />
    );
  return (
    <div class={eventItem}>
      <div class={eventName}>{event.name} Event</div>
      <div class={eventDataLine}>
        Starts at {fixDate(event.event_start_time)}
      </div>
      <div class={eventDataLine}>Ends at {fixDate(event.event_end_time)}</div>
      <div class={eventDataLine}>
        {!event.is_over ? (
          <div>Event has not been closed</div>
        ) : (
          <div>Event closed by moderators</div>
        )}
      </div>
      <div class={editButtonWrapper}>
        <button class={actionButton} onClick={() => setEditing(!editing)}>
          {editing ? "Close" : "Edit"}
        </button>
      </div>
    </div>
  );
}

const getDateTimeStateInitializer = (x: number) => () =>
  dateTimeLocalCompat(new Date(x * 1000));

function Editor({ event, onEdit, close }: EditProps) {
  const { event_end_time, event_start_time, is_over } = event;
  const [startTime, setStartTime] = useState(
    getDateTimeStateInitializer(event_start_time)
  );
  const [endTime, setEndTime] = useState(
    getDateTimeStateInitializer(event_end_time)
  );
  const [isOver, setIsOver] = useState(is_over);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  function handleSave() {
    if (message) return;
    setError("");
    setMessage("Uploading...");
    updateEvent(
      event.name,
      startTime,
      endTime,
      isOver,
      (e) => {
        setError(e);
        setMessage("");
      },
      onEdit
    );
  }
  return (
    <div class={eventItem}>
      <div class={eventName}>{event.name} Event</div>
      <div>
        <div>
          {error && <span class={css({ color: "red" })}>Error: {error}</span>}
        </div>
        <div>{message}</div>
      </div>
      <div class={eventDataLine}>
        Start Time:{" "}
        <input
          type="datetime-local"
          value={startTime}
          data-debug-start-time={startTime}
          onInput={(e) => setStartTime(e.currentTarget.value)}
        />
      </div>
      <div class={eventDataLine}>
        End Time:{" "}
        <input
          type="datetime-local"
          value={endTime}
          data-debug-start-time={endTime}
          onInput={(e) => setEndTime(e.currentTarget.value)}
        />
      </div>
      <div class={eventDataLine}>
        <button class={actionButton} onClick={() => setIsOver(!isOver)}>
          {isOver ? "Enable Event" : "Disable Event"}
        </button>
      </div>
      <div class={editButtonWrapper}>
        <button class={actionButton} onClick={close}>
          Close
        </button>
        <button
          class={actionButton}
          style={{ color: "var(--bg)", background: "var(--fg)" }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
async function updateEvent(
  name: string,
  startTime: string,
  endTime: string,
  isOver: boolean,
  setError: (s: string) => void,
  onEdit: () => void
) {
  const { result } = requests.postJSON(adminRoutes.editEvent(name as Events), {
    event_start_time: +new Date(startTime) / 1000,
    event_end_time: +new Date(endTime) / 1000,
    is_over: isOver,
  });
  const { error } = await result;
  if (error) return setError(error);
  onEdit();
}
