"use client";
import ServicesTitle from "@/components/ServicesTitle";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Scroll } from "lucide-react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const services = slice.primary.services;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");

      // cards.forEach((card, index) => {
      //   const totalCards = cards.length;
      //   const cardHeight = card.offsetHeight;

      //   const tl = gsap.timeline({ paused: true }).to(card, {
      //     y: -cardHeight,
      //     ease: "none",
      //   });

      //   ScrollTrigger.create({
      //     trigger: card,
      //     start: "top +=200",
      //     end: `+=${cardHeight * (totalCards - index)}`,
      //     pin: true,
      //     animation: tl,
      //     pinSpacing: false,
      //     // markers: true,
      //     scrub: true,
      //   });
      // });

      // ScrollTrigger.create({
      //   trigger: sectionRef.current,
      //   start: "top top",
      //   end: sectionRef.current!.offsetHeight!,
      //   pin: true,
      //   pinSpacing: false,
      //   markers: true,
      //   scrub: true,
      // });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const cards = gsap.utils.toArray<HTMLElement>(".card");

  //     ScrollTrigger.create({
  //       trigger: titleRef.current,
  //       start: "top +=100",
  //       end: sectionRef.current!.offsetHeight!,
  //       pin: true,
  //       pinSpacing: false,
  //       // markers: true,
  //       scrub: true,
  //     });
  //     if (cards.length === 0) return;

  //     cards.forEach((card, index) => {
  //       // Calculate the scroll distance needed for all cards to stack
  //       // Each card needs to travel to stack on top of the previous one
  //       const totalCards = cards.length;
  //       const cardHeight = card.offsetHeight;

  //       ScrollTrigger.create({
  //         trigger: card,
  //         start: "top +=200",
  //         end: `+=${cardHeight * (totalCards - index)}`,
  //         pin: true,
  //         pinSpacing: false,
  //         // markers: true,
  //         scrub: true,
  //       });
  //     });
  //   }, containerRef);

  //   return () => ctx.revert();
  // }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-svh"
      ref={sectionRef}
      id="servicios"
    >
      <div
        className="container mx-auto relative py-16 md:px-0 px-4"
        ref={containerRef}
      >
        <div className="mb-0" ref={titleRef}>
          <ServicesTitle
            title={"Servicios"}
            text={"Nos ocupamos de todo el proceso de producción de granos."}
          />
        </div>
        {services?.map((service, index) => (
          <div
            key={index}
            className={`p-6 mb-4 h-[65svh] text-white rounded-2xl card `}
            style={{
              backgroundColor: service.bg_color || undefined,
            }}
            data-card
          >
            <div className="absolute w-full h-full inset-0 ">
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

      {/* <div className="h-svh"></div> */}
    </section>
  );
};

export default Services;
