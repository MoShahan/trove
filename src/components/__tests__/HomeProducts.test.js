import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import Products from "@/components/Home/Products/Products";
import { fetchCategories, fetchProductsPage } from "@/utils/products";

jest.mock("@/utils/products", () => ({
  fetchProductsPage: jest.fn(),
  fetchCategories: jest.fn(),
  PRODUCT_PAGE_SIZE: 12,
}));

jest.mock("@/utils/toast", () => ({
  toastMessage: jest.fn(),
}));

const products = [
  {
    id: 1,
    title: "Galaxy Phone",
    imageUrl: "/phone.jpg",
    price: 499,
    brand: "Samsung",
    model: "S24",
    isPopular: true,
    color: "black",
  },
  {
    id: 2,
    title: "Wooden Chair",
    imageUrl: "/chair.jpg",
    price: 120,
    brand: "Ikea",
    model: "A1",
    isPopular: false,
    color: "brown",
  },
];

const makeProduct = (id, title = `Product ${id}`) => ({
  id,
  title,
  imageUrl: `/${id}.jpg`,
  price: id * 10,
  brand: "Brand",
  model: "M",
  isPopular: false,
  color: "black",
});

describe("Home Products", () => {
  beforeEach(() => {
    fetchCategories.mockResolvedValue(["mobile", "furniture"]);
    fetchProductsPage.mockResolvedValue({ products, total: 2 });
    global.IntersectionObserver.instances = [];
  });

  it("renders products after loading", async () => {
    render(<Products />);

    expect(await screen.findByText("Galaxy Phone")).toBeInTheDocument();
    expect(screen.getByText("Wooden Chair")).toBeInTheDocument();
    expect(screen.getByText("all")).toBeInTheDocument();
    expect(screen.getByText("mobile")).toBeInTheDocument();
    expect(screen.getByText("All categories")).toBeInTheDocument();
  });

  it("filters products by search", async () => {
    render(<Products />);
    await screen.findByText("Galaxy Phone");

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "chair" },
    });

    await waitFor(() => {
      expect(screen.queryByText("Galaxy Phone")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Wooden Chair")).toBeInTheDocument();
  });

  it("loads the next page when the infinite scroll sentinel is visible", async () => {
    const firstPage = Array.from({ length: 12 }, (_, index) =>
      makeProduct(index + 1)
    );
    const secondPage = [makeProduct(13, "Second Page Item")];

    fetchProductsPage
      .mockResolvedValueOnce({ products: firstPage, total: 13 })
      .mockResolvedValueOnce({ products: secondPage, total: 13 });

    render(<Products />);

    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    expect(screen.getByTestId("infinite-scroll-sentinel")).toBeInTheDocument();
    expect(screen.queryByText("Second Page Item")).not.toBeInTheDocument();

    act(() => {
      global.IntersectionObserver.instances.forEach((observer) =>
        observer.callback([{ isIntersecting: true }])
      );
    });

    expect(await screen.findByText("Second Page Item")).toBeInTheDocument();
    await waitFor(() => {
      expect(fetchProductsPage).toHaveBeenCalledWith({
        category: "all",
        limit: 12,
        order: "asc",
        skip: 12,
        sortBy: "title",
      });
    });
  });
});
