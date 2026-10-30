import { SxProps } from "@mui/material";
import { SystemStyleObject, Theme } from "@mui/system";

export const HeaderContainer: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 2,
  mb: 2,
  pb: 2,
  borderBottom: "1px solid",
  borderColor: "divider",
};

export const HeaderControls: SxProps = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 1.5,
};

export const SortGroup: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const SortIconButton: SxProps = {
  width: 40,
  height: 40,
  borderRadius: "8px",
  bgcolor: "secondary.main",
  "&:hover": {
    bgcolor: "#e8e6e7",
  },
};

export const RoundedInputStyle: SystemStyleObject<Theme> = {
  height: 40,
  fontSize: "0.975rem",
  bgcolor: "secondary.main",
  borderRadius: "8px",
  "&.MuiOutlinedInput-root, & .MuiOutlinedInput-root": {
    height: 40,
    fontSize: "0.975rem",
    bgcolor: "secondary.main",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    py: 0.75,
  },
  "& .MuiSelect-select": {
    py: 0,
    height: "100%",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  "& fieldset": {
    borderRadius: "8px",
    borderColor: "transparent",
  },
  "&:hover fieldset, & .MuiOutlinedInput-root:hover fieldset": {
    borderColor: "rgba(17, 25, 40, 0.12)",
  },
  "& .Mui-focused fieldset, & .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: "primary.main",
    borderWidth: "1px",
  },
};

export const CategoryBar: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  mb: 3,
};

export const CategoryRow: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 2.5,
  pb: 1,
  overflowX: "auto",
  flexWrap: "nowrap",
  flex: 1,
  minWidth: 0,
  scrollBehavior: "smooth",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

export const CategoryScrollButton: SxProps = {
  width: 32,
  height: 32,
  flexShrink: 0,
  borderRadius: "8px",
  bgcolor: "secondary.main",
  "&:hover": {
    bgcolor: "#e8e6e7",
  },
  "&.Mui-disabled": {
    opacity: 0.35,
  },
};

export const CategoryItem: SystemStyleObject<Theme> = {
  position: "relative",
  flexShrink: 0,
  textTransform: "capitalize",
  cursor: "pointer",
  whiteSpace: "nowrap",
  color: "text.secondary",
  pb: "6px",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: "primary.main",
  },
};

export const CategoryItemActive: SystemStyleObject<Theme> = {
  color: "primary.main",
  fontWeight: 600,
};
