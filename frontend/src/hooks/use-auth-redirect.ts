import { client } from "@/bridge";

import {
  redirect,
  useEffect,
  useRef,
  useRoute,
} from "@hydrophobefireman/ui-lib";
import { useSharedState } from "statedrive";

export function useAuthRedirect() {
  const [user] = useSharedState((client as any)._state as any) as any;
  const { search, path } = useRoute();
  const ref = useRef("");
  ref.current = path;
  const next = search.get("next");
  useEffect(() => {
    if (user && user.user) {
      if (user.is_admin) {
        if (next) return redirect(next);
        if (!ref.current.includes("dash")) return redirect("/dash");
        return;
      }
      return redirect("/no");
    }
    if (ref.current != "/") {
      return redirect("/");
    }
  }, [user, next]);
}
