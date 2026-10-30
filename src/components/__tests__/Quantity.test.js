import { fireEvent, render, screen } from "@testing-library/react";

import QuantityComponent from "../Cart/Quantity";

describe("QuantityComponent", () => {
  const handleIncrease = jest.fn();
  const handleDecrease = jest.fn();

  it("increases quantity when the plus button is clicked", () => {
    render(
      <QuantityComponent
        quantity={1}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);

    expect(handleIncrease).toHaveBeenCalledTimes(1);
  });

  it("decreases quantity when the minus button is clicked", () => {
    render(
      <QuantityComponent
        quantity={2}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(handleDecrease).toHaveBeenCalledTimes(1);
  });

  it("disables the minus button when quantity is 1", () => {
    render(
      <QuantityComponent
        quantity={1}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
    );

    expect(screen.getAllByRole("button")[0]).toBeDisabled();
  });
});
