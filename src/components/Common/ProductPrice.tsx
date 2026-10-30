import React from "react";

import { Box, Typography } from "@mui/material";

import {
  formatDiscountLabel,
  formatPrice,
  getDiscountPercent,
  getSalePrice,
} from "@/utils/price";

type ProductPriceProps = {
  discount?: number | null;
  price?: number | string | null;
  saleVariant?: "h1" | "h2" | "h3";
};

const ProductPrice = ({
  discount,
  price,
  saleVariant = "h3",
}: ProductPriceProps) => {
  const percent = getDiscountPercent(discount);
  const salePrice = getSalePrice(price, discount);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        gap: 1,
        flexWrap: "wrap",
        mt: saleVariant === "h3" ? "auto" : 0,
      }}
    >
      <Typography variant={saleVariant}>{formatPrice(salePrice)}</Typography>
      {percent > 0 && (
        <>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ textDecoration: "line-through" }}
          >
            {formatPrice(price)}
          </Typography>
          <Typography variant="subtitle2" color="error.main" fontWeight={600}>
            {formatDiscountLabel(percent)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ProductPrice;
