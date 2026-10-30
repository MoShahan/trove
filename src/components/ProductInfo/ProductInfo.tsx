import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { Add, Remove } from "@mui/icons-material";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";

import { STORAGE_KEYS } from "@/utils/constant";
import { fetchProductById } from "@/utils/products";
import { toastMessage } from "@/utils/toast";
import { EachProduct } from "@/utils/type";

import { FireGlowChip } from "../Common/CustomChip";
import ImageWithFallback from "../Common/ImageWithFallback";
import ProductPrice from "../Common/ProductPrice";
import ProductRating from "../Common/ProductRating";
import { DiscountBadge, WishlistButton } from "../Common/Products";

import InfoLoader from "./InfoLoader";
import { ButtonContainer, DetailsContainer, ImageCard } from "./style";

const ProductInfo = ({ setRoutes }) => {
  const { id } = useParams();

  const [productDetails, setProductDetails] = useState<EachProduct | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const product = await fetchProductById(String(id));
        setProductDetails(product);
        setIsWishlisted(
          JSON.parse(
            localStorage?.getItem(STORAGE_KEYS.wishlist) || "[]"
          ).includes(product?.id)
        );
        setRoutes([
          { label: "Home", path: "/" },
          { label: "Product", path: `/#products` },
          {
            label: product?.category,
            path: `/#products`,
            isActive: true,
            loading: false,
          },
        ]);

        setLoading(false);
      } catch (err) {
        toastMessage(
          "error",
          err instanceof Error ? err.message : "Failed to load product"
        );
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading, id, setRoutes]);

  const handleAdd = () => {
    const cartData = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.cart) || "{}"
    );
    if (cartData[productDetails?.id]) {
      cartData[productDetails?.id].quantity =
        (cartData[productDetails?.id]?.quantity || 0) + count;
    } else {
      cartData[productDetails?.id] = { ...productDetails, quantity: count };
    }
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cartData));
    toastMessage("success", "Added to Cart");
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const wishlist = JSON.parse(
      localStorage?.getItem(STORAGE_KEYS.wishlist) || "[]"
    );

    if (wishlist.includes(id)) {
      localStorage.setItem(
        STORAGE_KEYS.wishlist,
        JSON.stringify(wishlist.filter((idx: number) => idx != id))
      );
      setIsWishlisted(false);
    } else {
      localStorage.setItem(
        STORAGE_KEYS.wishlist,
        JSON.stringify([...wishlist, id])
      );
      setIsWishlisted(true);
    }
  };

  return loading ? (
    <InfoLoader />
  ) : (
    <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      <Box sx={ImageCard}>
        <ImageWithFallback
          imageUrl={productDetails?.image}
          alt={productDetails?.category || "Product"}
          width={400}
          height={400}
        />
        <DiscountBadge discount={productDetails?.discount} />
        <WishlistButton
          id={productDetails?.id}
          toggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />
      </Box>
      <Box sx={DetailsContainer}>
        <Typography variant="h1" sx={{ mb: 1 }}>
          {productDetails?.title}
        </Typography>

        <Box sx={{ display: "flex", mb: 2, gap: 1, flexWrap: "wrap" }}>
          <Chip
            label={productDetails?.category}
            sx={{ textTransform: "capitalize", fontSize: "1rem" }}
          />
          {productDetails?.popular && <FireGlowChip label="Popular" />}
        </Box>

        <ProductRating
          rating={productDetails?.rating}
          showCount
          size="medium"
        />

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h5"
          color="textSecondary"
          sx={{ mb: 2, wordSpacing: "0.2rem" }}
        >
          {productDetails?.description}
        </Typography>

        <Box sx={{ my: 2 }}>
          <ProductPrice
            price={productDetails?.price}
            discount={productDetails?.discount}
            saleVariant="h1"
          />
        </Box>

        <Typography variant="h5">Brand</Typography>
        <Divider sx={{ width: "15ch", mt: 0.5, mb: 1 }} />
        <Typography
          variant="subtitle1"
          sx={{ textTransform: "capitalize", mb: 2 }}
        >
          {productDetails?.brand}
        </Typography>

        <Typography variant="h5">Model</Typography>
        <Divider sx={{ width: "15ch", mt: 0.5, mb: 1.5 }} />
        <Chip
          label={productDetails?.model}
          variant="outlined"
          sx={{ color: "textSecondary" }}
        />

        <Box sx={ButtonContainer}>
          <Button
            onClick={handleDecrement}
            disabled={count === 1}
            variant="contained"
          >
            <Remove fontSize="small" />
          </Button>

          <Typography variant="h3">{count}</Typography>
          <Button onClick={handleIncrement} variant="contained">
            <Add fontSize="small" />
          </Button>
        </Box>
        <Button variant="contained" onClick={handleAdd}>
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfo;
