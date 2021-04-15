// javascript is supported
import "./App.css";

import { VNode, render } from "@hydrophobefireman/ui-lib";

import { RouteLoader } from "./components/RouteLoader";
import { useCredsCheck } from "./hooks/use-creds-check";
import { centerFlex } from "./styles";
import { Motion } from "@hydrophobefireman/ui-anim";

function App(): VNode {
  const isReady = useCredsCheck();
  if (!isReady)
    return <div class={centerFlex}>Checking your credentials...</div>;
  return (
    <Motion>
      <main>
        <RouteLoader />
      </main>
    </Motion>
  );
}

render(<App />, document.getElementById("app-mount"));
