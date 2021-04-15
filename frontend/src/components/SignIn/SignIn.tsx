import { AnimateLayout, createSnapshot } from "@hydrophobefireman/ui-anim";
import { container, loginSection } from "./SignIn.styles";

import { AnimatedInput } from "../AnimatedInput";
import { Form } from "../Form";
import { actionButton } from "@/styles";
import { client } from "@/bridge";
import { css } from "catom";
import { inputWrapperClass } from "./inputWrapperClass";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { useState } from "@hydrophobefireman/ui-lib";

export function SignIn() {
  useAuthRedirect();
  const [decreaseHeight, setDecreaseHeight] = useState(false);
  return (
    <div class={container}>
      <AnimateLayout
        element="section"
        animId="login-section"
        class={loginSection}
        style={decreaseHeight ? { paddingBottom: "0px" } : {}}
        initialSnapshot={createSnapshot({
          height: "30%",
          width: "30%",
          originX: "0%",
          originY: "0%",
        })}
      >
        <h1 class={css({ fontSize: "1.5rem", color: "var(--fg)" })}>Sign In</h1>
        <div>
          <SignInForm callback={(x: number) => setDecreaseHeight(x === 1)} />
        </div>
      </AnimateLayout>
    </div>
  );
}

function SignInForm({ callback }: { callback(x: number): void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  if (step === 1)
    return (
      <div>
        <div class={css({ fontSize: "1.2rem" })}>
          <span class={css({ marginRight: "5px" })}>Hi</span>
          <span>{username}</span>
        </div>
        <div>Signing you in...</div>
      </div>
    );
  if (step === 0)
    return (
      <Form
        onSubmit={async () => {
          const { result } = client.login(username, password);
          setStep(1);
          callback(1);
          setError("");
          const resp = await result;
          if (resp.error) {
            setStep(0);
            callback(0);
            return setError(resp.error);
          }
        }}
      >
        <div class={css({ color: "red" })}>{error}</div>
        <AnimatedInput
          labelText="username"
          value={username}
          onInput={setUsername}
          wrapperClass={inputWrapperClass}
        />
        <AnimatedInput
          labelText="password"
          value={password}
          onInput={setPassword}
          wrapperClass={inputWrapperClass}
          type="password"
        />
        <div class={css({ textAlign: "right" })}>
          <button class={actionButton}>Log In</button>
        </div>
      </Form>
    );
}
