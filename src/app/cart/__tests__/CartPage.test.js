import { render, screen } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import CartPage from "../page";

describe("CartPage", () => {
  const theme = createTheme();

  it("should render", () => {
    render(
      <ThemeProvider theme={theme}>
        <CartPage />
      </ThemeProvider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("My Cart")).toBeInTheDocument();
    expect(screen.getByText("No Items in Cart")).toBeInTheDocument();
  });
});
