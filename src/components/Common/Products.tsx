import React, { useState } from "react";

import Link from "next/link";

import { LocalFireDepartmentRounded, Favorite } from "@mui/icons-material";
import { Box, Skeleton, Typography } from "@mui/material";

import { formatDiscountLabel } from "@/utils/price";
import { ProductsCardProps, WishlistButtonProps } from "@/utils/type";

import { LinkStyle, TruncatedText } from "./common.style";
import ImageWithFallback from "./ImageWithFallback";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import {
  ProductsCardContainer,
  CardImageContainer,
  WishlistButtonStyle,
  PopularTagContainer,
  DiscountTagContainer,
  BottomOverlay,
} from "./style";

export const ProductsCard = ({
  product,
  handleWishlist,
  isWishlisted,
}: ProductsCardProps) => {
  const [hover, setHover] = useState(false);

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    handleWishlist(id);
  };

  return (
    <Link href={`/product/${product?.id}`} passHref style={LinkStyle}>
      <Box
        sx={ProductsCardContainer}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box sx={CardImageContainer}>
          <WishlistButton
            id={product?.id}
            toggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
          />

          <DiscountBadge discount={product?.discount} />

          {product?.isPopular && (
            <Box sx={PopularTagContainer}>
              <LocalFireDepartmentRounded
                fontSize="medium"
                sx={{
                  color: "#fff",
                  filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.8))",
                }}
              />
            </Box>
          )}

          <ImageWithFallback
            alt={product?.brand || "Product"}
            width={180}
            height={180}
            imageUrl={product?.imageUrl}
          />

          <Box sx={{ ...BottomOverlay, height: hover ? "40%" : "0%" }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#fff",
                opacity: hover ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              View Details
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="subtitle2"
          fontWeight={500}
          color="textSecondary"
          sx={TruncatedText}
        >
          {product?.title}
        </Typography>

        <ProductRating rating={product?.rating} compact />
        <ProductPrice price={product?.price} discount={product?.discount} />
      </Box>
    </Link>
  );
};

export const ProductsCardSkeleton = () => {
  return (
    <Box>
      <Skeleton
        variant="rounded"
        height={180}
        sx={{ borderRadius: "20px", mb: 1 }}
      />
      <Skeleton />
      <Skeleton width="30%" />
    </Box>
  );
};

export const DiscountBadge = ({ discount }: { discount?: number | null }) => {
  const label = formatDiscountLabel(discount);

  if (!label) {
    return null;
  }

  return (
    <Box sx={DiscountTagContainer} data-testid="discount-badge">
      {label}
    </Box>
  );
};

export const WishlistButton = ({
  id,
  toggleWishlist,
  isWishlisted,
}: WishlistButtonProps) => {
  return (
    <Box
      data-testid="wishlist-button"
      onClick={(e) => toggleWishlist(e, id)}
      sx={{
        ...WishlistButtonStyle,
        boxShadow: isWishlisted
          ? "0px 0px 10px rgba(255, 140, 0, 0.8)"
          : "0px 0px 8px rgba(255, 255, 255, 0.3)",
      }}
    >
      <Favorite
        fontSize="small"
        sx={{
          color: isWishlisted ? "#FF8C00" : "#fff",
          transition: "color 0.3s ease-in-out",
        }}
      />
    </Box>
  );
};
