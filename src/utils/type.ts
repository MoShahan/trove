import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type NavlinksType = {
  path: string;
  label: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  activeIcon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
};

export type EachProduct = {
  id?: number;
  title: string;
  price: number;
  category?: string;
  description?: string;
  image?: string;
  rating?: { rate: number; count: number };
  brand?: string;
  model?: string;
  color?: string;
  discount?: number;
  popular?: boolean;
  isPopular?: boolean;
  imageUrl?: string;
};

export type ProductsResponse = {
  data: {
    status: string;
    message: string;
    products: EachProduct[];
  };
};

export type SingleProductResponse = {
  data: EachProduct;
};

export type CategoriesResponse = {
  data: string[];
};

export type CartProduct = EachProduct & { quantity: number };

export type CartType = Array<CartProduct>;

export type EachProductComponentProps = {
  product: EachProduct;
  handleProductClick: (id: number) => void;
};

export type EachCartProductComponentProps = {
  product: CartProduct;
  handleQuantityChange: (id: number, option: "increase" | "decrease") => void;
  handleDelete: (id: number) => void;
  handleProductClick: (id: number) => void;
};

export type QuantityComponentProps = {
  quantity: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
};

export type FormDataType = {
  fullName: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  mobileNumber: string;
  paymentMethod: string;
};

export type CheckoutFormProps = {
  handleClearCart: (val: boolean) => void;
  handleClose: () => void;
};

export type SortConfigType = { key: string | null; direction: "asc" | "desc" };

export type OrderSummaryProps = {
  totalAmount: number;
  handleCheckout: () => void;
  handleClearCart: (fromCheckout: boolean) => void;
};

export type ProductItemProps = {
  product: CartProduct;
  handleQuantityChange: (id: number, action: "increase" | "decrease") => void;
  handleDelete: (id: number) => void;
};

export type ProductsCardProps = {
  product;
  handleWishlist: (id: number) => void;
  isWishlisted: boolean;
};

export type WishlistButtonProps = {
  id: number;
  toggleWishlist: (e: React.MouseEvent, id: number) => void;
  isWishlisted: boolean;
};

export type RouteType = {
  label: string;
  path: string;
  isActive?: boolean;
  loading?: boolean;
};
