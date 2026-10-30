import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import { NavlinksType } from "./type";

export const NAVLINKS: NavlinksType[] = [
  {
    path: "/wishlist",
    label: "Wishlist",
    icon: FavoriteBorder,
    activeIcon: Favorite,
  },
  {
    path: "/cart",
    label: "Cart",
    icon: ShoppingCartOutlined,
    activeIcon: ShoppingCart,
  },
];

export const BRAND_NAME = "TROVE";
export const BRAND_LABEL = "Trove";

export const STORAGE_KEYS = {
  cart: "trove-cart",
  token: "trove-token",
  wishlist: "trove-wishlist",
} as const;

export const FALLBACK_IMAGE = "/placeholder-3.png";

export const ROOT_ROUTE = "/";
export const HOME_ROUTE = "/";

export const SESSION_COOKIE_NAME = "user_session";
