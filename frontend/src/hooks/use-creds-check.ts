import { client } from "@/bridge";
import { useState } from "@hydrophobefireman/ui-lib";
import { useMount } from "./use-mount";

export function useCredsCheck() {
  const [ready, setReady] = useState(false);
  useMount(() => {
    client.syncWithServer().then(() => setReady(true));
  });
  return ready;
}
