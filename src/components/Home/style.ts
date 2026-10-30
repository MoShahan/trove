import { SxProps } from "@mui/material";

export const BannerContainer: SxProps = {
  position: "relative",
  overflow: "hidden",
  bgcolor: "secondary.main",
  p: { xs: "40px 24px", md: "56px 32px" },
  minHeight: { xs: 380, md: 520 },
  display: "flex",
  alignItems: "center",
};

export const BannerImageWrap: SxProps = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

export const BannerImageFade: SxProps = {
  display: { xs: "block", md: "none" },
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(90deg, #F2F0F1 0%, #F2F0F1 46%, rgba(242,240,241,0.55) 68%, transparent 100%)",
};

export const ContentWrapper: SxProps = {
  position: "relative",
  zIndex: 1,
  maxWidth: {
    xs: "100%",
    md: "48%",
    lg: "40%",
  },
  display: "flex",
  flexDirection: "column",
  gap: "25px",
};
