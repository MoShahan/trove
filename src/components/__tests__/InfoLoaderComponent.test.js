import { render, screen } from "@testing-library/react";

import InfoLoader from "../ProductInfo/InfoLoader";

describe("InfoLoader Component", () => {
  test("renders skeleton loaders", () => {
    render(<InfoLoader />);

    expect(screen.getByTestId("info-loader")).toBeInTheDocument();
    expect(
      document.querySelectorAll(".MuiSkeleton-root").length
    ).toBeGreaterThan(0);
  });

  test("renders main rectangular skeleton", () => {
    render(<InfoLoader />);
    expect(document.querySelector(".MuiSkeleton-rectangular")).toBeTruthy();
  });

  test("renders multiple text skeletons", () => {
    render(<InfoLoader />);
    expect(
      document.querySelectorAll(".MuiSkeleton-root").length
    ).toBeGreaterThan(5);
  });
});
