import React from "react";

import { ArrowCircleDown, ArrowCircleUp, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  HeaderContainer,
  HeaderControls,
  RoundedInputStyle,
  SortGroup,
  SortIconButton,
} from "./style";

type Props = {
  isAscending: boolean;
  onToggleSortOrder: () => void;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};

const Header = ({
  isAscending,
  onToggleSortOrder,
  searchWord,
  setSearchWord,
  setSortBy,
  sortBy,
}: Props) => {
  return (
    <Box sx={HeaderContainer}>
      <Typography
        variant="h1"
        fontWeight={700}
        sx={{ letterSpacing: "0.04em" }}
      >
        PRODUCTS
      </Typography>

      <Box sx={HeaderControls}>
        <TextField
          placeholder="Search..."
          size="small"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          sx={[RoundedInputStyle, { width: { xs: "100%", sm: 240 } }]}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box sx={SortGroup}>
          <Typography variant="subtitle1" color="textSecondary">
            Sort by
          </Typography>
          <Select
            size="small"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            sx={[RoundedInputStyle, { minWidth: 128 }]}
          >
            <MenuItem value={"title"}>Title</MenuItem>
            <MenuItem value={"price"}>Price</MenuItem>
          </Select>
          <IconButton
            onClick={onToggleSortOrder}
            sx={SortIconButton}
            aria-label={isAscending ? "Sort descending" : "Sort ascending"}
          >
            {isAscending ? <ArrowCircleDown /> : <ArrowCircleUp />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
