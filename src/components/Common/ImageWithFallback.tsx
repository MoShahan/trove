import React, { useState } from "react";

import Image from "next/image";

import { FALLBACK_IMAGE } from "@/utils/constant";

type Props = {
  alt: string;
  width: number;
  height: number;
  imageUrl: string;
};

const ImageWithFallback = ({ alt, width, height, imageUrl }: Props) => {
  const [imageSrc, setImageSrc] = useState(imageUrl || FALLBACK_IMAGE);

  return (
    <Image
      key={imageSrc}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImageSrc(FALLBACK_IMAGE)}
    />
  );
};

export default ImageWithFallback;
