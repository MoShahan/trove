import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { fetchProductById } from "@/utils/products";
import { toastMessage } from "@/utils/toast";

import ProductInfo from "../ProductInfo/ProductInfo";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "1" }),
}));

jest.mock("@/utils/products", () => ({
  fetchProductById: jest.fn(),
}));

jest.mock("@/utils/toast", () => ({
  toastMessage: jest.fn(),
}));

const product = {
  id: 1,
  title: "Test Product",
  category: "Electronics",
  description: "A great product",
  price: 100,
  discount: 10,
  rating: { rate: 4.6, count: 3 },
  brand: "BrandX",
  model: "ModelX",
  image: "test-image.jpg",
  popular: true,
};

describe("ProductInfo Component", () => {
  beforeEach(() => {
    localStorage.clear();
    fetchProductById.mockResolvedValue(product);
  });

  test("renders loading state initially", () => {
    fetchProductById.mockReturnValue(new Promise(() => {}));
    render(<ProductInfo setRoutes={jest.fn()} />);
    expect(screen.getByTestId("info-loader")).toBeInTheDocument();
  });

  test("renders product details after fetching data", async () => {
    render(<ProductInfo setRoutes={jest.fn()} />);

    expect(await screen.findByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$90.00")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByTestId("discount-badge")).toHaveTextContent("-10%");
    expect(screen.getByTestId("product-rating")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  test("handles adding product to cart", async () => {
    render(<ProductInfo setRoutes={jest.fn()} />);

    const addButton = await screen.findByText("Add to Cart");
    fireEvent.click(addButton);

    expect(toastMessage).toHaveBeenCalledWith("success", "Added to Cart");
    expect(JSON.parse(localStorage.getItem("trove-cart"))[1].quantity).toBe(1);
  });

  test("increments quantity before adding to cart", async () => {
    render(<ProductInfo setRoutes={jest.fn()} />);

    await screen.findByText("Add to Cart");
    fireEvent.click(screen.getByTestId("AddIcon").closest("button"));
    fireEvent.click(screen.getByText("Add to Cart"));

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("trove-cart"))[1].quantity).toBe(
        2
      );
    });
  });
});
