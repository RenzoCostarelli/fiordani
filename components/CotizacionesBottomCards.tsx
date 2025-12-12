"use client";
import { ImageField, KeyTextField } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";
import ArrowButton from "./ui/ArrowButton";
import WeatherWidget from "./WeatherWidget";
import DollarCard from "./DollarCard";
import { PrismicNextImage } from "@prismicio/next";

// Register GSAP plugin
gsap.registerPlugin(SplitText, ScrollTrigger);

interface CotizacionesBottomCardsProps {
  text_prices: KeyTextField;
  title_prices: KeyTextField;
  bg_precios: ImageField;
}

export default function CotizacionesBottomCards({
  text_prices,
  title_prices,
  bg_precios,
}: CotizacionesBottomCardsProps) {
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ pused: true }).from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });
      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 75%",
        animation: tl,
      });
    }, cards);
    return () => ctx.revert();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div
        className="col-span-1 md:col-span-5 place-content-end bg-[#48604d] p-6 rounded-xl h-[300px] relative text-white overflow-hidden"
        data-card
      >
        <div className="absolute w-full scale-200 h-full inset-0 overflow-hidden opacity-50 top-0 left-0 [&>img]:object-top-left [&>img]:w-full [&>img]:h-full [&>img]:inset-0 [&>img]:object-cover">
          <PrismicNextImage field={bg_precios} alt="" />
        </div>
        <div className="relative text-white">
          <div className="text-2xl font-serif">{title_prices}</div>
          <div className="h-[0.5px] bg-linear-to-r from-white to-white/10 w-full"></div>
          <div className="flex items-end justify-between">
            <p className="text-md">{text_prices}</p>
            <ArrowButton href="/cotizaciones#promedios" />
          </div>
        </div>
      </div>
      {/* <div
        className="col-span-4 p-6 bg-red-300 place-content-end rounded-xl h-[300px] relative overflow-hidden"
        data-card
      >
        <div className="absolute w-full h-full inset-0 overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:inset-0 [&>img]:object-cover">
          <PrismicNextImage field={bg_promedios} alt="" />
        </div>
        <div className="relative text-white ">
          <div className="text-2xl font-serif">{title_promedios}</div>
          <div className="h-[0.5px] bg-linear-to-r from-white to-white/10 w-full"></div>
          <div className="flex items-end justify-between">
            <p>{text_promedios}</p>

            <ArrowButton href="/cotizaciones" />
          </div>
        </div>
      </div> */}
      <div
        className="col-span-1 md:col-span-4 flex bg-linear-to-br from-blue-400 to-blue-600 rounded-xl h-[300px] relative overflow-hidden"
        data-card
      >
        <WeatherWidget />
      </div>
      <DollarCard />
    </div>
  );
}
