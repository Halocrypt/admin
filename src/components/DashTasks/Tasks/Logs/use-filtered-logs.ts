import { clean, contains } from "@/util/search";
import { useEffect, useState } from "@hydrophobefireman/ui-lib";

import { Log } from "@/interfaces";
import { raf } from "@/util/raf";

export function useFilteredLogs(
  logs: Log[],
  query: string,
  filterType: "all" | "correct" | "incorrect"
) {
  const [filteredLogs, setFilteredLogs] = useState(logs);
  useEffect(() => {
    raf(() => {
      if (!logs) return;
      setFilteredLogs(
        logs.filter((x) => {
          const f = !query || contains(x[0], query) || contains(x[2], query);
          if (filterType === "all") return f;
          return f && (filterType === "correct" ? x[3] : !x[3]);
        })
      );
    });
  }, [logs, query, filterType]);
  return filteredLogs;
}
