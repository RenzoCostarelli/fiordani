"use client";
import { PreciosData } from "@/app/cotizaciones/page";
import { ImageField, KeyTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";

// Register GSAP plugin
gsap.registerPlugin(SplitText, ScrollTrigger);

interface CotizacionesPreciosCardProps {
  bg_precios: ImageField;
  title_precios: KeyTextField;
  subtitle_precios: KeyTextField;
  preciosData: PreciosData | null;
  today: string;
}

export default function CotizacionesPreciosCard({
  title_precios,
  subtitle_precios,
  bg_precios,
  preciosData,
  today,
}: CotizacionesPreciosCardProps) {
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
      className="bg-[#48604d] rounded-3xl h-80 w-full grid grid-cols-7 gap-2 px-4 py-4 relative overflow-hidden"
      ref={cardRef}
    >
      <div className="absolute w-full h-full inset-0 object-cover overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:inset-0 [&>img]:object-cover">
        <PrismicNextImage field={bg_precios} alt="" />
      </div>
      <div className="col-span-1 place-content-end text-white relative w-max">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-serif">{title_precios}</h3>
          <div className="h-0 border-b bg-white w-full"></div>
          <p>{subtitle_precios}</p>
        </div>
      </div>
      <div className="col-span-6 relative flex items-center bg-white h-full rounded-r-xl overflow-hidden">
        {preciosData && preciosData.tabla_json ? (
          <div className="w-full h-full overflow-auto p-4">
            <p>FIORDANI RENZI - FECHA {today}</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#48604d] text-white">
                  {preciosData.tabla_json[0]?.map((header, idx) => (
                    <th key={idx} className="px-3 py-2 text-left font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preciosData.tabla_json.slice(1).map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b">
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className={`px-3 py-2 ${
                          cellIdx === 0 ? "font-medium text-gray-800" : "text-gray-600"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
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
