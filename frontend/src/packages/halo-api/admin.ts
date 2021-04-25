import { IEvent, IQuestion, IUser } from "@/interfaces";
import { adminRoutes, userRoutes } from "@/packages/halo-api/api-routes";

import { requests } from "@/bridge";

type Events = "main" | "intra";
export type QuestionMutation = Pick<
  IQuestion,
  "question_points" | "question_content" | "question_hints"
> & { answer: string };
export function listUsers(event: Events) {
  return requests.get<IUser[]>(adminRoutes.listUsers(event));
}

export function disqualifyUser(
  user: string,
  body: { reason: string; points: number }
) {
  return requests.patchJSON<IUser>(adminRoutes.disqualifyUser(user), body);
}

export function requalifyUser(user: string) {
  return requests.patchJSON<IUser>(adminRoutes.reQualifyUser(user), {});
}
export function deleteUser(user: string) {
  return requests.del(userRoutes.userDetails(user));
}

export function addQuestion(event: Events, body: QuestionMutation) {
  return requests.postJSON<IQuestion>(adminRoutes.addQuestion(event), body);
}

export function editQuestion(
  event: Events,
  number: number,
  body: QuestionMutation
) {
  return requests.patchJSON<IQuestion>(
    adminRoutes.editQuestion(event, number),
    body
  );
}

export function listQuestions(event: Events) {
  return requests.get<IQuestion[]>(adminRoutes.listQuestions(event));
}

export function listEvents() {
  return requests.get<IEvent[]>(adminRoutes.getEvents);
}

export function editEvent(
  event: Events,
  body: { event_start_time: number; event_end_time: number; is_over: boolean }
) {
  return requests.patchJSON(adminRoutes.editEvent(event), body);
}

export function getNotificationKey() {
  return requests.get<string>(adminRoutes.notificationKey);
}

export function getLogKey() {
  return requests.get<string>(adminRoutes.logserverKey);
}

export function deleteNotification({
  event,
  ts,
  accessKey,
}: {
  event: Events;
  ts: number;
  accessKey: string;
}) {
  return requests.postJSON(
    adminRoutes.deleteNotification(event),
    { ts },
    { "x-access-key": accessKey }
  );
}
export function addNotification({
  event,
  accessKey,
  body,
}: {
  event: Events;
  body: any;
  accessKey: string;
}) {
  return requests.postJSON(adminRoutes.addNotification(event), body, {
    "x-access-key": accessKey,
  });
}

// export function getUserCount() {}