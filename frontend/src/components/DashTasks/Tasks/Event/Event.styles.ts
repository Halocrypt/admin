import { css } from "catom";

export const eventHeadWrapper = css({
  textAlign: "left",
  margin: "0.5rem",
  color: "var(--fg)",
  fontSize: "1.5rem",
  fontWeight: "bold",
});

export const eventName = css({
  textTransform: "capitalize",
  fontSize: "1.2rem",
  fontWeight: "bold",
});

export const eventItem = css({
  padding: "1rem",
  border: "2px solid var(--fg)",
  borderRadius: "10px",
  boxShadow: "var(--box-shadow)",
  margin: "1rem",
});

export const editButtonWrapper = css({
  margin: "0.5rem",
  textAlign: "right",
  marginTop: "0px",
});

export const eventDataLine = css({ marginTop: ".5rem", marginBottom: ".5rem" });
