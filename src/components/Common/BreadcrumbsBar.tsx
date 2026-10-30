import React from "react";

import Link from "next/link";

import { Breadcrumbs, Skeleton, Typography } from "@mui/material";

import { RouteType } from "@/utils/type";

import { LinkStyle } from "./common.style";
import { BreadcrumbsContainer } from "./style";

type Props = {
  routes: RouteType[];
};

const BreadcrumbsBar = ({ routes }: Props) => {
  return (
    <Breadcrumbs sx={BreadcrumbsContainer}>
      {routes.map((route, index) =>
        route?.loading ? (
          <Skeleton key={index} width={"8ch"} variant="text" />
        ) : (
          <Link
            key={index}
            href={route.path || ""}
            style={{
              ...LinkStyle,
              textTransform: "capitalize",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: route.isActive ? "primary.main" : "inherit" }}
            >
              {route.label}
            </Typography>
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsBar;
