"use client";

import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import {
  ProductsCard,
  ProductsCardSkeleton,
} from "@/components/Common/Products";
import { STORAGE_KEYS } from "@/utils/constant";
import { fetchProducts } from "@/utils/products";
import { EachProduct } from "@/utils/type";

import { ProductsWrapper } from "../Common/common.style";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [favProducts, setFavProducts] = useState<Array<EachProduct>>([]);

  const handleWishlist = (id: number) => {
    const filteredProducts = favProducts.filter((item) => item?.id != id);

    setFavProducts(filteredProducts);
    localStorage.setItem(
      STORAGE_KEYS.wishlist,
      JSON.stringify(filteredProducts.map((item) => item?.id))
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        const wishlistIds = JSON.parse(
          localStorage?.getItem(STORAGE_KEYS.wishlist) || "[]"
        );
        const formattedData = products.filter((product) =>
          wishlistIds.includes(product?.id)
        );

        setFavProducts(formattedData);
        setLoading(false);
      } catch (err) {
        console.log(err as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);

  return (
    <Box sx={ProductsWrapper}>
      {loading ? (
        <>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <ProductsCardSkeleton key={index} />
            ))}
        </>
      ) : (
        <>
          {favProducts?.length ? (
            favProducts.map((item: EachProduct) => (
              <ProductsCard
                key={item?.id}
                product={item}
                handleWishlist={handleWishlist}
                isWishlisted={true}
              />
            ))
          ) : (
            <Typography variant="body1" color="textDisabled">
              No Items in Wishlist
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Products;
