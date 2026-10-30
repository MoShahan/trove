import Image from "next/image";
import Link from "next/link";

import { Box, Button, Typography } from "@mui/material";

import {
  BannerContainer,
  BannerImageFade,
  BannerImageWrap,
  ContentWrapper,
} from "./style";

const Banner = () => {
  return (
    <Box sx={BannerContainer}>
      <Box sx={BannerImageWrap} aria-hidden>
        <Image
          src="/home_bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
        <Box sx={BannerImageFade} />
      </Box>
      <Box sx={ContentWrapper}>
        <Typography fontSize={60} fontWeight={800}>
          FIND PRODUCTS THAT MATCHES YOUR STYLE
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{ wordSpacing: "0.15rem" }}
        >
          Browse through our diverse range of meticulously crafted products,
          designed to bring out your individuality and cater to you.
        </Typography>
        <Link href={"#products"}>
          <Button variant="contained">Shop Now</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Banner;
