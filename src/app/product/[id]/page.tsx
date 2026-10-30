"use client";
import { useState } from "react";

import { Box } from "@mui/material";

import BreadcrumbsBar from "@/components/Common/BreadcrumbsBar";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import { RouteType } from "@/utils/type";

const ProductPage = () => {
  const [routes, setRoutes] = useState<Array<RouteType>>([
    { label: "Home", path: "/" },
    { label: "Product", path: `/#products` },
    {
      label: "",
      path: `/#products`,
      isActive: true,
      loading: true,
    },
  ]);

  return (
    <Box component="main" sx={{ px: "32px" }}>
      <BreadcrumbsBar routes={routes} />
      <ProductInfo setRoutes={setRoutes} />
    </Box>
  );
};

export default ProductPage;
