"use client";
import { FC, useRef, useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !sectionRef.current) return;

    const marquee = marqueeRef.current;
    const items = marquee.children;

    if (items.length === 0) return;

    // Calculate the total width of all items
    const totalWidth = Array.from(items).reduce(
      (acc, item) => acc + (item as HTMLElement).offsetWidth,
      0
    );

    // Create the infinite scroll animation
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
    });

    tl.to(marquee, {
      x: -totalWidth / 2,
      duration: 30,
      ease: "none",
    });

    // ScrollTrigger to reverse direction based on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // Reverse direction based on scroll direction
        gsap.to(tl, {
          timeScale: self.direction === 1 ? 1 : -1,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [logos]);

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pb-16"
    >
      <div className="max-w-[1400px] mx-auto relative">
        <div className="absolute h-full w-full inset-0 bg-linear-to-r from-white from-2% via-transparent to-white to-98% z-10"></div>
        <div className="w-full text-4xl text-center font-serif">
          <PrismicRichText field={title} />
        </div>
        <div className="w-full text-xl text-center">
          <PrismicRichText field={subtitle} />
        </div>
        <div className="mt-8 overflow-hidden">
          <div ref={marqueeRef} className="flex will-change-transform">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div key={`logo-1-${index}`} className="flex-shrink-0 px-8">
                <div className="h-80 w-80">
                  <PrismicNextImage
                    field={logo.logo}
                    alt=""
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div key={`logo-2-${index}`} className="flex-shrink-0 px-8">
                <div className="h-80 w-80">
                  <PrismicNextImage
                    field={logo.logo}
                    alt=""
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Distribuidores;
