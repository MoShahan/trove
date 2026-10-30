"use client";
import { League_Spartan } from "next/font/google";

import { createTheme } from "@mui/material/styles";

const leagueSpartan = League_Spartan({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: leagueSpartan.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "100%",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "100%",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "100%",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "100%",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "100%",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "100%",
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 600,
      lineHeight: "100%",
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "100%",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "100%",
    },
    subtitle1: {
      fontSize: "0.975rem",
      fontWeight: 500,
      lineHeight: "100%",
    },
    subtitle2: {
      fontSize: "0.970rem",
      fontWeight: 400,
      lineHeight: "100%",
    },
  },
  palette: {
    background: {
      default: "#fff",
    },
    primary: {
      main: "#111928",
    },
    secondary: {
      main: "#F2F0F1",
    },
    error: {
      main: "#ff0033",
    },
  },
  components: {
    MuiFormLabel: {
      defaultProps: {
        sx: {
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "primary.main",
          mb: 0.5,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        FormHelperTextProps: {
          sx: {
            color: "#ff0033",
            wordSpacing: "0.1rem",
          },
        },
        InputProps: {
          sx: {
            borderRadius: 2,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: "20px",
          p: "16px 32px",
          textTransform: "none",
          fontSize: "1rem",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
        direction: "row",
      },
    },
    MuiChip: {
      defaultProps: {
        sx: {
          fontSize: "1rem",
        },
      },
    },
    // MuiSvgIcon: {
    //   defaultProps: {
    //     sx: {
    //       color: "#000",
    //     },
    //   },
    // },
  },
});

export default theme;
