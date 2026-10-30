import { Box, Button, Divider, Typography } from "@mui/material";

import { formatPrice } from "@/utils/price";
import { OrderSummaryProps } from "@/utils/type";

import { BorderedContainer } from "./style";

const OrderSummary = ({
  totalAmount,
  handleCheckout,
  handleClearCart,
}: OrderSummaryProps) => {
  return (
    <Box
      sx={{
        ...BorderedContainer,
        flex: 1,
        alignSelf: "flex-start",
      }}
    >
      <Typography variant="h2" sx={{ mb: 4 }}>
        Order Summary
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
          mb: 2,
        }}
      >
        <Typography fontWeight={500} variant="h3" color="textSecondary">
          Subtotal
        </Typography>
        <Typography variant="h3">{formatPrice(totalAmount)}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
          mb: 2,
        }}
      >
        <Typography variant="h3" fontWeight={500} color="textSecondary">
          Shipping
        </Typography>
        <Typography variant="h3">{formatPrice(15)}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
          mb: 2,
        }}
      >
        <Typography variant="h3" fontWeight={500} color="textSecondary">
          Tax
        </Typography>
        <Typography variant="h3">{formatPrice(5)}</Typography>
      </Box>
      <Divider
        sx={{
          my: 4,
          border: "none",
          height: "1px",
          backgroundImage:
            "repeating-linear-gradient(to right, lightgray, lightgray 10px, transparent 10px, transparent 20px)",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Typography variant="h3">Total</Typography>
        <Typography variant="h2">
          {formatPrice(totalAmount + 15 + 5)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 4 }}>
        <Button variant="outlined" onClick={() => handleClearCart(false)}>
          Clear Cart
        </Button>
        <Button variant="contained" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;
