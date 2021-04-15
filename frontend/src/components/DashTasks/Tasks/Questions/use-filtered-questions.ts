import { clean, contains } from "@/util/search";
import { useEffect, useState } from "@hydrophobefireman/ui-lib";

import { IQuestion } from "@/interfaces";
import { raf } from "@/util/raf";

export function useFilteredQuestions(questions: IQuestion[], query: string) {
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  useEffect(() => {
    raf(() => {
      if (!questions) return;
      if (!clean(query)) return setFilteredQuestions(questions);
      setFilteredQuestions(
        questions.slice().filter((x) => {
          return !!(
            (x.question_content &&
              contains(x.question_content.content, query)) ||
            (x._secure_ && contains(x, x._secure_.answer)) ||
            contains(x.question_number, query) ||
            contains(x.question_points, query) ||
            (x.question_hints &&
              x.question_hints.some((hint) => contains(hint.content, query)))
          );
        })
      );
    });
  }, [questions, query]);
  return filteredQuestions;
}
