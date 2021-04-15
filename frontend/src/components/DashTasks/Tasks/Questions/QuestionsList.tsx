import { Events, IQuestion, RendererProps } from "@/interfaces";

import { AnimatedInput } from "@/components/AnimatedInput";
import { NEW_QUESTION_TOKEN } from "./constants";
import { QuestionDetails } from "./QuestionDetails";
import { QuestionEditor } from "./QuestionEditor/QuestionEditor";
import { actionButton } from "@/styles";
import { adminRoutes } from "@/util/api-routes";
import { css } from "catom";
import { resourceContainer } from "../../DashTasks.style";
import { useFilteredQuestions } from "./use-filtered-questions";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";

export function QuestionsList({ event }: { event: Events }) {
  const [questions, fetchQuestions, error] = useResource<IQuestion[]>(
    adminRoutes.listQuestions(event)
  );

  if (error) return <div class={css({ color: "red" })}>{error}</div>;
  if (!questions) return <div>Loading...</div>;
  return (
    <QuestionsRenderer
      questions={questions}
      fetchQuestions={fetchQuestions}
      event={event}
    />
  );
}

function QuestionsRenderer({
  questions,
  fetchQuestions,
  event,
}: RendererProps) {
  const [search, setSearch] = useState("");
  const filteredQuestions = useFilteredQuestions(questions, search);
  const [questionEditor, setQuestionEditor] = useState<IQuestion>(null);
  function handleEdit(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    const { currentTarget } = e;
    const id = currentTarget.dataset.id;
    const question = questions.find((x) => x._id === id);
    setQuestionEditor(question);
  }
  return (
    <div class={resourceContainer}>
      {questionEditor ? (
        <QuestionEditor
          question={questionEditor}
          fetchQuestions={fetchQuestions}
          close={() => setQuestionEditor(null)}
          questionsLength={questions.length}
          event={event}
        />
      ) : (
        <>
          <AnimatedInput
            value={search}
            onInput={setSearch}
            labelText="Search questions"
            wrapperClass={css({ margin: "1rem" })}
          />
          <div>
            <button
              class={actionButton}
              onClick={() => setQuestionEditor(NEW_QUESTION_TOKEN)}
            >
              Add question
            </button>
          </div>
          {filteredQuestions.map((x) => (
            <QuestionDetails question={x} handleEdit={handleEdit} />
          ))}
        </>
      )}
    </div>
  );
}
