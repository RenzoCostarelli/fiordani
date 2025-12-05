"use client";
import { BCRData } from "@/slices/Cotizaciones";
import { ImageField, KeyTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import ArrowButton from "./ui/ArrowButton";
import Image from "next/image";

// Register GSAP plugin
gsap.registerPlugin(SplitText, ScrollTrigger);

// Icon mapping for products
const productIcons: { [key: string]: string } = {
  Soja: "/icons/soja.svg",
  Sorgo: "/icons/sorgo.svg",
  Girasol: "/icons/girasol.svg",
  Trigo: "/icons/trigo.svg",
  Maíz: "/icons/maíz.svg",
};

interface CotizacionesBcrCardProps {
  bg_bcr: ImageField;
  title_bcr: KeyTextField;
  subtitle_bcr: KeyTextField;
  bcrData: BCRData | null;
  today: string;
}

export default function CotizacionesBcrCard({
  title_bcr,
  subtitle_bcr,
  bg_bcr,
  bcrData,
  today,
}: CotizacionesBcrCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        const tl = gsap.timeline({ paused: true }).from(cardRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
        });
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "top 75%",
          animation: tl,
        });
      }
    }, cardRef);
    return () => ctx.revert();
  }, []);
  return (
    <div
      className="bg-amber-100 rounded-3xl  w-full grid grid-cols-7 gap-2 px-4 py-4 relative overflow-hidden"
      ref={cardRef}
    >
      <div className="absolute w-full h-full inset-0 object-cover overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:inset-0 [&>img]:object-cover">
        <PrismicNextImage field={bg_bcr} alt="" />
      </div>
      <div className="md:col-span-1 place-content-end col-span-7 text-white relative w-full md:w-max">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-serif">{title_bcr}</h3>
          <div className="h-[0.5px] bg-linear-to-r from-white to-white/10 w-full"></div>
          <div className="flex items-end justify-between w-full">
            <p>{subtitle_bcr}</p>
            <div className="block md:hidden">
              <ArrowButton href="/cotizaciones" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 relative items-center bg-white h-full rounded-r-xl overflow-hidden md:flex hidden">
        {bcrData && bcrData.tabla_json ? (
          <div className="w-full h-full overflow-auto p-4">
            <p>BOLSA DE COMERCIO DE ROSARIO - FECHA {today}</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#002f2f] text-white">
                  <th className="px-3 py-2 text-left font-medium">
                    Fecha Neg.
                  </th>
                  <th className="px-3 py-2 text-center font-medium w-12"></th>
                  <th className="px-3 py-2 text-left font-medium">
                    Trading date
                  </th>
                  {bcrData.tabla_json[1]?.slice(2).map((date, idx) => (
                    <th key={idx} className="px-3 py-2 text-center font-medium">
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bcrData.tabla_json.slice(2).map((row, rowIdx) => {
                  const productName = row[0] as string;
                  const iconPath = productIcons[productName];
                  return (
                    <tr key={rowIdx} className={"border-b-3"}>
                      <td className=" py-2 font-medium text-gray-800">
                        {row[0]}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {iconPath && (
                          <Image
                            src={iconPath}
                            alt={productName}
                            width={24}
                            height={24}
                            className="inline-block"
                          />
                        )}
                      </td>
                      <td className="px-3 py-2 text-gray-600">{row[1]}</td>
                      {row.slice(2).map((value, cellIdx) => (
                        <td
                          key={cellIdx}
                          className="px-3 py-2 text-center text-gray-800"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No hay datos disponibles
          </div>
        )}
      </div>
    </div>
  );
}
