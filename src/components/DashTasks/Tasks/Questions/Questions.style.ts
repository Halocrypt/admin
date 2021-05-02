import { css } from "catom";

export const selectCss = css({
  width: "50%",
  padding: ".5rem",
  background: "var(--bg)",
  color: "var(--font)",
  border: "2px solid var(--fg)",
  outline: "none",
  borderRadius: "5px",
});

export const questionBox = css({
  padding: "2rem",
  paddingTop: "0.5rem",
  textAlign: "center",
  minWidth: "300px",
  // border: "2px solid var(--font)",

  media: {
    "(max-width:750px)": { padding: "5px" },
    "(min-width:750px)": { width: "80%" },
  },
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "500px",
  borderRadius: "10px",
  marginTop: "1rem",
  marginBottom: "1rem",
  boxShadow: "var(--box-shadow)",
  pseudo: { ":hover>[data-edit]": { opacity: "1" } },
});

export const editQuestionWrapper = css({
  media: {
    "(min-width:750px)": { opacity: "0" },
  },
  transition: "0.3s ease",
  textAlign: "right",
});

export const questionHeading = css({
  fontSize: "1.3rem",
  marginBottom: "5px",
});
export const questionPoints = css({
  color: "var(--fg)",
  textAlign: "right",
  fontSize: ".85rem",
  fontWeight: "bold",
});
export const imgCss = css({ maxWidth: "50%", maxHeight: "50%" });

export const editQuestionHeading = css({ margin: "1rem", fontSize: "1.2rem" });

export const animInputWrapperClass = css({
  marginTop: ".8rem",
  marginBottom: ".8rem",
});
