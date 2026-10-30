import { fireEvent, render, screen } from "@testing-library/react";

import { toastMessage } from "@/utils/toast";

import CheckoutFormComponent from "../Cart/CheckoutForm";

jest.mock("@/utils/toast", () => ({
  toastMessage: jest.fn(),
}));

describe("CheckoutFormComponent", () => {
  let handleClearCart;
  let handleClose;

  beforeEach(() => {
    handleClearCart = jest.fn();
    handleClose = jest.fn();
  });

  test("renders component", () => {
    render(
      <CheckoutFormComponent
        handleClearCart={handleClearCart}
        handleClose={handleClose}
      />
    );

    expect(screen.getByText("Payment Information Form")).toBeInTheDocument();
  });

  test("change input for all fields and then submit", () => {
    render(
      <CheckoutFormComponent
        handleClearCart={handleClearCart}
        handleClose={handleClose}
      />
    );

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { name: "fullName", value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { name: "address", value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText(/pin code/i), {
      target: { name: "pinCode", value: "12345" },
    });
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { name: "city", value: "New York" },
    });
    fireEvent.change(screen.getByLabelText(/state/i), {
      target: { name: "state", value: "NY" },
    });
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { name: "country", value: "USA" },
    });
    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { name: "mobileNumber", value: "9876543210" },
    });

    expect(screen.getByLabelText(/full name/i).value).toBe("John Doe");
    expect(screen.getByLabelText(/address/i).value).toBe("123 Main St");
    expect(screen.getByLabelText(/pin code/i).value).toBe("12345");
    expect(screen.getByLabelText(/city/i).value).toBe("New York");
    expect(screen.getByLabelText(/state/i).value).toBe("NY");
    expect(screen.getByLabelText(/country/i).value).toBe("USA");
    expect(screen.getByLabelText(/mobile number/i).value).toBe("9876543210");

    fireEvent.submit(screen.getByTestId("submit-btn").closest("form"));

    expect(handleClearCart).toHaveBeenCalledWith(true);
    expect(handleClose).toHaveBeenCalled();
    expect(toastMessage).toHaveBeenCalledWith("success", "Checkout Completed");
  });

  test("inputing non-numeric values", () => {
    render(
      <CheckoutFormComponent
        handleClearCart={handleClearCart}
        handleClose={handleClose}
      />
    );

    fireEvent.change(screen.getByLabelText(/pin code/i), {
      target: { name: "pinCode", value: "abc" },
    });

    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { name: "mobileNumber", value: "xyz" },
    });

    expect(screen.getByLabelText(/pin code/i).value).toBe("");
    expect(screen.getByLabelText(/mobile number/i).value).toBe("");
  });
});
