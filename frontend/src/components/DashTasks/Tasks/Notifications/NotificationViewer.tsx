import {
  notificationDeleteBox,
  notificationItem,
} from "./Notifications.styles";

import { INotification } from "@/interfaces";
import { RenderableContentViewer } from "@/components/RenderableContentViewer";
import { actionButton } from "@/styles";
import { readableDate } from "../Event/util";

export function NotificationViewer({
  notification,
  index,
  deleteNotif,
}: {
  notification: INotification;
  index?: number;
  deleteNotif?(e: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
}) {
  return (
    <div class={notificationItem} data-ts={notification.ts}>
      <div>Created at: {readableDate(notification.ts)} </div>
      <div>Created by: {notification.issuedBy || "N/A"}</div>
      <RenderableContentViewer content={notification.content} />
      {deleteNotif && (
        <div data-delete class={notificationDeleteBox}>
          <button class={actionButton} data-index={index} onClick={deleteNotif}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
