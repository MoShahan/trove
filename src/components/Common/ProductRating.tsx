import React from "react";

import { Star } from "@mui/icons-material";
import { Box } from "@mui/material";

import { EachProduct } from "@/utils/type";

type ProductRatingProps = {
  compact?: boolean;
  rating?: EachProduct["rating"] | null;
  showCount?: boolean;
  size?: "small" | "medium";
};

const STAR_COUNT = 5;
const STAR_YELLOW = "#FFC107";
const STAR_EMPTY = "#E0E0E0";

export const getStarFills = (rate: number, starCount = STAR_COUNT): number[] =>
  Array.from({ length: starCount }, (_, index) => {
    const fill = Math.min(1, Math.max(0, rate - index));
    return Number((fill * 100).toFixed(2));
  });

const ProductRating = ({
  compact = false,
  rating,
  showCount = true,
  size = "small",
}: ProductRatingProps) => {
  const rawValue = Number(rating?.rate);
  const value = Number(rawValue.toFixed(1));

  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  const starSize = compact || size === "small" ? 18 : 24;
  const fills = getStarFills(value);
  const count = Number(rating?.count);
  const shouldShowCount = showCount && Number.isFinite(count) && count > 0;

  return (
    <Box
      data-testid="product-rating"
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        height: starSize,
        gap: "6px",
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          height: starSize,
          gap: "1px",
        }}
      >
        {fills.map((fill, index) => (
          <Box
            key={index}
            data-testid="rating-star"
            data-fill={fill}
            sx={{
              position: "relative",
              width: starSize,
              height: starSize,
              flexShrink: 0,
              lineHeight: 0,
            }}
          >
            <Star
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: starSize,
                height: starSize,
                fontSize: starSize,
                color: STAR_EMPTY,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${fill}%`,
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Star
                sx={{
                  width: starSize,
                  height: starSize,
                  fontSize: starSize,
                  color: STAR_YELLOW,
                  display: "block",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
      {shouldShowCount && (
        <Box
          component="span"
          sx={{
            color: "text.secondary",
            fontSize: starSize === 18 ? 12 : 14,
            fontWeight: 400,
            lineHeight: 1,
            height: starSize,
            display: "flex",
            alignItems: "center",
            textBox: "trim-both cap alphabetic",
          }}
        >
          ({count})
        </Box>
      )}
    </Box>
  );
};

export default ProductRating;
