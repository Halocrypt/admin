import { useEffect, useState } from "@hydrophobefireman/ui-lib";

export function useTimeout(n: number) {
  const [over, setOver] = useState(false);
  useEffect(() => {
    setOver(false);
    const t = setTimeout(() => setOver(true), n);
    return () => clearTimeout(t);
  }, [n]);
  return over;
}
