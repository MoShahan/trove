import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { fetchProducts } from "@/utils/products";

import AdminPage from "../page";

jest.mock("@/utils/products", () => ({
  fetchProducts: jest.fn(),
}));

describe("Admin Page Tests", () => {
  beforeEach(() => {
    fetchProducts.mockResolvedValue([]);
  });

  test("API resolved", async () => {
    fetchProducts.mockResolvedValue([]);
    render(<AdminPage />);
    expect(await screen.findByText("Admin Page")).toBeInTheDocument();
  });

  test("API rejected", async () => {
    fetchProducts.mockRejectedValue(new Error("failed"));
    render(<AdminPage />);
    expect(await screen.findByText("Admin Page")).toBeInTheDocument();
  });

  describe("Sorting Tests", () => {
    test("sorts products by id when clicking on the id header", () => {
      render(<AdminPage />);
      const idHeader = screen.getByTestId("id-header");
      fireEvent.click(idHeader); // for ascending
      fireEvent.click(idHeader); // for descending
    });

    test("sorts products by title when clicking on the title header", () => {
      render(<AdminPage />);
      const titleHeader = screen.getByTestId("title-header");
      fireEvent.click(titleHeader); // for ascending
      fireEvent.click(titleHeader); // for descending
    });

    test("sorts products by price when clicking on the price header", () => {
      render(<AdminPage />);
      const priceHeader = screen.getByTestId("price-header");
      fireEvent.click(priceHeader); // for ascending
      fireEvent.click(priceHeader); // for descending
    });

    test("sorts products by description when clicking on the description header", () => {
      render(<AdminPage />);
      const descriptionHeader = screen.getByTestId("description-header");
      fireEvent.click(descriptionHeader); // for ascending
      fireEvent.click(descriptionHeader); // for descending
    });

    test("sorts products by category when clicking on the category header", () => {
      render(<AdminPage />);
      const categoryHeader = screen.getByTestId("category-header");
      fireEvent.click(categoryHeader); // for ascending
      fireEvent.click(categoryHeader); // for descending
    });
  });

  describe("Modal Tests", () => {
    test("opens modal to add a new product when clicking 'Add Product' button", () => {
      render(<AdminPage />);
      const addProductButton = screen.getByTestId("add-product-button");
      fireEvent.click(addProductButton);
      const modalSubmitButton = screen.getByTestId("modal-submit-btn");
      fireEvent.click(modalSubmitButton);
    });

    test("opens modal with pre-filled product data when 'Edit' is clicked", async () => {
      fetchProducts.mockResolvedValueOnce([
        { id: 1, title: "Product 1", price: 10 },
      ]);
      render(<AdminPage />);
      await waitFor(() => screen.getAllByTestId("menu-button"));
      const menuBtn = screen.getAllByTestId("menu-button");
      fireEvent.click(menuBtn[0]);
      const editMenuItem = screen.getAllByTestId("edit-option");
      fireEvent.click(editMenuItem[0]);
      const modalSubmitButton = screen.getByTestId("modal-submit-btn");
      fireEvent.click(modalSubmitButton);
    });

    describe("Input Tests", () => {
      test("changes value for modal-title", () => {
        render(<AdminPage />);
        const addProductButton = screen.getByTestId("add-product-button");
        fireEvent.click(addProductButton);
        const titleField = screen.getByLabelText(/title/i);
        fireEvent.change(titleField, { target: { value: "Product 1" } });
        expect(titleField.value).toBe("Product 1");
      });

      test("changes value for modal-price", () => {
        render(<AdminPage />);
        const addProductButton = screen.getByTestId("add-product-button");
        fireEvent.click(addProductButton);
        const priceField = screen.getByLabelText(/price/i);
        fireEvent.change(priceField, { target: { value: "100" } });
        expect(priceField.value).toBe("100");
      });

      test("changes value for modal-description", () => {
        render(<AdminPage />);
        const addProductButton = screen.getByTestId("add-product-button");
        fireEvent.click(addProductButton);
        const descriptionField = screen.getByLabelText(/description/i);
        fireEvent.change(descriptionField, {
          target: { value: "This is a great product." },
        });
        expect(descriptionField.value).toBe("This is a great product.");
      });

      test("changes value for modal-image", () => {
        render(<AdminPage />);
        const addProductButton = screen.getByTestId("add-product-button");
        fireEvent.click(addProductButton);
        const imageField = screen.getByLabelText(/image url/i);
        fireEvent.change(imageField, {
          target: { value: "https://example.com/image.jpg" },
        });
        expect(imageField.value).toBe("https://example.com/image.jpg");
      });

      test("changes value for modal-category", () => {
        render(<AdminPage />);
        const addProductButton = screen.getByTestId("add-product-button");
        fireEvent.click(addProductButton);
        const categoryField = screen.getByLabelText(/category/i);
        fireEvent.change(categoryField, {
          target: { value: "mobile" },
        });
        expect(categoryField.value).toBe("mobile");
      });
    });
  });

  test("removes product when 'Remove' is clicked", async () => {
    fetchProducts.mockResolvedValueOnce([
      { id: 1, title: "Product 1", price: 10 },
    ]);
    render(<AdminPage />);
    await waitFor(() => screen.getAllByTestId("menu-button"));
    const menuBtn = screen.getAllByTestId("menu-button");
    fireEvent.click(menuBtn[0]);
    const removeMenuItem = screen.getAllByTestId("remove-option");
    fireEvent.click(removeMenuItem[0]);
  });
});
