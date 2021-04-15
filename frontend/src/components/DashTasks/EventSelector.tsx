import { Events, IEvent } from "@/interfaces";
import { centerFlex } from "@/styles";
import { selectCss } from "./Tasks/Questions/Questions.style";

interface EventSelectorProps {
  events: IEvent[];
  setEvent(e: Events): void;
}
export function EventSelector({ events, setEvent }: EventSelectorProps) {
  return (
    <div class={centerFlex}>
      <select
        class={selectCss}
        onInput={(e) => setEvent(e.currentTarget.value as Events)}
      >
        <option disabled selected value="">
          Select an event
        </option>
        {events.map((x) => (
          <option value={x.name}>{x.name}</option>
        ))}
      </select>
    </div>
  );
}
