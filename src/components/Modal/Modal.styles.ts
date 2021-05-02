import { css } from "catom";

export const closeButton = css({
  position: "absolute",
  right: "0",
  top: "0",
});

export const mask = css({
  height: "100vh",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(48, 48, 48, 0.8)",
  position: "fixed",
  width: "100vw",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  zIndex: 5,
});

export const modal = css({
  boxShadow: "var(--box-shadow)",
  background: "var(--bg)",
  width: "70%",
  maxWidth: "450px",
  padding: "2rem",
  borderRadius: "10px",
  animation: "scale_anim 0.1s linear",
  animationFillMode: "forwards",
  overflowY: "auto",
});
