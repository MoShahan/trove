import { render, screen } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import BreadcrumbsBar from "@/components/Common/BreadcrumbsBar";

const theme = createTheme();

const routes = [
  { label: "home", path: "/" },
  { label: "products", path: "/products" },
  { label: "product details", path: "/products/1", isActive: true },
];

describe("BreadcrumbsBar Component", () => {
  it("should render breadcrumbs correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <BreadcrumbsBar routes={routes} />
      </ThemeProvider>
    );

    routes.forEach((route) => {
      expect(screen.getByText(route.label)).toBeInTheDocument();
    });

    routes.forEach((route) => {
      const link = screen.getByText(route.label).closest("a");
      expect(link).toHaveAttribute("href", route.path);
    });
  });

  it("should render skeleton loader when route is loading", () => {
    const loadingRoutes = [
      { label: "home", path: "/", loading: true },
      { label: "products", path: "/products", loading: true },
      { label: "product details", path: "/products/1", isActive: true },
    ];

    render(
      <ThemeProvider theme={theme}>
        <BreadcrumbsBar routes={loadingRoutes} />
      </ThemeProvider>
    );

    expect(document.querySelectorAll(".MuiSkeleton-root")).toHaveLength(2);
  });
});
