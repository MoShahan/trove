"use client";

import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { createSession } from "@/actions/auth-action";
import { firebaseAuth } from "@/lib/firebase/firebase";
import { getErrorMessage } from "@/utils/auth";
import { STORAGE_KEYS } from "@/utils/constant";
import { toastMessage } from "@/utils/toast";

import { LinkStyle } from "../Common/common.style";

import { AuthBox, AuthContainer } from "./style";

const PasswordField = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      fullWidth
      label={label}
      type={visible ? "text" : "password"}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      margin="normal"
      error={error}
      helperText={helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={visible ? "Hide password" : "Show password"}
                data-testid={`${name}-visibility-toggle`}
                onClick={() => setVisible((prev) => !prev)}
                onMouseDown={(event) => event.preventDefault()}
                edge="end"
                type="button"
              >
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

const AuthPage = ({ type }: { type: "login" | "signup" }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const completeLogin = async (token: string, message: string) => {
    const isAuthenticated = await createSession(token);
    if (isAuthenticated) {
      localStorage.setItem(STORAGE_KEYS.token, token);
      router.push("/");
      toastMessage("success", message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (type === "signup") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    if (!Object.values(newErrors).some((err) => err)) {
      try {
        setLoading(true);

        if (type === "login") {
          const res = await signInWithEmailAndPassword(
            firebaseAuth,
            formData.email,
            formData.password
          );
          if (res.user) {
            const token = await res.user.getIdToken();
            await completeLogin(token, "Logged in successfully");
          }
        } else {
          const res = await createUserWithEmailAndPassword(
            firebaseAuth,
            formData.email,
            formData.password
          );
          if (res.user) {
            const token = await res.user.getIdToken();
            await completeLogin(token, "Account created successfully");
          }
        }
      } catch (err) {
        toastMessage("error", getErrorMessage(err, "Authentication failed"));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={AuthContainer}>
      <Box sx={AuthBox}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {type === "login" ? "Welcome Back!" : "Create an Account"}
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
          data-testid="auth-form"
        >
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <PasswordField
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          {type === "signup" && (
            <PasswordField
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          )}
          <Box sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              endIcon={loading && <CircularProgress size={16} />}
            >
              {type === "login" ? "Login" : "Sign Up"}
            </Button>
          </Box>
        </form>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={type === "login" ? "/sign-up" : "/login"}
            style={LinkStyle}
          >
            {type === "login" ? "Sign Up" : "Login"}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthPage;
