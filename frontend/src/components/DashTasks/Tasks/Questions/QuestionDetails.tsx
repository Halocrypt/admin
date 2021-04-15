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

interface QuestionDetailsProps {
  question: IQuestion;
  handleEdit?(e: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
}
export function QuestionDetails({
  question,
  handleEdit,
}: QuestionDetailsProps) {
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
          <div>Hints:</div>
          <ul>
            {question.question_hints.map((x) => (
              <li>
                <RenderableContentViewer content={x} />
              </li>
            ))}
          </ul>
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
