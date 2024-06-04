import React from 'react';

const LazyImage = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className={className}
    style={{ background: '#f0f0f0' }}
  />
);

export default LazyImage;
