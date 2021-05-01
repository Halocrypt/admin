import { IEvent, IQuestion, IUser } from "@/interfaces";

import { playRoutes } from "@/packages/halo-api/api-routes";
import { requests } from "@/bridge";

type Events = "main" | "intra";
export function getLeaderboard(event: Events) {
  return requests.get<IUser[]>(playRoutes.leaderboard(event));
}

export function getQuestion(event: Events) {
  return requests.get<IQuestion[]>(playRoutes.question(event));
}

export function answer(event: Events, body: { answer: string }) {
  return requests.postJSON<{ is_correct: boolean; game_over?: boolean }>(
    playRoutes.answer(event),
    body
  );
}

export function listEvents() {
  return requests.get<IEvent[]>(playRoutes.getEvents);
}
