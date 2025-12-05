"use client";

import { FC, useRef, useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Register GSAP plugin
gsap.registerPlugin(SplitText);

/**
 * Props for `Slider`.
 */
export type SliderProps = SliceComponentProps<Content.SliderSlice>;

/**
 * Component for "Slider" Slices.
 */
const Slider: FC<SliderProps> = ({ slice }) => {
  const slides = slice.primary.slide;
  const swiperRef = useRef<SwiperType | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const animateText = (element: HTMLElement) => {
    const split = new SplitText(element, {
      type: "chars,words",
      charsClass: "char",
      wordsClass: "word",
    });

    gsap.set(element, { opacity: 1 });

    gsap.from(split.words, {
      opacity: 0,
      x: -50,
      stagger: 0.05,
    });
  };

  useEffect(() => {
    // Animate the first slide on mount
    if (textRefs.current[0]) {
      animateText(textRefs.current[0]);
    }
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full overflow-hidden h-[50svh] md:h-[65svh] relative"
    >
      {slides && slides.length > 0 && (
        <>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            // pagination={{ clickable: true }}
            speed={1000}
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            // }}
            loop={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            // onSlideChangeTransitionStart={(swiper) => {
            //   const realIndex = swiper.activeIndex;
            //   if (textRefs.current[realIndex]) {
            //     transitionStart(textRefs.current[realIndex]!);
            //   }
            // }}
            onSlideChangeTransitionEnd={(swiper) => {
              const realIndex = swiper.realIndex;
              if (textRefs.current[realIndex]) {
                animateText(textRefs.current[realIndex]!);
              }
            }}
            className="h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className="relative grid place-content-center md:p-0 px-6"
              >
                <PrismicNextImage
                  className="w-full h-full object-cover object-center absolute inset-0"
                  field={slide.imagen}
                  alt=""
                />
                <div
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="container mx-auto relative z-50 text-3xl md:text-6xl text-white font-thin opacity-0 drop-shadow-xl drop-shadow-black"
                >
                  <PrismicRichText field={slide.title} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex gap-5 items-center text-white absolute  bottom-10 right-10 z-10">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="custom-swiper-button-prev cursor-pointer p-1 border-2 rounded-full transition-all opacity-90 border-white hover:opacity-100 hover:scale-105 hover:bg-white hover:text-neutral-400"
              aria-label="Imagen Anterior"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="custom-swiper-button-next cursor-pointer p-1 border-2 rounded-full transition-all opacity-90 border-white hover:opacity-100 hover:scale-105 hover:bg-white hover:text-neutral-400"
              aria-label="Imagen Siguiente"
            >
              <ArrowRight />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Slider;
