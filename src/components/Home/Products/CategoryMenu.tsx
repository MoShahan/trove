import React, { useEffect, useRef, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Skeleton,
  Typography,
} from "@mui/material";

import { fetchCategories } from "@/utils/products";

import {
  CategoryBar,
  CategoryItem,
  CategoryItemActive,
  CategoryRow,
  CategoryScrollButton,
} from "./style";

type Props = {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const formatCategoryLabel = (category: string) => category.replace(/-/g, " ");

const CategoryMenu = ({ setSelectedCategory }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<Array<string>>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  const updateScrollState = () => {
    const row = rowRef.current;

    if (!row) {
      return;
    }

    setCanScrollLeft(row.scrollLeft > 4);
    setCanScrollRight(row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const formattedData = await fetchCategories();
        setAllCategories(["all", ...formattedData]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const row = rowRef.current;

    if (!row) {
      return;
    }

    updateScrollState();
    row.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      row.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [allCategories, loading]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setSelectedCategory(category);
    setMenuAnchor(null);
  };

  const scrollRow = (direction: "left" | "right") => {
    rowRef.current?.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  const renderCategory = (category: string, inMenu = false) => {
    const isActive = activeCategory === category;

    return (
      <Box
        key={`${inMenu ? "menu" : "row"}-${category}`}
        onClick={() => handleCategoryClick(category)}
        sx={{
          ...CategoryItem,
          ...(isActive ? CategoryItemActive : {}),
          ...(inMenu
            ? {
                px: 1.5,
                py: 0.75,
                pb: 0.75,
                borderRadius: "8px",
                bgcolor: isActive ? "secondary.main" : "transparent",
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "primary.main",
                },
              }
            : {}),
        }}
      >
        <Typography variant="subtitle1" fontWeight="inherit">
          {formatCategoryLabel(category)}
        </Typography>
        {!inMenu && isActive && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "primary.main",
              borderRadius: "2px",
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <Box sx={CategoryBar}>
      <IconButton
        size="small"
        aria-label="Previous categories"
        onClick={() => scrollRow("left")}
        disabled={!canScrollLeft}
        sx={CategoryScrollButton}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>
      <Box ref={rowRef} sx={CategoryRow}>
        {loading
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} variant="text" width={72} height={28} />
              ))
          : allCategories.map((category) => renderCategory(category))}
      </Box>
      <IconButton
        size="small"
        aria-label="Next categories"
        onClick={() => scrollRow("right")}
        disabled={!canScrollRight}
        sx={CategoryScrollButton}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
      <Button
        size="small"
        onClick={(event) => setMenuAnchor(event.currentTarget)}
        endIcon={<KeyboardArrowDown />}
        sx={{
          flexShrink: 0,
          height: 36,
          px: 1.5,
          textTransform: "none",
          borderRadius: "8px",
          bgcolor: "secondary.main",
          color: "primary.main",
          fontWeight: 600,
          "&:hover": {
            bgcolor: "#e8e6e7",
          },
        }}
      >
        All categories
      </Button>
      <Popover
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(120px, 1fr))",
            gap: 0.5,
            p: 1.5,
            maxWidth: 520,
            maxHeight: 360,
            overflowY: "auto",
          }}
        >
          {allCategories.map((category) => renderCategory(category, true))}
        </Box>
      </Popover>
    </Box>
  );
};

export default CategoryMenu;
