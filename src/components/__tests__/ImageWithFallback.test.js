import { fireEvent, render, screen } from "@testing-library/react";

import { FALLBACK_IMAGE } from "@/utils/constant";

import ImageWithFallback from "../Common/ImageWithFallback";

describe("ImageWithFallback Component", () => {
  test("renders image with given props", () => {
    render(
      <ImageWithFallback
        alt="Test Image"
        width={100}
        height={100}
        imageUrl="/test-image.jpg"
      />
    );
    const imageElement = screen.getByRole("img", { name: /test image/i });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/test-image.jpg");
  });

  test("uses fallback image on error", () => {
    render(
      <ImageWithFallback
        alt="Fallback Test"
        width={100}
        height={100}
        imageUrl="/broken-image.jpg"
      />
    );
    const imageElement = screen.getByRole("img", { name: /fallback test/i });
    expect(imageElement).toHaveAttribute("src", "/broken-image.jpg");

    fireEvent.error(imageElement);

    expect(screen.getByRole("img", { name: /fallback test/i })).toHaveAttribute(
      "src",
      FALLBACK_IMAGE
    );
  });
});
