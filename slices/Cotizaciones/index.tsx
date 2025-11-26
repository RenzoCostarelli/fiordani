import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Cotizaciones`.
 */
export type CotizacionesProps = SliceComponentProps<Content.CotizacionesSlice>;

/**
 * Component for "Cotizaciones" Slices.
 */
const Cotizaciones: FC<CotizacionesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 bg-white"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="px-4 mb-4">
          <div className="text-3xl font-serif font-bold">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="text-2xl font-light">
            <PrismicRichText field={slice.primary.text} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-amber-100 rounded-xl h-[300px] w-full grid grid-cols-7 px-6 py-4 relative overflow-hidden">
            <div className="absolute w-full h-full inset-0 object-cover overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:inset-0 [&>img]:object-cover">
              <PrismicNextImage field={slice.primary.bg_bcr} alt="" />
            </div>
            <div className="col-span-1 place-content-end text-white relative">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-serif">
                  {slice.primary.title_bcr}
                </h3>
                <div className="h-0.5 bg-white w-full"></div>
                <p>{slice.primary.subtitle_bcr}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-9 gap-4">
            <div className="col-span-3 place-content-end bg-[#48604d] p-6 rounded-xl h-[300px] relative text-white">
              <div className="text-xl font-serif">
                {slice.primary.title_prices}
              </div>
              <div className="h-0.5 bg-white w-full"></div>
              <p className="text-sm">{slice.primary.text_prices}</p>
            </div>
            <div className="col-span-3 p-6 bg-red-300 place-content-end rounded-xl h-[300px] relative overflow-hidden">
              <div className="absolute w-full h-full inset-0 overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:inset-0 [&>img]:object-cover">
                <PrismicNextImage field={slice.primary.bg_promedios} alt="" />
              </div>
              <div className="relative text-white">
                <div className="text-xl font-serif">
                  {slice.primary.title_promedios}
                </div>
                <div className="h-0.5 bg-white w-full"></div>
                <p>{slice.primary.text_promedios}</p>
              </div>
            </div>
            <div className="col-span-2 bg-linear-to-br from-blue-400 to-blue-600 rounded-xl h-[300px] relative overflow-hidden p-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div id="ww_1a34e7a320ee2" v='1.3' loc='id' a='{"t":"horizontal","lang":"es","sl_lpl":1,"ids":["wl6215"],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","el_whr":3}'>Más previsiones: <a href="https://tiempolargo.com/buenos_aires_tiempo_25_dias/" id="ww_1a34e7a320ee2_u" target="_blank">Pronóstico extendido 25 días caba</a></div><script async src="https://app3.weatherwidget.org/js/?id=ww_1a34e7a320ee2"></script>`
                }}
              />
            </div>
            <div className="col-span-1 bg-red-300 rounded-xl h-[300px] relative"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cotizaciones;
