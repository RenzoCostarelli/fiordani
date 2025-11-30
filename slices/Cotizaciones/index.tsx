import CotizacionesBcrCard from "@/components/CotizacionesBcrCard";
import CotizacionesBottomCards from "@/components/CotizacionesBottomCards";
import CotizacionesTitle from "@/components/CotizacionesTitle";
import { getValidTradingDate } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Cotizaciones`.
 */
export type CotizacionesProps = SliceComponentProps<Content.CotizacionesSlice>;

export interface BCRData {
  fecha_solicitada: string;
  tabla_json: string[][];
}

async function getBCRData(): Promise<BCRData | null> {
  try {
    const tradingDate = getValidTradingDate();
    const response = await fetch(
      `https://fiordanirenzi.com.ar/api_pizarra_rosario.php?fecha=${tradingDate}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch BCR data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching BCR data:", error);
    return null;
  }
}

/**
 * Component for "Cotizaciones" Slices.
 */
const Cotizaciones = async ({ slice }: CotizacionesProps) => {
  const bcrData = await getBCRData();

  const tradingDate = getValidTradingDate();

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 bg-white"
    >
      <div className="max-w-[1200px] mx-auto">
        <CotizacionesTitle
          title={slice.primary.title}
          text={slice.primary.text}
        />
        <div className="flex flex-col gap-4">
          <CotizacionesBcrCard
            title_bcr={slice.primary.title_bcr}
            subtitle_bcr={slice.primary.subtitle_bcr}
            bg_bcr={slice.primary.bg_bcr}
            bcrData={bcrData}
            today={tradingDate}
          />
          <CotizacionesBottomCards
            text_prices={slice.primary.text_prices}
            title_prices={slice.primary.title_prices}
            bg_promedios={slice.primary.bg_promedios}
            title_promedios={slice.primary.title_promedios}
            text_promedios={slice.primary.text_promedios}
          />
        </div>
      </div>
    </section>
  );
};

export default Cotizaciones;
