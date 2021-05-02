//@ts-ignore
import img from "@/images/deletos.jpg";
import { center, centerFlex } from "@/styles";
import { css } from "catom";
export default function No() {
  return (
    <div class={centerFlex}>
      <div class={center}>
        <h1 class={css({ fontSize: "2rem" })}>No</h1>
        <img
          src={img}
          class={css({
            animation: "negativeAnim 0.8s ease",
            animationIterationCount: "infinite",
            borderRadius: "50%",
          })}
        />
      </div>
    </div>
  );
}
