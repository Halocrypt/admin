import { client } from "@/bridge";
import { actionButton, center } from "@/styles";
import { AnimateLayout } from "@hydrophobefireman/ui-anim";
import { A } from "@hydrophobefireman/ui-lib";
import { CalendarIcon } from "../Icons/Calendar";
import { LogIcon } from "../Icons/Logs";
import { NotificationIcon } from "../Icons/Notification";
import { QuestionIcon } from "../Icons/Question";
import { UserGroupIcon } from "../Icons/UserGroup";
import {
  adminActionButton,
  actionWrapper,
  dashContainer,
  dashHeading,
} from "./DashTasks.style";
export function NoTask() {
  return (
    <>
      <h1 class={dashHeading}>Halocrypt Dashboard</h1>
      <div class={dashContainer}>
        <div class={actionWrapper}>
          <AnimateLayout element="div" animId="edit-event">
            <A class={adminActionButton} href="/dash/event">
              <CalendarIcon size={"80px"} />
              <div>Edit Event</div>
            </A>
          </AnimateLayout>
          <AnimateLayout animId="edit-questions" element="div">
            <A class={adminActionButton} href="/dash/questions">
              <QuestionIcon size={"80px"} />
              <div>Edit Questions</div>
            </A>
          </AnimateLayout>
          <AnimateLayout element="div" animId="edit-users">
            <A class={adminActionButton} href="/dash/users">
              <UserGroupIcon size={"80px"} />
              <div>Edit Users</div>
            </A>
          </AnimateLayout>
          <AnimateLayout element="div" animId="edit-notifications">
            <A class={adminActionButton} href="/dash/notifications">
              <NotificationIcon size={"80px"} />
              <div>Edit Notifications</div>
            </A>
          </AnimateLayout>
          <AnimateLayout element="div" animId="edit-logs">
            <A class={adminActionButton} href="/dash/logs">
              <LogIcon size={"80px"} />
              <div>Edit Logs</div>
            </A>
          </AnimateLayout>
        </div>
        <div class={center}>
          <button class={actionButton} onClick={() => client.logout()}>
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
