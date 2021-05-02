import {
  activeActionButton,
  activeActionButtonContainer,
} from "../../Editor.styles.ts";

interface RenderableTypeSelectorProps {
  active: string;
  handleClick(e: any): void;
}
export function RenderableTypeSelector({
  active,
  handleClick,
}: RenderableTypeSelectorProps) {
  return (
    <div class={activeActionButtonContainer}>
      {["text", "link", "image-embed"].map((x) => (
        <button
          class={activeActionButton}
          data-active={x === active}
          data-type={x}
          onClick={handleClick}
        >
          {x}
        </button>
      ))}
    </div>
  );
}
