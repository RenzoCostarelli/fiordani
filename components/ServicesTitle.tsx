"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(SplitText, ScrollTrigger);
interface TitleProps {
  title: string;
  text: string;
}

export default function ServicesTitle({ title, text }: TitleProps) {
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
    <>
      <div ref={titleRef}>
        <h2 className="text-black text-5xl font-serif">
          {title}
          {/* Servicios */}
        </h2>
      </div>
      <div ref={textRef}>
        <p className="text-2xl font-light">
          {text}
          {/* Nos ocupamos de todo el proceso de producción de granos. */}
        </p>
      </div>
    </>
  );
}
