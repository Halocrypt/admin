import { center } from "@/styles";
import { css } from "catom";

export const notificationItem = [
  center,
  css({
    borderRadius: "10px",
    padding: "1rem",
    border: "2px solid var(--fg)",
    boxShadow: "var(--box-shadow)",
    pseudo: { ":hover>[data-delete]": { opacity: "1" } },
  }),
].join(" ");

export const notificationDeleteBox = css({
  media: {
    "(min-width:750px)": { opacity: "0" },
  },
  transition: "0.3s ease",
  textAlign: "right",
});
