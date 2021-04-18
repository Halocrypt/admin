import { Events, IQuestion, RenderableContent } from "@/interfaces";
import { actionButton, center } from "@/styles";
import { closeActionContainer, editorRoot } from "../../Editor.styles.ts";

import { AnimatedInput } from "@/components/AnimatedInput";
import { CloseIcon } from "@/components/Icons/Close";
import { FetchResourceCallback } from "@/hooks/use-resource";
import { NEW_QUESTION_TOKEN } from "../constants";
import { QuestionDetails } from "../QuestionDetails";
import { RenderableTypeSelector } from "./RenderableTypeSelector";
import { adminRoutes } from "@/util/api-routes";
import { animInputWrapperClass } from "../Questions.style";
import { clean } from "@/util/search";
import { css } from "catom";
import { requests } from "@/bridge";
import { useState } from "@hydrophobefireman/ui-lib";

interface QuestionEditorProps {
  question: IQuestion;
  fetchQuestions: FetchResourceCallback<true>;
  close(): void;
  questionsLength: number;
  event: Events;
}

export function QuestionEditor({
  question,
  fetchQuestions,
  close,
  questionsLength,
  event,
}: QuestionEditorProps) {
  const content = question.question_content || ({} as RenderableContent);
  const isNew = question === NEW_QUESTION_TOKEN;
  const [questionText, setQuestionText] = useState(content.content || "");
  const [questionType, setQuestionType] = useState<RenderableContent["type"]>(
    content.type || "text"
  );
  const [answer, setAnswer] = useState(
    (question._secure_ && question._secure_.answer) || ""
  );
  const [hints, setHints] = useState(question.question_hints || []);
  const [points, setPoints] = useState(question.question_points || 10);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  function handleQuestionTypeChange(
    e: JSX.TargetedMouseEvent<HTMLButtonElement>
  ) {
    const { currentTarget } = e;
    setQuestionType(currentTarget.dataset.type as any);
  }
  const currentQuestion = {
    _id: isNew ? `${event}:${questionsLength}` : (question._id as any),
    event: event,
    question_hints: hints,
    _secure_: { answer },
    question_content: {
      type: questionType,
      content: questionText,
    },
    question_number: isNew ? questionsLength : question.question_number,
    question_points: points,
  };
  async function handleSave() {
    const content = currentQuestion.question_content.content;
    if (
      !clean(currentQuestion._secure_.answer) ||
      !content ||
      !content.trim()
    ) {
      setLoading("");
      return setError("Values cannot be blank");
    }
    setError("");
    setLoading("Sending to the server..");
    const {
      event,
      question_content,
      question_hints,
      question_number,
      question_points,
    } = currentQuestion;
    const res = await requests.postJSON(
      isNew
        ? adminRoutes.addQuestion(event)
        : adminRoutes.editQuestion(event, question_number),
      {
        event,
        question_content,
        question_hints: question_hints.filter(
          (x) => !!(x.content || "").trim()
        ),
        question_number,
        question_points,
        answer,
      }
    ).result;

    if (res.error) {
      setLoading("");
      return setError(res.error);
    }
    setLoading("syncing...");
    fetchQuestions(true).then(close);
  }
  return (
    <section class={editorRoot}>
      <div class={closeActionContainer}>
        <button class={actionButton} onClick={handleSave}>
          Save
        </button>
        <button onClick={close} class={actionButton}>
          <CloseIcon />
        </button>
      </div>
      <div class={css({ marginLeft: "1rem" })}>
        <div>{loading}</div>
        <div class={css({ color: "red" })}>{error}</div>
      </div>
      <div>
        <QuestionDetails question={currentQuestion} />
      </div>
      <div class={[center, css({ marginTop: "2rem" })]}>
        <AnimatedInput
          value={questionText}
          onInput={setQuestionText}
          labelText="Question Content"
          wrapperClass={animInputWrapperClass}
        />
        <RenderableTypeSelector
          active={questionType}
          handleClick={handleQuestionTypeChange}
        />
        <AnimatedInput
          value={answer}
          onInput={setAnswer}
          labelText="Answer"
          wrapperClass={animInputWrapperClass}
        />
        <AnimatedInput
          value={points as any}
          onInput={(x) => setPoints(+x)}
          type="number"
          labelText="Points"
          wrapperClass={animInputWrapperClass}
        />
        <HintEditor hints={hints} setHints={setHints} />
      </div>
      <div class={closeActionContainer}>
        <button class={actionButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </section>
  );
}

function HintEditor({
  hints,
  setHints,
}: {
  hints: RenderableContent[];
  setHints(x: RenderableContent[]): void;
}) {
  function addHint() {
    setHints([...hints, { type: "text", content: "" }]);
  }
  const getInputHandler = (i: number) =>
    function handleInput(val: string) {
      setHints(
        hints.map((hint, _index) => {
          if (i === _index) {
            return { type: hint.type, content: val };
          }
          return hint;
        })
      );
    };
  const getTypeChangeHandler = (i: number) =>
    function handleChange(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
      const { currentTarget } = e;
      setHints(
        hints.map((hint, _index) => {
          if (i === _index) {
            return {
              type: currentTarget.dataset.type as any,
              content: hint.content,
            };
          }
          return hint;
        })
      );
    };
  return (
    <div>
      <h1>Hints</h1>
      <div class={css({ textAlign: "right" })}>
        <button class={actionButton} onClick={addHint}>
          Add hint
        </button>
      </div>
      {hints.map((x, i) => (
        <div>
          <AnimatedInput
            value={x.content || ""}
            data-index={i}
            onInput={getInputHandler(i)}
          />
          <RenderableTypeSelector
            active={x.type}
            handleClick={getTypeChangeHandler(i)}
          />
        </div>
      ))}
    </div>
  );
}
