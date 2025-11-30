"use client";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(SplitText, ScrollTrigger);

interface TitleProps {
  title: RichTextField;
  text: RichTextField;
}

export default function CotizacionesTitle({ title, text }: TitleProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current && textRef.current) {
        const splitTitle = new SplitText(titleRef.current, {
          type: "chars",
        });
        const titleChars = splitTitle.chars;

        const splitText = new SplitText(textRef.current, {
          type: "words",
        });

        const tl = gsap
          .timeline({ paused: true })
          .from(titleChars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
          })
          .from(
            splitText.words,
            {
              opacity: 0,
              y: 20,
              stagger: 0.05,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.75"
          );

        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 65%",
          animation: tl,
        });
      }
    }, titleRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="px-4 mb-4">
      <div
        className="text-4xl font-serif font-bold text-[#002f2f] tracking-wider"
        ref={titleRef}
      >
        <PrismicRichText field={title} />
      </div>
      <div className="text-2xl font-light" ref={textRef}>
        <PrismicRichText field={text} />
      </div>
    </div>
  );
}
