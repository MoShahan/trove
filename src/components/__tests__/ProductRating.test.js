import { render, screen } from "@testing-library/react";

import ProductRating, { getStarFills } from "../Common/ProductRating";

describe("getStarFills", () => {
  test("fills three stars and exactly 60% of the fourth for 3.6", () => {
    expect(getStarFills(3.6)).toEqual([100, 100, 100, 60, 0]);
  });

  test("does not snap a 0.6 remainder to a half star", () => {
    expect(getStarFills(4.6)[4]).toBe(60);
    expect(getStarFills(2.3)[2]).toBe(30);
  });
});

describe("ProductRating", () => {
  test("snaps 3.64 to a 3.6 fill so the fourth star is exactly 60%", () => {
    render(<ProductRating rating={{ rate: 3.64, count: 4 }} />);

    expect(
      screen
        .getAllByTestId("rating-star")
        .map((star) => star.getAttribute("data-fill"))
    ).toEqual(["100", "100", "100", "60", "0"]);
  });

  test("renders five stars with exact fills and the review count", () => {
    render(<ProductRating rating={{ rate: 3.6, count: 12 }} />);

    const stars = screen.getAllByTestId("rating-star");
    expect(stars).toHaveLength(5);
    expect(stars.map((star) => star.getAttribute("data-fill"))).toEqual([
      "100",
      "100",
      "100",
      "60",
      "0",
    ]);
    expect(screen.getByText("(12)")).toBeInTheDocument();
    expect(screen.queryByText("3.6")).not.toBeInTheDocument();
  });

  test("hides the count when there are no reviews", () => {
    render(<ProductRating rating={{ rate: 4, count: 0 }} />);
    expect(screen.queryByText("(0)")).not.toBeInTheDocument();
  });

  test("renders nothing without a rating", () => {
    const { container } = render(<ProductRating rating={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
