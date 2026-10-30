import { SxProps } from "@mui/material";
import { SystemStyleObject, Theme } from "@mui/system";

export const CartDetailsWrapper: SxProps = {
  display: "flex",
  flexWrap: "wrap",

  gap: {
    xs: "12px",
    md: "20px",
  },
};

export const BorderedContainer: SystemStyleObject<Theme> = {
  p: {
    xs: "14px",
    md: "20px 24px",
  },
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "20px",
};

export const ImageCard: SxProps = {
  flex: {
    xs: 1,
    md: 0,
  },
  borderRadius: "20px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  display: "flex",
  justifyContent: "center",

  p: 1.5,
  img: {
    objectFit: "contain",
    objectPosition: "center",
    transition: "transform 0.3s ease-in-out",
  },
};
