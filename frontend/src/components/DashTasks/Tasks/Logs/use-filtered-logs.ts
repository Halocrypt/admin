import { clean, contains } from "@/util/search";
import { useEffect, useState } from "@hydrophobefireman/ui-lib";

import { Log } from "@/interfaces";
import { raf } from "@/util/raf";

export function useFilteredLogs(logs: Log[], query: string) {
  const [filteredQuestions, setFilteredQuestions] = useState(logs);
  useEffect(() => {
    raf(() => {
      if (!logs) return;
      if (!clean(query)) return setFilteredQuestions(logs);
      setFilteredQuestions(
        logs.slice().filter((x) => {
          return contains(x[0], query);
        })
      );
    });
  }, [logs, query]);
  return filteredQuestions;
}
