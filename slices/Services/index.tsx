"use client";
import ServicesTitle from "@/components/ServicesTitle";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FC, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */
const Services: FC<ServicesProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const serviceTitleRef = useRef<HTMLDivElement>(null);
  const services = slice.primary.services;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
      const header = serviceTitleRef.current;
      const wrapper = sectionRef.current;

      if (!cards.length || !header || !wrapper) return;

      const animation = gsap.timeline();
      let cardHeight: number;

      function initCards() {
        animation.clear();
        cardHeight = cards[0].offsetHeight;

        // Get the title height from the first card
        const firstTitle = cards[0].querySelector(
          "[data-service-card-title]"
        ) as HTMLElement;
        const titleHeight =
          firstTitle || !isMobile ? firstTitle.offsetHeight * 2 : 0;

        cards.forEach((card, index) => {
          if (index > 0) {
            // Offset each card by titleHeight to show stacked titles
            gsap.set(card, { y: index * cardHeight });
            // Animate each card back to 0 (for stacking)
            animation.to(
              card,
              { y: index * titleHeight, duration: index * 0.5, ease: "none" },
              0
            );
          }
        });
      }

      initCards();

      ScrollTrigger.create({
        trigger: wrapper,
        start: `top -=${header.offsetHeight}`,
        pin: true,
        end: () => `+=${cards.length * cardHeight + header.offsetHeight}`,
        scrub: true,
        animation: animation,
        invalidateOnRefresh: true,
      });

      ScrollTrigger.addEventListener("refreshInit", initCards);
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [services, isMobile]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-svh mb-64"
      ref={sectionRef}
      id="servicios"
    >
      <div
        className="container mx-auto relative py-16 md:px-0 px-4"
        ref={containerRef}
      >
        <div className="mb-4 md:max-w-4xl text-balance" ref={serviceTitleRef}>
          <ServicesTitle
            title={"SOLUCIONES INTEGRALES PARA CADA ETAPA DEL CAMPO."}
            text={
              "De la siembra a la cosecha, pasando por fertilización, pulverización y transporte: en cada paso te acompañamos con tecnología, experiencia y asesoramiento."
            }
          />
        </div>
        <div className="relative h-[60svh]" ref={cardsContainerRef}>
          {services?.map((service, index) => (
            // Services card
            <div
              key={index}
              className={`p-6 mb-4 h-full w-full absolute text-white rounded-2xl overflow-hidden`}
              style={{
                backgroundColor: service.bg_color || undefined,
              }}
              data-service-card
            >
              <div className="absolute w-full h-full inset-0">
                <PrismicNextImage
                  className="w-full h-full object-cover object-center rounded-2xl"
                  field={service.image}
                  alt=""
                />
              </div>
              {/* Gradient */}
              <div className="absolute w-full h-full inset-0 bg-linear-to-r from-black/20 to-transparent"></div>
              <div className="relative h-full">
                <h3
                  className="text-xl md:text-2xl font-serif tracking-wider"
                  data-service-card-title
                >
                  {service.title}
                </h3>
                <div className="md:text-xl text-shadow-2xs place-conotent-center h-full self-center flex flex-col items-start justify-center flex-1 max-w-[80%]">
                  <PrismicRichText field={service.text} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="h-svh"></div> */}
    </section>
  );
};

export default Services;
