import {
  RefType,
  VNode,
  useCallback,
  useMemo,
} from "@hydrophobefireman/ui-lib";
import { errorCss, paperInput, wrapperCSS } from "./AnimatedInput.styles";

interface InputProps
  extends Omit<JSX.HTMLAttributes<HTMLInputElement>, "onInput" | "icon"> {
  id?: string;
  value: string;
  onInput(value: string): void;
  wrapperClass?: string;
  labelText?: string;
  inputClass?: string | string[];
  inputProps?: JSX.HTMLAttributes;
  errorText?: string;
  ref?: RefType<HTMLInputElement>;
}

export function AnimatedInput(props: InputProps): VNode {
  const randomId = useMemo(() => Math.random().toString(36).substr(2), []);

  const {
    id = randomId,
    wrapperClass,
    onInput,
    labelText,
    inputClass,
    errorText,
    value,
    ...rest
  } = props;
  const handleInput = useCallback(
    function (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) {
      return onInput(e.currentTarget.value);
    },
    [onInput]
  );
  return (
    <div class={[wrapperCSS].concat(wrapperClass)}>
      <input
        onInput={handleInput}
        id={id}
        value={value}
        data-error={!!errorText}
        class={[paperInput].concat(inputClass)}
        data-should-focus={`${!!value}`}
        {...rest}
      />
      <label class={[errorText ? errorCss : null]} for={id}>
        {errorText || labelText}
      </label>
    </div>
  );
}
