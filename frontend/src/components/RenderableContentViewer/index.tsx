import { RenderableContent } from "@/interfaces";
import { css } from "catom";
import { imgCss } from "../DashTasks/Tasks/Questions/Questions.style";
export function RenderableContentViewer({
  content,
}: {
  content: RenderableContent;
}) {
  if (!content || !content.content) return;
  if (content.type === "image-embed")
    return <img src={content.content} class={imgCss} />;
  if (content.type === "link") {
    return (
      <a
        href={content.content}
        target="_blank"
        rel="noopener"
        class={css({ wordBreak: "break-all" })}
      >
        {content.content}
      </a>
    );
  }
  return <span>{content.content}</span>;
}
