'use client'
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

export default function Hero({ home }) {
  
  return (
    <div className="hero">
      {/* <PrismicRichText field={home.data.title} /> */}
      <PrismicNextImage field={home.data.image}/>
      <div className="description">
        <PrismicRichText field={home.data.description} />
      </div>
      
    </div>
  );
}
