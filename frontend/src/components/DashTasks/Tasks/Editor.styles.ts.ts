import { actionButton, center, centerFlex } from "@/styles";

import { css } from "catom";

export const activeActionButton = [
  actionButton,
  centerFlex,
  css({
    flex: "1",
    margin: "0.5rem",
    textAlign: "center",
    pseudo: {
      "[data-active]": {
        color: "var(--bg)",
        background: "var(--fg)",
      },
    },
    media: {
      "(max-width:750px)": { width: "80%" },
    },
  }),
].join(" ");

export const activeActionButtonContainer = css({
  display: "flex",
  justifyContent: "space-between",
  textAlign: "center",
  alignItems: "center",
  marginBottom: ".5rem",
  marginTop: ".5rem",
  media: {
    "(max-width:750px)": { flexDirection: "column" },
  },
});

export const closeActionContainer = css({
  justifyContent: "flex-end",
  display: "flex",
  alignItems: "center",
});

export const editorRoot = css({
  margin: "1rem",
  borderRadius: "10px",
  padding: "1rem",
  media: {
    "(max-width:750px)": { padding: ".5px" },
  },
  // boxShadow: "var(--box-shadow)",
});

export const editorFields = [center, css({ marginTop: "2rem" })].join(" ");

export const fieldWrap = css({
  border: "2px solid var(--fg)",
  borderRadius: "10px",
  marginTop: "1rem",
  marginBottom: "1rem",
});
