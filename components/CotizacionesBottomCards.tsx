"use client";
import { ImageField, KeyTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useState } from "react";
import ArrowButton from "./ui/ArrowButton";

// Register GSAP plugin
gsap.registerPlugin(SplitText, ScrollTrigger);

interface CotizacionesBottomCardsProps {
  text_prices: KeyTextField;
  title_prices: KeyTextField;
  bg_promedios: ImageField;
  title_promedios: KeyTextField;
  text_promedios: KeyTextField;
}

interface DolarRate {
  compra: number;
  venta: number;
  casa: string;
  nombre: string;
  moneda: string;
  fechaActualizacion: string;
}

export default function CotizacionesBottomCards({
  text_prices,
  title_prices,
  bg_promedios,
  title_promedios,
  text_promedios,
}: CotizacionesBottomCardsProps) {
  const [dolarOficial, setDolarOficial] = useState<DolarRate | null>(null);
  const [dolarBlue, setDolarBlue] = useState<DolarRate | null>(null);
  const [dolarMep, setDolarMep] = useState<DolarRate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDolarRates = async () => {
      try {
        const [oficialRes, blueRes, mepRes] = await Promise.all([
          fetch("https://dolarapi.com/v1/dolares/oficial"),
          fetch("https://dolarapi.com/v1/dolares/blue"),
          fetch("https://dolarapi.com/v1/dolares/bolsa"),
        ]);

        const [oficial, blue, mep] = await Promise.all([
          oficialRes.json(),
          blueRes.json(),
          mepRes.json(),
        ]);

        setDolarOficial(oficial);
        setDolarBlue(blue);
        setDolarMep(mep);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dollar rates:", error);
        setLoading(false);
      }
    };

    fetchDolarRates();
    // Refresh every 5 minutes
    const interval = setInterval(fetchDolarRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="grid grid-cols-12 gap-4">
      <div
        className="col-span-4 place-content-end bg-[#48604d] p-6 rounded-xl h-[300px] relative text-white"
        data-card
      >
        <div className="text-2xl font-serif">{title_prices}</div>
        <div className="h-[0.5px] bg-linear-to-r from-white to-white/10 w-full"></div>
        <div className="flex items-end justify-between">
          <p className="text-md">{text_prices}</p>
          <ArrowButton href="/cotizaciones#promedios" />
        </div>
      </div>
      <div
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
      </div>
      <div
        className="col-span-2 bg-linear-to-br from-blue-400 to-blue-600 rounded-xl h-[300px] relative overflow-hidden p-4"
        data-card
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `<div id="ww_1a34e7a320ee2" v='1.3' loc='id' a='{"t":"horizontal","lang":"es","sl_lpl":1,"ids":["wl6215"],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","el_whr":3}'>Más previsiones: <a href="https://tiempolargo.com/buenos_aires_tiempo_25_dias/" id="ww_1a34e7a320ee2_u" target="_blank">Pronóstico extendido 25 días caba</a></div><script async src="https://app3.weatherwidget.org/js/?id=ww_1a34e7a320ee2"></script>`,
          }}
        />
      </div>
      <div
        className="col-span-2 bg-[#a5b4aa] rounded-xl h-[300px] relative overflow-hidden py-4 text-white"
        data-card
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-center">
              <div className="text-lg">Cargando...</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between text-center">
            <div className="px-4">
              <div className="text-sm font-light tracking-wider mb-1">
                DÓLAR OFICIAL
              </div>
              <div className="flex justify-between text-[10px] mb-0.5">
                <span className="opacity-80">COMPRA</span>
                <span className="opacity-80">VENTA</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>
                  ${" "}
                  {dolarOficial?.compra.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span>
                  ${" "}
                  {dolarOficial?.venta.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="px-4 border-t pt-4">
              <div className="text-sm font-light tracking-wider mb-1">
                DÓLAR BLUE
              </div>
              <div className="flex justify-between text-[10px] mb-0.5">
                <span className="opacity-80">COMPRA</span>
                <span className="opacity-80">VENTA</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>
                  ${" "}
                  {dolarBlue?.compra.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span>
                  ${" "}
                  {dolarBlue?.venta.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="px-4 border-t pt-4">
              <div className="text-sm font-light tracking-wider mb-1">
                DÓLAR MEP
              </div>
              <div className="flex justify-between text-[10px] mb-0.5">
                <span className="opacity-80">COMPRA</span>
                <span className="opacity-80">VENTA</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>
                  ${" "}
                  {dolarMep?.compra.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span>
                  ${" "}
                  {dolarMep?.venta.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="rotate-90 w-max mx-auto mt-3">
                <ArrowButton href="/cotizaciones" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
