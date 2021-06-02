import { clean, contains } from "@/util/search";
import { useEffect, useState } from "@hydrophobefireman/ui-lib";

import { Log } from "@/interfaces";
import { raf } from "@/util/raf";

export function useFilteredLogs(
  logs: Log[],
  query: string,
  username: string,
  filterType: "all" | "correct" | "incorrect"
) {
  const cleanUser = clean(username);

  const [filteredLogs, setFilteredLogs] = useState(logs);
  useEffect(() => {
    raf(() => {
      if (!logs) return;
      setFilteredLogs(
        logs.filter((x) => {
          let f = !query || contains(x[0], query) || contains(x[2], query);
          if (cleanUser) {
            f = f && x[0] === cleanUser;
          }
          if (filterType === "all") return f;
          return f && (filterType === "correct" ? x[3] : !x[3]);
        })
      );
    });
  }, [logs, query, filterType]);
  return filteredLogs;
}
