import { useEffect } from "@hydrophobefireman/ui-lib";

export function useOverflowHidden() {
  useEffect(() => {
    const body = document.body;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    return () => (body.style.overflow = prev);
  }, []);
}
