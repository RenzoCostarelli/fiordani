"use client";
import { FC, use, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */
const Services: FC<ServicesProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const services = slice.primary.services;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");

      if (cards.length === 0) return;

      cards.forEach((card, index) => {
        // Calculate the scroll distance needed for all cards to stack
        // Each card needs to travel to stack on top of the previous one
        const totalCards = cards.length;
        const cardHeight = card.offsetHeight;

        ScrollTrigger.create({
          trigger: card,
          start: "top 100px",
          end: () => `+=${cardHeight * (totalCards - index)}`,
          pin: true,
          pinSpacing: false,
          // markers: true,
          scrub: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-svh "
    >
      <div className="max-w-[1200px] mx-auto relative py-16" ref={containerRef}>
        <div className="mb-8">
          <h2 className="text-black text-5xl">Servicios</h2>
          <p>Nos ocupamos de todo el proceso de producción de granos.</p>
        </div>
        {services?.map((service, index) => (
          <div
            key={index}
            className={`p-6 mb-4 h-[75svh] text-white rounded-2xl card relative`}
            style={{
              backgroundColor: service.bg_color || undefined,
              top: `${index * 55}px`,
            }}
            data-card
          >
            <div className="absolute w-full h-full inset-0">
              <PrismicNextImage
                className="w-full h-full object-cover object-center rounded-2xl"
                field={service.image}
                alt=""
              />
            </div>
            <div className="relative ">
              <h3
                className="text-5xl font-serif tracking-wider"
                data-cart-title
              >
                {service.title}
              </h3>
              <div className="text-3xl font-thin">
                <PrismicRichText field={service.text} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-svh"></div>
      {/* <div className="h-screen"></div> */}
    </section>
  );
};

export default Services;
