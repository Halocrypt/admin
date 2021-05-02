import { css } from "catom";

export const userItem = css({
  boxShadow: "var(--box-shadow)",
  padding: "2rem",
  background: "var(--bg)",
  borderRadius: "10px",
  // pseudo: { ":hover>[data-db-actions]": { opacity: "1" } },
  marginTop: ".5rem",
  marginBottom: ".5rem",
  transformOrigin: "top left",
});

export const userNameCss = css({
  color: "var(--fg)",
  display: "inline-flex",
  alignItems: "baseline",
});

export const adminActionBox = css({
  textAlign: "right",
  transition: "0.3s ease",
  // media: {
  //   // "(min-width:750px)": { opacity: "0" },
  // },
});

export const profileViewer = css({
  zIndex: 2,
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: "var(--bg)",
  overflowY: "scroll",
  padding: "2rem",
});

export const profileContents = css({
  margin: "auto",
  width: "80%",
  maxWidth: "800px",
  marginTop: "2rem",
  boxShadow: "var(--box-shadow)",
  padding: "1rem",
  borderRadius: "10px",
  animation: "scale_anim 0.1s linear",
  animationFillMode: "forwards",
});
