'use client'
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as prismic from "@prismicio/client";

import Slider from "react-slick";
import Link from "next/link";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {

  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    slidesToShow: 3,
    variableWidth: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        }
      },
    ]
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel"
    >
      <Slider {...settings}>
        {slice.primary.carousel.map((item, i) => {
          return(
            <div key={i} className={`carousel-item`}>
              <img src={item.image?.url || ""} alt={item.image?.alt || "Image"} />
              <Link className="button" href={prismic.asLink(item.link) || "#"}>Read more</Link>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Carousel;
