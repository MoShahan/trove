import { render } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import ProductItem from "@/components/Cart/ProductItem";
const handleQuantityChange = jest.fn();
const handleDelete = jest.fn();

const theme = createTheme();

const product = {
  id: 1,
  title: "Sample Product",
  color: "Red",
  price: 99.99,
  quantity: 2,
  image: "/path/to/image.jpg",
  category: "Clothing",
};

describe("ProductItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductItem
          product={product}
          handleQuantityChange={handleQuantityChange}
          handleDelete={handleDelete}
        />
      </ThemeProvider>
    );
  });
});
