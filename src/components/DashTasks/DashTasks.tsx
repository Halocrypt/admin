import { A, useRoute } from "@hydrophobefireman/ui-lib";
import { backLink, backToDashBoardWrapper, iconCss } from "./DashTasks.style";

import { BackArrowIcon } from "../Icons/BackArrow";
import { EventList } from "./Tasks/Event";
import { Logs } from "./Tasks/Logs";
import { NoTask } from "./NoTask";
import { Notifications } from "./Tasks/Notifications";
import { Questions } from "./Tasks/Questions";
import { Users } from "./Tasks/Users";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

export function DashTasks() {
  useAuthRedirect();
  const { params } = useRoute();
  const { task } = params;
  if (!task) return <NoTask />;
  return (
    <div>
      <div class={backToDashBoardWrapper}>
        <A href="/dash" class={backLink}>
          <BackArrowIcon className={iconCss} /> Dashboard
        </A>
      </div>
      <Task task={task} />
    </div>
  );
}

function Task({ task }: { task: string }) {
  switch (task) {
    case "event":
      return <EventList />;
    case "questions":
      return <Questions />;
    case "users":
      return <Users />;
    case "notifications":
      return <Notifications />;
    case "logs":
      return <Logs />;
    default:
      break;
  }
}
