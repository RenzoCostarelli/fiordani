import { getValidTradingDate } from "@/lib/utils";

export interface BCRData {
  fecha_solicitada: string;
  tabla_json: string[][];
}

export interface PreciosData {
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

async function getPrecios(): Promise<PreciosData | null> {
  try {
    const tradingDate = getValidTradingDate();
    const response = await fetch(
      `https://fiordanirenzi.com.ar/api_pizarra.php?fecha=${tradingDate}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch precios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching precios:", error);
    return null;
  }
}

export default async function CotizacionesPage() {
  const bcrData = await getBCRData();
  const preciosData = await getPrecios();
  const today = new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <section className="pt-32 pb-16 bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">
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
            className="bg-amber-100 rounded-3xl h-80 w-full grid grid-cols-7 gap-2 px-4 py-4 relative overflow-hidden"
          >
            <div className="absolute w-full h-full inset-0 object-cover overflow-hidden bg-linear-to-br from-slate-700 to-slate-900"></div>
            <div className="col-span-1 place-content-end text-white relative w-max z-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-serif">Precios BCR</h3>
                <div className="h-0 border-b bg-white w-full"></div>
                <p className="text-sm">Cotización diaria</p>
              </div>
            </div>
            <div className="col-span-6 relative flex items-center bg-white h-full rounded-r-xl overflow-hidden z-10">
              {bcrData && bcrData.tabla_json ? (
                <div className="w-full h-full overflow-auto p-4">
                  <p className="font-semibold mb-2 text-sm">
                    BOLSA DE COMERCIO DE ROSARIO - FECHA {today}
                  </p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#002f2f] text-white">
                        <th className="px-3 py-2 text-left font-medium text-xs">
                          Fecha Neg.
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-xs">
                          Trading date
                        </th>
                        {bcrData.tabla_json[1]?.slice(2).map((date, idx) => (
                          <th
                            key={idx}
                            className="px-3 py-2 text-center font-medium text-xs"
                          >
                            {date}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bcrData.tabla_json.slice(2).map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b">
                          <td className="px-3 py-2 font-medium text-gray-800 text-xs">
                            {row[0]}
                          </td>
                          <td className="px-3 py-2 text-gray-600 text-xs">
                            {row[1]}
                          </td>
                          {row.slice(2).map((value, cellIdx) => (
                            <td
                              key={cellIdx}
                              className="px-3 py-2 text-center text-gray-800 text-xs"
                            >
                              {value}
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

          {/* Fiordani Renzi Card */}
          <div
            id="promedios"
            className="bg-[#41614b] rounded-3xl h-80 w-full grid grid-cols-7 gap-4 px-4 py-4 relative overflow-hidden"
          >
            <div className="absolute w-full h-full inset-0 object-cover overflow-hidden">
              {/* IMAGEN FONDO */}
            </div>
            <div className="col-span-1 place-content-end text-white relative w-max z-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-serif">Precios</h3>
                <h3 className="text-2xl font-serif">Fiordani Renzi</h3>
                <div className="h-0 border-b bg-white w-full"></div>
                <p className="text-sm">Cotización diaria</p>
                <p className="text-sm">Fiordani Renzi</p>
                <p className="text-sm">Cereales S.A.</p>
              </div>
            </div>
            <div className="col-span-6 relative flex items-center bg-white h-full rounded-r-xl overflow-hidden z-10">
              {preciosData && preciosData.tabla_json ? (
                <div className="w-full h-full overflow-auto p-4">
                  <p className="font-semibold mb-2 text-sm">
                    FIORDANI RENZI - FECHA {today}
                  </p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#48604d] text-white">
                        {preciosData.tabla_json[0]?.map((header, idx) => (
                          <th
                            key={idx}
                            className="px-3 py-2 text-left font-medium text-xs"
                          >
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
                              className={`px-3 py-2 text-xs ${
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
