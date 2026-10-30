import http from "@/utils/http";
import {
  fetchCategories,
  fetchProductById,
  fetchProducts,
  fetchProductsPage,
  normalizeProduct,
} from "@/utils/products";

jest.mock("@/utils/http", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("product helpers", () => {
  it("normalizes DummyJSON products into catalog cards", () => {
    const product = normalizeProduct({
      id: 12,
      title: "Essence Mascara",
      price: 9.99,
      category: "beauty",
      description: "A mascara",
      discountPercentage: 10.5,
      rating: 4.9,
      stock: 20,
      brand: "Essence",
      sku: "ESS-1",
      tags: ["black"],
      thumbnail: "/thumb.jpg",
      images: ["/full.jpg"],
      reviews: [{ rating: 5 }, { rating: 4 }],
    });

    expect(product).toMatchObject({
      id: 12,
      title: "Essence Mascara",
      image: "/thumb.jpg",
      imageUrl: "/thumb.jpg",
      brand: "Essence",
      model: "ESS-1",
      popular: true,
      isPopular: true,
      color: "black",
      discount: 10.5,
      rating: { rate: 4.9, count: 2 },
    });
  });

  it("fetches and maps product lists", async () => {
    http.get.mockResolvedValue({
      data: {
        products: [{ id: 1, title: "Phone", price: 100, thumbnail: "/p.jpg" }],
      },
    });

    const products = await fetchProducts();
    expect(http.get).toHaveBeenCalledWith("/products?limit=100&skip=0");
    expect(products[0].title).toBe("Phone");
    expect(products[0].imageUrl).toBe("/p.jpg");
  });

  it("fetches a category-filtered list", async () => {
    http.get.mockResolvedValue({ data: { products: [] } });
    await fetchProducts("smartphones");
    expect(http.get).toHaveBeenCalledWith(
      "/products/category/smartphones?limit=100&skip=0"
    );
  });

  it("fetches a product page with skip and total", async () => {
    http.get.mockResolvedValue({
      data: {
        products: [{ id: 2, title: "Lamp", price: 20, thumbnail: "/l.jpg" }],
        total: 40,
      },
    });

    const page = await fetchProductsPage({
      skip: 12,
      limit: 12,
      sortBy: "title",
      order: "asc",
    });
    expect(http.get).toHaveBeenCalledWith(
      "/products?limit=12&skip=12&sortBy=title&order=asc"
    );
    expect(page.total).toBe(40);
    expect(page.products[0].title).toBe("Lamp");
  });

  it("fetches a single product", async () => {
    http.get.mockResolvedValue({
      data: { id: 3, title: "Watch", price: 50, thumbnail: "/w.jpg" },
    });
    const product = await fetchProductById(3);
    expect(http.get).toHaveBeenCalledWith("/products/3");
    expect(product.title).toBe("Watch");
  });

  it("fetches category names", async () => {
    http.get.mockResolvedValue({ data: ["beauty", "laptops"] });
    await expect(fetchCategories()).resolves.toEqual(["beauty", "laptops"]);
  });
});
