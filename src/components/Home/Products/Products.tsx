"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box } from "@mui/material";

import { ProductsWrapper } from "@/components/Common/common.style";
import { STORAGE_KEYS } from "@/utils/constant";
import { fetchProductsPage, PRODUCT_PAGE_SIZE } from "@/utils/products";
import { toastMessage } from "@/utils/toast";
import { EachProduct } from "@/utils/type";

import { ProductsCard, ProductsCardSkeleton } from "../../Common/Products";

import CategoryMenu from "./CategoryMenu";
import Header from "./Header";

const Products = () => {
  const [productsList, setProductsList] = useState<EachProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [wishlist, setWishlist] = useState<Array<number>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchWord, setSearchWord] = useState<string>("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("title");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const requestIdRef = useRef(0);
  const skipRef = useRef(0);
  const hasMoreRef = useRef(true);
  const loadingMoreRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadPage = useCallback(
    async (reset: boolean) => {
      if (!reset && (loadingMoreRef.current || !hasMoreRef.current)) {
        return;
      }

      const requestId = ++requestIdRef.current;
      const skip = reset ? 0 : skipRef.current;

      if (reset) {
        setLoading(true);
        setHasMore(true);
        hasMoreRef.current = true;
        skipRef.current = 0;
      } else {
        loadingMoreRef.current = true;
        setLoadingMore(true);
      }

      try {
        const { products, total } = await fetchProductsPage({
          category: selectedCategory,
          limit: PRODUCT_PAGE_SIZE,
          order: isAscending ? "asc" : "desc",
          skip,
          sortBy,
        });

        if (requestId !== requestIdRef.current) {
          return;
        }

        const nextSkip = skip + products.length;
        skipRef.current = nextSkip;
        const canLoadMore =
          products.length === PRODUCT_PAGE_SIZE && nextSkip < total;
        hasMoreRef.current = canLoadMore;
        setHasMore(canLoadMore);

        setProductsList((prev) => {
          if (reset) {
            return products;
          }

          const seen = new Set(prev.map((item) => item.id));
          return [
            ...prev,
            ...products.filter((item) => item.id != null && !seen.has(item.id)),
          ];
        });
      } catch (err) {
        if (requestId !== requestIdRef.current) {
          return;
        }

        toastMessage(
          "error",
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
          setLoadingMore(false);
          loadingMoreRef.current = false;
        }
      }
    },
    [isAscending, selectedCategory, sortBy]
  );

  useEffect(() => {
    loadPage(true);
  }, [loadPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchWord(searchWord);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchWord]);

  useEffect(() => {
    getWishlist();
  }, []);

  const loadMore = useCallback(() => {
    loadPage(false);
  }, [loadPage]);

  useEffect(() => {
    const node = sentinelRef.current;

    if (!node || loading || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasMore, loadMore, loading]);

  const getWishlist = () => {
    setWishlist(
      JSON.parse(localStorage?.getItem(STORAGE_KEYS.wishlist) || "[]")
    );
  };

  const addToWishlist = (id: number) => {
    localStorage.setItem(
      STORAGE_KEYS.wishlist,
      JSON.stringify([...wishlist, id])
    );
    getWishlist();
  };

  const removeFromWishlist = (id: number) => {
    localStorage.setItem(
      STORAGE_KEYS.wishlist,
      JSON.stringify(wishlist.filter((idx: number) => idx != id))
    );
    getWishlist();
  };

  const handleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const displayedProducts = useMemo(() => {
    const query = debouncedSearchWord.trim().toLowerCase();

    if (!query) {
      return productsList;
    }

    return productsList.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }, [debouncedSearchWord, productsList]);

  return (
    <Box
      id="products"
      sx={{
        px: { xs: 2, md: 4 },
        pt: { xs: 3, md: 4 },
        pb: { xs: 4, md: 6 },
        bgcolor: "background.default",
      }}
    >
      <Header
        isAscending={isAscending}
        onToggleSortOrder={() => setIsAscending((prev) => !prev)}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      <CategoryMenu setSelectedCategory={setSelectedCategory} />
      <Box sx={ProductsWrapper}>
        {loading ? (
          <>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <ProductsCardSkeleton key={index} />
              ))}
          </>
        ) : (
          <>
            {displayedProducts.map((product: EachProduct) => (
              <ProductsCard
                key={product?.id}
                product={product}
                handleWishlist={handleWishlist}
                isWishlisted={wishlist.includes(product?.id)}
              />
            ))}
            {loadingMore &&
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <ProductsCardSkeleton key={`infinite-loader-${index}`} />
                ))}
          </>
        )}
      </Box>
      {hasMore && !loading && (
        <Box
          ref={sentinelRef}
          data-testid="infinite-scroll-sentinel"
          sx={{ height: 1 }}
        />
      )}
    </Box>
  );
};

export default Products;
