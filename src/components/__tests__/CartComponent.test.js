import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Cart from "@/components/Cart/Cart";

jest.mock("@/utils/toast", () => ({
  toastMessage: jest.fn(),
}));

describe("Cart Component", () => {
  const theme = createTheme();

  beforeEach(() => {
    localStorage.clear();
  });

  it("shows an empty state when the cart has no items", () => {
    render(
      <ThemeProvider theme={theme}>
        <Cart />
      </ThemeProvider>
    );

    expect(screen.getByText("No Items in Cart")).toBeInTheDocument();
  });

  it("renders cart items and updates quantity", () => {
    localStorage.setItem(
      "trove-cart",
      JSON.stringify({
        1: {
          id: 1,
          title: "Cart Product",
          price: 50,
          quantity: 1,
          color: "red",
          image: "/item.jpg",
          category: "gadgets",
        },
      })
    );

    render(
      <ThemeProvider theme={theme}>
        <Cart />
      </ThemeProvider>
    );

    expect(screen.getByText("Cart Product")).toBeInTheDocument();
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getAllByText("$50.00").length).toBeGreaterThan(0);

    fireEvent.click(
      screen.getByTestId("AddCircleOutlineIcon").closest("button")
    );
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });
});
