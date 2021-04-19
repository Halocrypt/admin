// javascript is supported
import "./App.css";

import { VNode, render, addPluginCallback } from "@hydrophobefireman/ui-lib";

import { RouteLoader } from "./components/RouteLoader";
import { useCredsCheck } from "./hooks/use-creds-check";
import { centerFlex } from "./styles";
import { Motion } from "@hydrophobefireman/ui-anim";

// addPluginCallback({
//   createElement(vnode) {
//     const children = vnode.props.children || [];
//     const newChildren = [];
//     for (const child of children) {
//       if (typeof child === "string" || typeof child === "number") {
//         const last = newChildren.length - 1;
//         const prev = newChildren[last];
//         if (typeof prev === "string" || typeof prev === "number") {
//           newChildren[last] += child;
//         } else {
//           newChildren.push(child);
//         }
//       } else {
//         newChildren.push(child);
//       }
//     }
//     console.log(children, newChildren);
//     (vnode.props.children as any) = newChildren;
//   },
// });
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
