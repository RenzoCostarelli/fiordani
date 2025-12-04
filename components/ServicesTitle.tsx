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
        const tl = gsap
          .timeline({ paused: true })
          .from(titleRef.current, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: "power3.out",
          })
          .from(
            textRef.current,
            {
              opacity: 0,
              x: -20,
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
      <div ref={titleRef} className="md:max-w-xl">
        <h2 className="text-black text-3xl font-serif">
          {title}
          {/* Servicios */}
        </h2>
      </div>
      <div ref={textRef}>
        <p className="text-xl font-light">
          {text}
          {/* Nos ocupamos de todo el proceso de producción de granos. */}
        </p>
      </div>
    </>
  );
}
