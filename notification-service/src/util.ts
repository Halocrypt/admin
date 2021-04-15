declare const NOTIFICATIONS: {
  get<T = string>(key: string): Promise<T>;
  put(key: string, value: any): Promise<void>;
};
export const json = (d: any) =>
  new Response(JSON.stringify(d), {
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
    },
  });

export async function getNotifs(channel: string): Promise<Array<any>> {
  const notifsString = await NOTIFICATIONS.get(channel);
  const notifs = notifsString ? JSON.parse(notifsString) : [];
  return notifs;
}
export function optionsResponse(r: Request) {
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

export const descendingSort = (a: any, b: any) => b.ts - a.ts;
