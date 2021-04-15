import { css } from "catom";

export const userItem = css({
  boxShadow: "var(--box-shadow)",
  padding: "2rem",
  borderRadius: "10px",
  pseudo: { ":hover>[data-db-actions]": { opacity: "1" } },
  media: {
    "(min-width:750px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
});

export const userNameCss = css({ color: "var(--fg)" });

export const adminActionBox = css({
  textAlign: "right",
  transition: "0.3s ease",
  media: {
    "(min-width:750px)": { opacity: "0" },
  },
});
