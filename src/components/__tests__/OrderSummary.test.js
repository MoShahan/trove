import { render, screen, fireEvent } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import OrderSummary from "@/components/Cart/OrderSummary";

describe("OrderSummary Component", () => {
  const theme = createTheme();

  const handleClearCart = jest.fn();
  const handleCheckout = jest.fn();

  const totalAmount = 100;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Order Summary with correct values", () => {
    render(
      <ThemeProvider theme={theme}>
        <OrderSummary
          totalAmount={totalAmount}
          handleCheckout={handleCheckout}
          handleClearCart={handleClearCart}
        />
      </ThemeProvider>
    );

    // Check if the components are rendered with correct text
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText(`$${totalAmount.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("$15.00")).toBeInTheDocument();
    expect(screen.getByText("Tax")).toBeInTheDocument();
    expect(screen.getByText("$5.00")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(
      screen.getByText(`$${(totalAmount + 15 + 5).toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("should call handleClearCart when Clear Cart button is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <OrderSummary
          totalAmount={totalAmount}
          handleCheckout={handleCheckout}
          handleClearCart={handleClearCart}
        />
      </ThemeProvider>
    );

    const clearCartButton = screen.getByText(/Clear Cart/i);
    fireEvent.click(clearCartButton);

    expect(handleClearCart).toHaveBeenCalledWith(false);
  });

  it("should call handleCheckout when Checkout button is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <OrderSummary
          totalAmount={totalAmount}
          handleCheckout={handleCheckout}
          handleClearCart={handleClearCart}
        />
      </ThemeProvider>
    );

    const checkoutButton = screen.getByText(/Checkout/i);
    fireEvent.click(checkoutButton);

    expect(handleCheckout).toHaveBeenCalled();
  });

  it("should correctly calculate and display the total amount", () => {
    render(
      <ThemeProvider theme={theme}>
        <OrderSummary
          totalAmount={totalAmount}
          handleCheckout={handleCheckout}
          handleClearCart={handleClearCart}
        />
      </ThemeProvider>
    );

    // Check if the Total value is correct
    expect(
      screen.getByText(`$${(totalAmount + 15 + 5).toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("should render Clear Cart and Checkout buttons", () => {
    render(
      <ThemeProvider theme={theme}>
        <OrderSummary
          totalAmount={totalAmount}
          handleCheckout={handleCheckout}
          handleClearCart={handleClearCart}
        />
      </ThemeProvider>
    );

    // Check if both buttons are rendered
    expect(screen.getByText("Clear Cart")).toBeInTheDocument();
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });
});
