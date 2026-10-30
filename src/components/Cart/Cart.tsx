"use client";
import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

import CheckoutFormComponent from "@/components/Cart/CheckoutForm";
import ProductItem from "@/components/Cart/ProductItem";
import { STORAGE_KEYS } from "@/utils/constant";
import { getSalePrice } from "@/utils/price";
import { toastMessage } from "@/utils/toast";
import { CartProduct, CartType } from "@/utils/type";

import OrderSummary from "./OrderSummary";
import { BorderedContainer, CartDetailsWrapper } from "./style";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartType>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    const cart: Record<string, CartProduct> = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.cart) || "{}"
    );
    setCartItems(Object.values(cart));
    const amount = Object.values(cart).reduce(
      (acc: number, curr: CartProduct) => {
        return (
          acc +
          (curr?.quantity || 1) * getSalePrice(curr?.price, curr?.discount)
        );
      },
      0
    );
    setTotalAmount(amount);
  };

  const handleClearCart = (fromCheckout: boolean) => {
    localStorage.setItem(STORAGE_KEYS.cart, "{}");
    setCartItems([]);
    setTotalAmount(0);
    if (!fromCheckout) {
      toastMessage("success", "Cart Cleared");
    }
  };

  const handleCheckout = () => {
    handleOpen();
  };

  const handleQuantityChange = (
    id: number,
    action: "increase" | "decrease"
  ) => {
    const cart: Record<string, CartProduct> = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.cart) || "{}"
    );
    if (action === "decrease" && cart[id].quantity > 1) {
      cart[id].quantity -= 1;
    } else if (action === "increase") {
      cart[id].quantity += 1;
    }
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    fetchCart();
  };

  const handleDelete = (id: number) => {
    const cart: Record<string, CartProduct> = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.cart) || "{}"
    );
    delete cart[id];
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    fetchCart();
  };

  return (
    <>
      {cartItems?.length ? (
        <Box sx={CartDetailsWrapper}>
          <Box
            sx={{
              ...BorderedContainer,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              flex: 1.5,
            }}
          >
            {cartItems.map((item: CartProduct) => (
              <ProductItem
                key={item?.id}
                handleDelete={handleDelete}
                handleQuantityChange={handleQuantityChange}
                product={item}
              />
            ))}
          </Box>
          <OrderSummary
            totalAmount={totalAmount}
            handleCheckout={handleCheckout}
            handleClearCart={handleClearCart}
          />
        </Box>
      ) : (
        <Typography variant="body1" color="textDisabled">
          No Items in Cart
        </Typography>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <CheckoutFormComponent
            handleClearCart={handleClearCart}
            handleClose={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
