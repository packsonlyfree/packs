import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const LazyImage = ({ src, alt, className }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${className} bg-${theme}-2`}
    />
  );
};

export default LazyImage;
