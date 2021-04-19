import { useEffect, useState } from "@hydrophobefireman/ui-lib";

import { requests } from "@/bridge";

export type FetchResourceCallback<T extends boolean> = (
  v?: T
) => T extends true ? Promise<void> : void;

export function useResource<T, R extends boolean = true>(
  url: string,
  headers?: any
): [T, FetchResourceCallback<R>, string] {
  const [events, setEvents] = useState<T>(null);
  const [error, setError] = useState("");
  function fetchResource(returnPromise?: R) {
    if (events) setEvents(null);
    const { controller, result } = requests.get<T>(url, headers || {});
    const prom = result.then((x) => {
      const { data, error } = x;
      if (error) {
        setEvents(null);
        return setError(error);
      }
      setError(null);
      setEvents(data);
    });
    return (returnPromise ? prom : () => controller.abort()) as ReturnType<
      FetchResourceCallback<R>
    >;
  }
  useEffect(fetchResource, [url]);
  return [events, fetchResource, error];
}
