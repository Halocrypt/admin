import { json, optionsResponse, getNotifs, descendingSort } from "./util";
declare const NOTIFICATIONS: {
  get<T = string>(key: string): Promise<T>;
  put(key: string, value: any): Promise<void>;
};
declare const ACCESS_KEY: string;

export async function handleRequest(request: Request): Promise<Response> {
  const { headers, url, method } = request;
  if (method.toLowerCase() === "options") return optionsResponse(request);
  const { pathname, searchParams } = new URL(url);
  const channel = searchParams.get("channel");
  try {
    switch (pathname) {
      case "/":
        return await checkForNotifs(channel);
      case "/add":
        if (!isAuthenticated(headers)) return json({ error: "no" });
        if (method.toLowerCase() !== "post") return json({ error: "post it" });
        return await addNotifs(channel, await request.json());

      case "/delete":
        if (!isAuthenticated(headers)) return json({ error: "no" });
        if (method.toLowerCase() !== "post") return json({ error: "post it" });
        return await deleteNotif(channel, await request.json());
      default:
        return json({ e: "404" });
    }
  } catch (e) {
    return json({ error: e.message });
  }
}

function isAuthenticated(headers: Headers) {
  return headers.get("x-access-key") === ACCESS_KEY;
}
async function deleteNotif(channel: string | null, { ts }: { ts: number }) {
  channel = channel || "main";
  const notifs = await getNotifs(channel);
  const prevLength = notifs.length;
  const next = notifs.filter((x) => x.ts !== ts).sort(descendingSort);
  if (notifs.length !== next.length) {
    await NOTIFICATIONS.put(channel, JSON.stringify(next));
  }

  return json({ data: `Removed ${prevLength - next.length} columns` });
}

async function addNotifs(channel: string | null, body: any) {
  channel = channel || "main";
  const notifs = await getNotifs(channel);
  notifs.push({ ...body, ts: +new Date() });
  await NOTIFICATIONS.put(channel, JSON.stringify(notifs.sort(descendingSort)));
  return json({data:{ success: true }});
}

async function checkForNotifs(channel: string | null) {
  channel = channel || "main";

  const notifs = await getNotifs(channel);
  const response = json({data:notifs});
  return response;
}
