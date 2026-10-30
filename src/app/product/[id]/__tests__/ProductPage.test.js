import { render, screen } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import ProductPage from "../page";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "1" }),
}));

jest.mock("@/utils/products", () => ({
  fetchProductById: jest.fn(() => new Promise(() => {})),
}));

describe("ProductPage", () => {
  const theme = createTheme();

  it("should render", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductPage />
      </ThemeProvider>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
  });
});
