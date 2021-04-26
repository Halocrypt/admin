import { actionButton } from "@/styles";
import { css } from "catom";

export const filterBox = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
});

export const filterButton = [
  css({
    justifyContent: "center",
  }),
  actionButton,
].join(" ");
