import React, { useState } from "react";

import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
} from "@mui/material";

import { toastMessage } from "@/utils/toast";
import { CheckoutFormProps, FormDataType } from "@/utils/type";

const CheckoutFormComponent = ({
  handleClearCart,
  handleClose,
}: CheckoutFormProps) => {
  const [formData, setFormData] = useState<FormDataType>({
    address: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    mobileNumber: "",
    paymentMethod: "",
    fullName: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    if (
      (name === "mobileNumber" || name === "pinCode") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClearCart(true);
    handleClose();
    toastMessage("success", "Checkout Completed");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Payment Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="fullName"
          fullWidth
          value={formData.fullName}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          fullWidth
          value={formData.address}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Pin Code"
          name="pinCode"
          type="text"
          fullWidth
          value={formData.pinCode}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          fullWidth
          value={formData.city}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="State"
          name="state"
          fullWidth
          value={formData.state}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Country"
          name="country"
          fullWidth
          value={formData.country}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Mobile Number"
          name="mobileNumber"
          type="tel"
          fullWidth
          value={formData.mobileNumber}
          onChange={handleChange}
          required
          margin="normal"
        />
        <FormControl fullWidth required margin="normal" sx={{ mb: 4 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            label="Payment Method"
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="upi">UPI</MenuItem>
            <MenuItem value="card">Card</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          data-testid="submit-btn"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutFormComponent;
