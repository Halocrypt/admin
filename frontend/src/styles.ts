import { css } from "catom";

export const centerFlex = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const center = css({ margin: "auto", textAlign: "center" });

export const actionButton = css({
  display: "inline-flex",
  alignContent: "center",
  fontSize: "1.1rem",
  color: "var(--fg)",
  background: "transparent",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  transition: "0.3s linear",
  padding: ".2rem",
  paddingLeft: ".5rem",
  paddingRight: ".5rem",
  borderRadius: "5px",
  pseudo: {
    ":hover": { background: "var(--alpha)" },
    ":focus": { background: "var(--alpha)" },
  },
});
