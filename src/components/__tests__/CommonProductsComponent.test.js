import { fireEvent, render, screen } from "@testing-library/react";

import { ProductsCard, WishlistButton } from "../Common/Products";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  imageUrl: "/test-image.jpg",
  brand: "Test Brand",
  isPopular: true,
  discount: 10,
  rating: { rate: 4.5, count: 8 },
};

const mockHandleWishlist = jest.fn();

describe("ProductsCard Component", () => {
  test("renders product card with correct details", () => {
    render(
      <ProductsCard
        product={mockProduct}
        handleWishlist={mockHandleWishlist}
        isWishlisted={false}
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$89.99")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByTestId("discount-badge")).toHaveTextContent("-10%");
    expect(screen.getByTestId("product-rating")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Test Brand/i })).toHaveAttribute(
      "src",
      "/test-image.jpg"
    );
  });

  test("renders popular tag when product is popular", () => {
    render(
      <ProductsCard
        product={mockProduct}
        handleWishlist={mockHandleWishlist}
        isWishlisted={false}
      />
    );
    expect(
      screen.getByTestId("LocalFireDepartmentRoundedIcon")
    ).toBeInTheDocument();
  });

  test("handles wishlist button click", () => {
    render(
      <ProductsCard
        product={mockProduct}
        handleWishlist={mockHandleWishlist}
        isWishlisted={false}
      />
    );

    fireEvent.click(screen.getByTestId("wishlist-button"));
    expect(mockHandleWishlist).toHaveBeenCalledWith(1);
  });
});

describe("WishlistButton Component", () => {
  test("renders wishlist button with correct initial state", () => {
    render(
      <WishlistButton
        id={1}
        toggleWishlist={mockHandleWishlist}
        isWishlisted={false}
      />
    );
    const wishlistIcon = screen.getByTestId("FavoriteIcon");
    expect(wishlistIcon).toHaveStyle("color: #fff");
  });

  test("calls toggleWishlist on click", () => {
    render(
      <WishlistButton
        id={1}
        toggleWishlist={mockHandleWishlist}
        isWishlisted={false}
      />
    );

    fireEvent.click(screen.getByTestId("wishlist-button"));
    expect(mockHandleWishlist).toHaveBeenCalledWith(expect.any(Object), 1);
  });
});
