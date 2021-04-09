import { json } from "./util";

declare const USER_LOGS: {
  get<T = string>(key: string): Promise<T>;
  put(key: string, value: any): Promise<void>;
};
declare const ACCESS_KEY: string;

type User = string;
type Question = number;
type Answer = string;
type isCorrect = boolean;
type Timestamp = number;

const decoder = new TextDecoder();

export async function handleRequest(request: Request): Promise<Response> {
  const { headers, url, method } = request;
  if (method.toLowerCase() === "options") return optionsResponse(request);
  if (!isAuthenticated(headers)) return json({ error: "no" });
  const { pathname } = new URL(url);
  if (method.toLowerCase() === "get") return json({ error: "post it" });
  try {
    switch (pathname) {
      case "/add":
        return addLog(await request.arrayBuffer());
      case "/get":
        return getLogs(await request.arrayBuffer());
      default:
        return json({ error: "Invalid" });
    }
  } catch (e) {
    return json({ error: e.message });
  }
}

function isAuthenticated(headers: Headers) {
  return headers.get("x-access-key") === ACCESS_KEY;
}
async function getLogs(buf: ArrayBuffer) {
  const text = decoder.decode(buf);
  const { name } = JSON.parse(text);
  return json({ data: JSON.parse((await USER_LOGS.get(name)) || "[]") });
}

type KVObject = Array<[Question, Answer, isCorrect, Timestamp]>;
async function addLog(buf: ArrayBuffer) {
  const text = decoder.decode(buf);
  const data: Array<[User, Question, Answer, isCorrect, Timestamp]> = text
    .split("\n")
    .map((x) => x && JSON.parse(x))
    .filter(Boolean);

  const userToKVObjectMap = new Map<string, KVObject>();
  for (const [user, ...rest] of data) {
    let obj: KVObject;
    const tmp = userToKVObjectMap.get(user);
    if (tmp) {
      obj = tmp;
    } else {
      const d = await USER_LOGS.get(user);
      obj = d ? JSON.parse(d) : [];
      userToKVObjectMap.set(user, obj);
    }
    obj.push(rest);
  }

  await Promise.all(
    Array.from(userToKVObjectMap.entries()).map(([user, obj]) =>
      USER_LOGS.put(user, JSON.stringify(obj))
    )
  );
  return json({ success: true });
}

function optionsResponse(r: Request) {
  return new Response("", {
    status: 204,
    headers: {
      "access-control-allow-methods": "POST, GET, OPTIONS, DELETE",
      "access-control-allow-origin": "*",
      "access-control-allow-headers":
        r.headers.get("access-control-request-headers") || "*",
      "access-control-max-age": "86400",
    },
  });
}
