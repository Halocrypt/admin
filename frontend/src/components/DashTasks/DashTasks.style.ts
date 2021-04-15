import { centerFlex } from "@/styles";
import { css } from "catom";

export const dashContainer = [
  centerFlex,
  css({ minHeight: "90vh", flexDirection: "column" }),
].join(" ");

export const adminActionButton = [
  centerFlex,
  css({
    textDecoration: "none",
    transition: "0.3s ease",
    boxShadow: "var(--box-shadow)",
    cursor: "pointer",
    background: "var(--bg)",
    flexDirection: "column",
    padding: "2rem",
    borderRadius: "20px",
    textAlign: "center",
    margin: "1rem",
    pseudo: {
      ":hover": {
        transform: "scale(1.05)",
      },
    },
  }),
].join(" ");

export const actionWrapper = css({
  margin: "auto",
  width: "80vw",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
});

export const dashHeading = css({
  marginLeft: "2rem",
  color: "var(--fg)",
  marginBottom: "0",
});

export const backToDashBoardWrapper = css({
  margin: "1rem",
  marginLeft: "5px",
});

export const backLink = css({
  textDecoration: "none",
  transition: "0.3s ease",
  willChange: "transform",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  pseudo: { ":hover": { transform: "scale(1.05)" } },
});
export const iconCss = css({ margin: ".5rem" });

export const taskWrapper = css({
  minHeight: "60vh",
  boxShadow: "var(--box-shadow)",
  width: "80vw",
  margin: "auto",
  wordBreak: "break-word",
  padding: "2rem",
  maxWidth: "750px",
  display: "flex",
  flexDirection: "column",
});

export const resourceContainer = css({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
});
