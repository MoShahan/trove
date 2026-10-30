import { SxProps } from "@mui/material";

export const LinkStyle = {
  textDecoration: "none",
  color: "inherit",
};

export const TruncatedText: SxProps = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordSpacing: "0.2rem",
  mb: 1.5,
};

export const ProductsWrapper: SxProps = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
  columnGap: { xs: 3, md: 4 },
  rowGap: { xs: 4, md: 5 },
};
