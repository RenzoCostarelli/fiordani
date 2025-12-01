import CotizacionesBcrCard from "@/components/CotizacionesBcrCard";
import CotizacionesBottomCards from "@/components/CotizacionesBottomCards";
import CotizacionesTitle from "@/components/CotizacionesTitle";
import { getValidTradingDate, getPreviousBusinessDay, formatDate } from "@/lib/utils";
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
  let currentDate = getValidTradingDate();
  let attempts = 0;
  const maxAttempts = 10; // Try up to 10 previous business days

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(
        `https://fiordanirenzi.com.ar/api_pizarra_rosario.php?fecha=${currentDate}`,
        {
          next: { revalidate: 3600 }, // Revalidate every hour
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch BCR data");
      }

      const data = await response.json();

      // Check if we have valid data (tabla_json should have content)
      if (data && data.tabla_json && data.tabla_json.length > 2) {
        return data;
      }

      // No data for this date, try previous business day
      currentDate = getPreviousBusinessDay(currentDate);
      attempts++;
    } catch (error) {
      console.error(`Error fetching BCR data for ${currentDate}:`, error);
      // Try previous business day
      currentDate = getPreviousBusinessDay(currentDate);
      attempts++;
    }
  }

  console.error("Could not find BCR data after checking multiple dates");
  return null;
}

/**
 * Component for "Cotizaciones" Slices.
 */
const Cotizaciones = async ({ slice }: CotizacionesProps) => {
  const bcrData = await getBCRData();

  // Use the actual date from the data, or fallback to a valid trading date
  const dateString = bcrData?.fecha_solicitada || getValidTradingDate();
  const displayDate = formatDate(dateString);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 bg-white"
    >
      <div className="container mx-auto md:p-0 px-4">
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
            today={displayDate}
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
