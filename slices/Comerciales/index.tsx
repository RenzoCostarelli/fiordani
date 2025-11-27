"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/**
 * Props for `Comerciales`.
 */
export type ComercialesProps = SliceComponentProps<Content.ComercialesSlice>;

/**
 * Component for "Comerciales" Slices.
 */
const Comerciales: FC<ComercialesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#a8b3ab] py-16"
    >
      <div className="grid grid-cols-12 mx-auto gap-6 overflow-hidden">
        <div className="col-start-2 2xl:col-start-4 col-span-2  text-[#49614e] flex-1 w-max">
          <h2 className="text-5xl font-serif mb-8">Zona Comercial</h2>
          <p className="uppercase text-2xl">
            Cerca tuyo, <br />
            Estés donde estés
          </p>
        </div>
        <div className="col-start-5 2xl:col-start-6 col-span-8">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={16}
            slidesPerView={2.5}
            // pagination={{ clickable: true }}
            // navigation={true}
            breakpoints={{
              768: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            className="comerciales-swiper"
          >
            <SwiperSlide>
              <div className="h-[400px]  bg-[#49614e] rounded-2xl"></div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-[400px]  bg-[#49614e] rounded-2xl"></div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-[400px]  bg-[#49614e] rounded-2xl"></div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Comerciales;
