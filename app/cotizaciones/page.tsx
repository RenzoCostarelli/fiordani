import {
  getValidTradingDate,
  getPreviousBusinessDay,
  formatDate,
} from "@/lib/utils";
import BCRPricesCard from "@/components/BCRPricesCard";
import FiordaniRenziPricesCard from "@/components/FiordaniRenziPricesCard";
import Image from "next/image";

export interface BCRData {
  fecha_solicitada: string;
  tabla_json: string[][];
}

export interface PreciosData {
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

async function getPrecios(): Promise<PreciosData | null> {
  let currentDate = getValidTradingDate();
  let attempts = 0;
  const maxAttempts = 10; // Try up to 10 previous business days

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(
        `https://fiordanirenzi.com.ar/api_pizarra.php?fecha=${currentDate}`,
        {
          next: { revalidate: 3600 }, // Revalidate every hour
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch precios");
      }

      const data = await response.json();

      // Check if we have valid data (tabla_json should have content)
      if (data && data.tabla_json && data.tabla_json.length > 1) {
        return data;
      }

      // No data for this date, try previous business day
      currentDate = getPreviousBusinessDay(currentDate);
      attempts++;
    } catch (error) {
      console.error(`Error fetching precios for ${currentDate}:`, error);
      // Try previous business day
      currentDate = getPreviousBusinessDay(currentDate);
      attempts++;
    }
  }

  console.error("Could not find precios data after checking multiple dates");
  return null;
}

export default async function CotizacionesPage() {
  const bcrData = await getBCRData();
  const preciosData = await getPrecios();
  console.log(preciosData);

  // Format dates from the actual data (dd/mm/yyyy)
  const bcrDate = bcrData?.fecha_solicitada
    ? formatDate(bcrData.fecha_solicitada)
    : "N/A";
  const preciosDate = preciosData?.fecha_solicitada
    ? formatDate(preciosData.fecha_solicitada)
    : "N/A";

  return (
    <section className="pt-32 pb-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#002f2f] tracking-wider mb-2">
            Cotizaciones
          </h1>
          <p className="text-2xl font-light text-gray-600">
            Precios de granos al instante y datos históricos.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* BCR Card */}
          <BCRPricesCard bcrData={bcrData} bcrDate={bcrDate} />

          {/* Fiordani Renzi Card */}
          <div className="grid md:grid-cols-6 grid-cols-1 gap-6">
            <div className="md:col-span-4">
              <FiordaniRenziPricesCard
                preciosData={preciosData}
                preciosDate={preciosDate}
              />
            </div>
            <div className="col-span-1 md:col-span-2 rounded-3xl w-full md:h-auto h-[250px]  relative overflow-hidden">
              <div className="absolute w-full h-full inset-0">
                <Image
                  src={
                    "https://images.prismic.io/fiordanirenzi/aTxrlXNYClf9oIHd_Banner.jpg?auto=format,compress"
                  }
                  width={1200}
                  height={686}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="text-white/80 absolute bottom-0 text-xl text-balance font-light p-6 z-50">
                SOLUCIONES INTEGRALES PARA CADA ETAPA DEL CAMPO.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
