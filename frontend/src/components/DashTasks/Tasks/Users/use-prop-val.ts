import { useEffect, useState } from "@hydrophobefireman/ui-lib";

export function usePropVal<T>(prop: T): [T, (arg: T) => void] {
  const [val, setVal] = useState(prop);
  useEffect(() => setVal(prop), [prop]);
  return [val, setVal];
}
