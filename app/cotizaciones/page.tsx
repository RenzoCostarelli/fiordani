import {
  getValidTradingDate,
  getPreviousBusinessDay,
  formatDate,
} from "@/lib/utils";
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
            Precios de granos al instante y datos históricos fiables.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* BCR Card */}
          <div
            id="precios"
            className="bg-linear-to-br from-slate-700 to-slate-900 rounded-3xl w-full p-4 md:p-6 relative overflow-hidden flex md:flex-row flex-col md:items-end md:gap-6"
          >
            <div className="absolute w-full h-full inset-0">
              <Image
                src={
                  "https://res.cloudinary.com/dkgnaegp9/image/upload/v1764944355/financiali_yzrleh.jpg"
                }
                width={1200}
                height={686}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            {/* Title and Description - Top Section */}
            <div className="text-white relative z-10 mb-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl md:text-2xl font-serif">Precios BCR</h3>
                <div className="h-0 border-b bg-white w-full max-w-xs"></div>
                <p className="text-xs md:text-sm">Cotización diaria</p>
              </div>
            </div>

            {/* Table - Bottom Section with Scroll */}
            <div className="relative flex-1 bg-white rounded-xl overflow-hidden z-10 ">
              {bcrData && bcrData.tabla_json ? (
                <div className="w-full h-full flex flex-col">
                  <div className="p-3 md:p-4 border-b bg-gray-50">
                    <p className="font-semibold text-xs md:text-sm">
                      BOLSA DE COMERCIO DE ROSARIO - FECHA {bcrDate}
                    </p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 md:p-4">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-[#002f2f] z-10">
                        <tr className="text-white">
                          <th className="px-2 md:px-3 py-2 text-left font-medium text-xs whitespace-nowrap">
                            Fecha Neg.
                          </th>
                          <th className="px-2 md:px-3 py-2 text-left font-medium text-xs whitespace-nowrap">
                            Trading date
                          </th>
                          {bcrData.tabla_json[1]?.slice(2).map((date, idx) => (
                            <th
                              key={idx}
                              className="px-2 md:px-3 py-2 text-center font-medium text-xs whitespace-nowrap"
                            >
                              {date}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bcrData.tabla_json.slice(2).map((row, rowIdx) => (
                          <tr
                            key={rowIdx}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="px-2 md:px-3 py-2 font-medium text-gray-800 text-xs whitespace-nowrap">
                              {row[0]}
                            </td>
                            <td className="px-2 md:px-3 py-2 text-gray-600 text-xs whitespace-nowrap">
                              {row[1]}
                            </td>
                            {row.slice(2).map((value, cellIdx) => (
                              <td
                                key={cellIdx}
                                className="px-2 md:px-3 py-2 text-center text-gray-800 text-xs whitespace-nowrap"
                              >
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No hay datos disponibles
                </div>
              )}
            </div>
          </div>

          {/* Fiordani Renzi Card */}
          <div
            id="promedios"
            className="bg-[#41614b] rounded-3xl w-full p-4 md:p-6 relative overflow-hidden flex md:flex-row md:items-end md:gap-6 flex-col"
          >
            {/* Title and Description - Top Section */}
            <div className="text-white relative z-10 mb-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl md:text-2xl font-serif">Precios</h3>
                <h3 className="text-xl md:text-2xl font-serif">
                  Fiordani Renzi
                </h3>
                <div className="h-0 border-b bg-white w-full max-w-xs"></div>
                <p className="text-xs md:text-sm">Cotización diaria</p>
                <p className="text-xs md:text-sm">Fiordani Renzi</p>
                <p className="text-xs md:text-sm">Cereales S.A.</p>
              </div>
            </div>

            {/* Table - Bottom Section with Scroll */}
            <div className="relative flex-1 bg-white rounded-xl overflow-hidden z-10">
              {preciosData && preciosData.tabla_json ? (
                <div className="w-full h-full flex flex-col">
                  <div className="p-3 md:p-4 border-b bg-gray-50">
                    <p className="font-semibold text-xs md:text-sm">
                      FIORDANI RENZI - FECHA {preciosDate}
                    </p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 md:p-4">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-[#48604d] z-10">
                        <tr className="text-white">
                          {preciosData.tabla_json[0]?.map((header, idx) => (
                            <th
                              key={idx}
                              className="px-2 md:px-3 py-2 text-left font-medium text-xs whitespace-nowrap"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {preciosData.tabla_json.slice(1).map((row, rowIdx) => (
                          <tr
                            key={rowIdx}
                            className="border-b hover:bg-gray-50"
                          >
                            {row.map((cell, cellIdx) => (
                              <td
                                key={cellIdx}
                                className={`px-2 md:px-3 py-2 text-xs whitespace-nowrap ${
                                  cellIdx === 0
                                    ? "font-medium text-gray-800"
                                    : "text-gray-600"
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
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No hay datos disponibles
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
