import { BCRData } from "@/app/cotizaciones/page";
import Image from "next/image";

const productIcons: { [key: string]: string } = {
  Soja: "/icons/soja.svg",
  Sorgo: "/icons/sorgo.svg",
  Girasol: "/icons/girasol.svg",
  Trigo: "/icons/trigo.svg",
  Maíz: "/icons/maíz.svg",
};

interface BCRPricesCardProps {
  bcrData: BCRData | null;
  bcrDate: string;
}

export default function BCRPricesCard({
  bcrData,
  bcrDate,
}: BCRPricesCardProps) {
  return (
    <div
      id="precios"
      className="bg-linear-to-br from-slate-700 to-slate-900 rounded-3xl w-full p-4 relative overflow-hidden flex md:flex-row flex-col md:items-end md:gap-6"
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
      <div className="relative flex-1 bg-white rounded-xl overflow-hidden z-10">
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
                    <th className="px-2 md:px-3 py-2 text-center font-medium w-12"></th>
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
                  {bcrData.tabla_json.slice(2).map((row, rowIdx) => {
                    const productName = row[0] as string;
                    const iconPath = productIcons[productName];

                    return (
                      <tr key={rowIdx} className="border-b hover:bg-gray-50">
                        <td className="px-2 md:px-3 py-2 font-medium text-gray-800 text-xs whitespace-nowrap">
                          {row[0]}
                        </td>
                        <td className="px-2 md:px-3 py-2 text-center">
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
                    );
                  })}
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
  );
}
