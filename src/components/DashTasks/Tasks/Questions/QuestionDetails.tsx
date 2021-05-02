import {
  editQuestionWrapper,
  questionBox,
  questionHeading,
  questionPoints,
} from "./Questions.style";

import { IQuestion } from "@/interfaces";
import { RenderableContentViewer } from "../../../RenderableContentViewer";
import { actionButton } from "@/styles";
import { css } from "catom";
import { useState } from "@hydrophobefireman/ui-lib";
import { AnimateLayout } from "@hydrophobefireman/ui-anim";

interface QuestionDetailsProps {
  question: IQuestion;
  handleEdit?(e: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
}
export function QuestionDetails({
  question,
  handleEdit,
}: QuestionDetailsProps) {
  const [showHints, setShowHints] = useState(false);

  return (
    <section
      data-id={question._id}
      data-for={question.event}
      data-points={question.question_points}
      data-level={question.question_number}
      class={questionBox}
    >
      <h2 class={questionHeading}>Question: {question.question_number} </h2>
      <div class={questionPoints}>({question.question_points} points)</div>
      <div>
        <RenderableContentViewer content={question.question_content} />
      </div>
      {question.question_hints && question.question_hints.length > 0 && (
        <div class={css({ textAlign: "left" })}>
          <button
            class={css({ textDecoration: "underline" })}
            onClick={() => setShowHints(!showHints)}
          >
            Hints:
          </button>

          <AnimateLayout
            animId={"hint"}
            element="ul"
            class={
              !showHints
                ? css({
                    height: "0px",
                    width: "0px",
                    overflow: "hidden",
                    opacity: "0",
                  })
                : css({ opacity: "1" })
            }
          >
            {question.question_hints.map(
              (x) =>
                x.content && (
                  <li>
                    <RenderableContentViewer content={x} />
                  </li>
                )
            )}
          </AnimateLayout>
        </div>
      )}
      {question._secure_ && (
        <div class={css({ textAlign: "left" })}>
          Answer: {question._secure_.answer}
        </div>
      )}
      {handleEdit && (
        <div class={editQuestionWrapper} data-edit>
          <button
            data-id={question._id}
            class={actionButton}
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      )}
    </section>
  );
}
