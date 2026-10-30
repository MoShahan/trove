import React from "react";

import { Box, Skeleton } from "@mui/material";

const InfoLoader = () => {
  return (
    <Box
      data-testid="info-loader"
      sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}
    >
      <Skeleton
        variant="rectangular"
        width={400}
        height={400}
        sx={{ borderRadius: "20px" }}
      />
      <Box sx={{ width: "100%", flex: 1 }}>
        <Skeleton
          variant="text"
          sx={{
            fontSize: "2.25rem",
            width: {
              xs: "100%",
              md: "50%",
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <Skeleton
            width={"10ch"}
            variant="text"
            sx={{ fontSize: "2.5rem", borderRadius: "20px" }}
          />
          <Skeleton
            width={"10ch"}
            variant="text"
            sx={{ fontSize: "2.5rem", borderRadius: "20px" }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                sx={{
                  fontSize: "1.125rem",
                  width: {
                    xs: "100%",
                    md: "50%",
                  },
                }}
              />
            ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                width={"20ch"}
                variant="text"
                sx={{ fontSize: "1.125rem" }}
              />
            ))}
        </Box>

        <Skeleton
          width={"10ch"}
          variant="text"
          sx={{ fontSize: "2.5rem", borderRadius: "20px" }}
        />
      </Box>
    </Box>
  );
};

export default InfoLoader;
