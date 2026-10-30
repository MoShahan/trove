import http from "@/utils/http";
import { EachProduct } from "@/utils/type";

type DummyProduct = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  sku?: string;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  image?: string;
  reviews?: Array<{ rating?: number }>;
};

export const normalizeProduct = (product: DummyProduct): EachProduct => {
  const image = product.thumbnail || product.images?.[0] || product.image || "";
  const isPopular = (product.rating ?? 0) >= 4.5;

  return {
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    image,
    imageUrl: image,
    brand: product.brand || product.category,
    model: product.sku || product.brand || "Standard",
    color: product.tags?.[0],
    discount: product.discountPercentage,
    isPopular,
    popular: isPopular,
    rating: {
      rate: product.rating ?? 0,
      count: product.reviews?.length ?? 0,
    },
  };
};

export const PRODUCT_PAGE_SIZE = 12;

type ProductListQuery = {
  category?: string;
  limit?: number;
  order?: "asc" | "desc";
  skip?: number;
  sortBy?: string;
};

export const fetchProductsPage = async ({
  category = "all",
  limit = PRODUCT_PAGE_SIZE,
  order,
  skip = 0,
  sortBy,
}: ProductListQuery = {}) => {
  const params = [`limit=${limit}`, `skip=${skip}`];

  if (sortBy) {
    params.push(`sortBy=${encodeURIComponent(sortBy)}`);
    params.push(`order=${order === "desc" ? "desc" : "asc"}`);
  }

  const query = params.join("&");
  const url =
    category && category !== "all"
      ? `/products/category/${encodeURIComponent(category)}?${query}`
      : `/products?${query}`;
  const res = await http.get(url);
  const products = ((res.data?.products as DummyProduct[]) ?? []).map(
    normalizeProduct
  );

  return {
    products,
    total:
      typeof res.data?.total === "number" ? res.data.total : products.length,
  };
};

export const fetchProducts = async (category = "all") => {
  const { products } = await fetchProductsPage({
    category,
    limit: 100,
    skip: 0,
  });

  return products;
};

export const fetchProductById = async (id: string | number) => {
  const res = await http.get(`/products/${id}`);
  return normalizeProduct(res.data as DummyProduct);
};

export const fetchCategories = async () => {
  const res = await http.get("/products/category-list");
  return (res.data as string[]) ?? [];
};
