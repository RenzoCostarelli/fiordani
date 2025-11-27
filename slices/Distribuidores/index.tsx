"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/**
 * Props for `Distribuidores`.
 */
export type DistribuidoresProps =
  SliceComponentProps<Content.DistribuidoresSlice>;

/**
 * Component for "Distribuidores" Slices.
 */
const Distribuidores: FC<DistribuidoresProps> = ({ slice }) => {
  const title = slice.primary.title;
  const subtitle = slice.primary.text;
  const logos = slice.primary.logos;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="w-full text-4xl text-center font-serif">
          <PrismicRichText field={title} />
        </div>
        <div className="w-full text-xl text-center">
          <PrismicRichText field={subtitle} />
        </div>
        <div className="mt-8 px-4">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="distributor-swiper"
          >
            {logos.map((logo, index) => (
              <SwiperSlide key={index}>
                <div className="h-80 w-full">
                  <PrismicNextImage
                    field={logo.logo}
                    alt=""
                    className="h-full object-contain object-center mx-auto"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Distribuidores;
