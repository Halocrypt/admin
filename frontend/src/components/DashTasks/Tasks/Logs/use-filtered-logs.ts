import { clean, contains } from "@/util/search";
import { useEffect, useState } from "@hydrophobefireman/ui-lib";

import { Log } from "@/interfaces";
import { raf } from "@/util/raf";

export function useFilteredLogs(logs: Log[], query: string) {
  const [filteredLogs, setFilteredLogs] = useState(logs);
  useEffect(() => {
    raf(() => {
      if (!logs) return;
      if (!clean(query)) return setFilteredLogs(logs);
      setFilteredLogs(
        logs.filter((x) => {
          return contains(x[0], query);
        })
      );
    });
  }, [logs, query]);
  return filteredLogs;
}
