import { centerFlex } from "@/styles";
import { css } from "catom";

export const container = [
  css({ height: "97vh", width: "98vw" }),
  centerFlex,
].join(" ");

export const loginSection = css({
  minHeight: "40vh",
  width: "80vw",
  boxShadow: "var(--box-shadow)",
  padding: "2rem",
  borderRadius: "10px",
  // animation: "scaleDown 0.5s ease",
  // animationFillMode: "forwards",
  maxWidth: "400px",
});
