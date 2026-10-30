import React from "react";

import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import { QuantityComponentProps } from "@/utils/type";

const QuantityComponent = ({
  quantity,
  handleIncrease,
  handleDecrease,
}: QuantityComponentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "secondary.main",
        width: "fit-content",
        gap: {
          xs: "6px",
          md: "12px",
        },
        padding: {
          xs: "6px 8px",
          md: "6px 10px",
        },
        borderRadius: "20px",
      }}
    >
      <IconButton
        disabled={quantity === 1}
        sx={{ p: 0 }}
        onClick={handleDecrease}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography variant="subtitle1">{quantity}</Typography>
      <IconButton sx={{ p: 0 }} onClick={handleIncrease}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

export default QuantityComponent;
