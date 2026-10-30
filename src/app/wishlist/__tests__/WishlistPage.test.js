import { render, screen, waitFor } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { fetchProducts } from "@/utils/products";

import WishlistPage from "../page";

jest.mock("@/utils/products", () => ({
  fetchProducts: jest.fn(),
}));

describe("WishlistPage", () => {
  const theme = createTheme();

  beforeEach(() => {
    fetchProducts.mockResolvedValue([]);
  });

  it("should render", async () => {
    render(
      <ThemeProvider theme={theme}>
        <WishlistPage />
      </ThemeProvider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("My Wishlist")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("No Items in Wishlist")).toBeInTheDocument();
    });
  });
});
