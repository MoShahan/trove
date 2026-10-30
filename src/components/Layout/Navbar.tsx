"use client";
import React, { useEffect, useState } from "react";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { PersonOutline } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { removeSession } from "@/actions/auth-action";
import { firebaseAuth } from "@/lib/firebase/firebase";
import { BRAND_NAME, NAVLINKS, STORAGE_KEYS } from "@/utils/constant";
import { toastMessage } from "@/utils/toast";
import { NavlinksType } from "@/utils/type";

import { LinkStyle } from "../Common/common.style";

import { NavbarContainer, NavlinksContainer } from "./style";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuLoader, setMenuLoader] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setIsLoggedIn(!!localStorage?.getItem(STORAGE_KEYS.token));
  }, [pathname]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    try {
      setMenuLoader(true);
      await signOut(firebaseAuth);
      const res = await removeSession();
      if (res) {
        toastMessage("success", "Logged out successfully");
        handleMenuClose();
        router.push("/");
        localStorage.clear();
        setIsLoggedIn(false);
      }
    } catch (err) {
      toastMessage(
        "error",
        err instanceof Error ? err.message : "Failed to log out"
      );
    } finally {
      setMenuLoader(false);
    }
  };

  return (
    <Box sx={NavbarContainer}>
      <Box>
        <Link href={"/"} style={LinkStyle}>
          <Typography
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: "3rem",
              },
            }}
            fontWeight="800"
          >
            {BRAND_NAME}
          </Typography>
        </Link>
      </Box>

      {isLoggedIn && (
        <Box sx={NavlinksContainer}>
          {NAVLINKS.map((link: NavlinksType) => {
            const Icon = pathname === link.path ? link.activeIcon : link.icon;

            return (
              <Link key={link.path} href={link.path} style={LinkStyle}>
                <IconButton
                  sx={{
                    color: pathname === link.path ? "primary.main" : "inherit",
                    backgroundColor:
                      pathname === link.path
                        ? "rgba(0, 0, 0, 0.1)"
                        : "transparent",
                    transition: "background 0.3s ease-in-out",
                  }}
                >
                  {<Icon fontSize="medium" />}
                </IconButton>
              </Link>
            );
          })}
          <IconButton sx={{ color: "inherit" }} onClick={handleMenuClick}>
            <PersonOutline fontSize="medium" />
          </IconButton>
        </Box>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        TransitionProps={{
          exit: false,
        }}
      >
        <MenuItem
          disabled={menuLoader}
          onClick={() => {
            logoutUser();
          }}
        >
          <ListItemText>Logout</ListItemText>
          {menuLoader && (
            <ListItemIcon>
              <CircularProgress size={18} sx={{ ml: 1 }} />
            </ListItemIcon>
          )}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
