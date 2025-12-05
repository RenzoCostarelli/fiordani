"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { PrismicNextImage } from "@prismicio/next";
import { ArrowRight, X } from "lucide-react";
import WhatsappIcon from "@/components/ui/WhatsappIcon";
import { ImageField } from "@prismicio/client";

/**
 * Props for `Comerciales`.
 */
export type ComercialesProps = SliceComponentProps<Content.ComercialesSlice>;

/**
 * Component for "Comerciales" Slices.
 */
const Comerciales: FC<ComercialesProps> = ({ slice }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<ImageField | null>(null);

  const comerciales = slice.primary.comerciales;

  useEffect(() => {
    const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ paused: true }).from(slides, {
          y: 30,
          opacity: 0,
          // rotationX: -90,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
        });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top center",
          animation: tl,
          // markers: true,
        });
      });
    }, slides);
    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#a8b3ab] py-16"
      ref={sectionRef}
    >
      <div className="md:grid grid-cols-12 mx-auto gap-8 overflow-hidden px-4 md:px-0">
        <div className="col-start-2 2xl:col-start-4 col-span-2  text-[#49614e] flex-1 w-max mb-8 md:mb-0">
          <div className="text-4xl font-serif mb-8">
            <PrismicRichText field={slice.primary.zona_comercial} />
          </div>

          <div className="uppercase text-2xl">
            <PrismicRichText field={slice.primary.texto} />
          </div>
        </div>
        <div className="md:col-start-5 2xl:col-start-6 col-span-8">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1.1}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              renderBullet: function (index, className) {
                return `<span class="${className} custom-bullet"></span>`;
              },
            }}
            breakpoints={{
              768: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
          >
            {comerciales &&
              comerciales.map((comercial) => (
                <SwiperSlide data-slide key={comercial.name}>
                  <div className="h-[450px] md:h-[400px] bg-[#49614e] rounded-3xl relative overflow-hidden p-4 shadow-3xl mx-2 group/main">
                    {/* bg */}
                    <div className="absolute w-full h-full inset-0 group-hover/main:scale-105 transition-transform duration-500">
                      <PrismicNextImage
                        field={comercial.zone}
                        className="w-full h-full object-cover object-center"
                        alt=""
                      />
                    </div>
                    <div className="w-2/3 h-full relative rounded-xl overflow-hidden shadow-md text-[#41614b]">
                      <div className="flex flex-col h-full">
                        <div className="h-1/2">
                          <PrismicNextImage
                            field={comercial.image}
                            alt=""
                            className="h-full object-center object-cover"
                          />
                        </div>
                        <div className="bg-white h-full p-3 text-sm md:text-base flex flex-col justify-between">
                          <div>
                            <p className="font-light uppercase">
                              {comercial.name}
                            </p>
                            <p className="font-light uppercase">
                              {comercial.position}
                            </p>
                            <p className="font-light">{comercial.title}</p>
                          </div>
                          <p className="py-1 font-light flex items-center gap-2">
                            <span className="w-6 h-6 inline-block">
                              <WhatsappIcon />
                            </span>
                            {comercial.phone}
                          </p>
                          <button
                            className="flex items-center font-light gap-2 text-[#41614b] group cursor-pointer"
                            role="button"
                            onClick={() => setSelectedImage(comercial.zone)}
                          >
                            Ampliar Zona
                            <span className="text-white rounded-full bg-[#41614b] p-1 group-hover:translate-x-1.5 transition-transform">
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="custom-pagination flex justify-center items-center mt-6"></div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar modal"
            >
              <X className="w-8 h-8" />
            </button>
            <div
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <PrismicNextImage
                field={selectedImage}
                className="w-full h-full object-contain rounded-lg"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Comerciales;
