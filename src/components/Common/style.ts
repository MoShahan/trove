import { SxProps } from "@mui/material";
import { SystemStyleObject, Theme } from "@mui/system";

export const ProductsCardContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover img": {
    transform: "scale(1.1)",
  },
};

export const CardImageContainer: SxProps = {
  position: "relative",
  borderRadius: "20px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  display: "flex",
  justifyContent: "center",
  p: 1.5,
  mb: 3,
  img: {
    objectFit: "contain",
    objectPosition: "center",
    transition: "transform 0.3s ease-in-out",
  },
};

export const WishlistButtonStyle: SystemStyleObject<Theme> = {
  position: "absolute",
  bottom: "-14px",
  right: 15,
  background: "linear-gradient(145deg, #222, #000)",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  cursor: "pointer",
  transition: "box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",
};

export const PopularTagContainer: SxProps = {
  position: "absolute",
  top: 8,
  right: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  zIndex: 3,
  backgroundImage: "linear-gradient(135deg, #FF4500, #FF8C00, #FFD700)",
  boxShadow: "0px 0px 10px rgba(255, 140, 0, 0.6)",
};

export const DiscountTagContainer: SxProps = {
  position: "absolute",
  top: 8,
  left: 8,
  zIndex: 3,
  bgcolor: "error.main",
  color: "#fff",
  borderRadius: "8px",
  px: 1,
  py: 0.25,
  fontWeight: 600,
  fontSize: "0.75rem",
  lineHeight: 1.4,
};

export const BottomOverlay: SystemStyleObject<Theme> = {
  position: "absolute",
  borderBottomLeftRadius: "inherit",
  borderBottomRightRadius: "inherit",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "height 0.3s ease-in-out",
  overflow: "hidden",
};

export const BreadcrumbsContainer: SxProps = {
  mb: 3,
  bgcolor: "secondary.main",
  py: 2,
  px: 1,
  borderRadius: 1,
};
