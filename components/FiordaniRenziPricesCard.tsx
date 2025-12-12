import { PreciosData } from "@/app/cotizaciones/page";
import Image from "next/image";

const productIcons: { [key: string]: string } = {
  Soja: "/icons/soja.svg",
  Sorgo: "/icons/sorgo.svg",
  Girasol: "/icons/girasol.svg",
  Trigo: "/icons/trigo.svg",
  Maiz: "/icons/maíz.svg",
};

interface FiordaniRenziPricesCardProps {
  preciosData: PreciosData | null;
  preciosDate: string;
}

export default function FiordaniRenziPricesCard({
  preciosData,
  preciosDate,
}: FiordaniRenziPricesCardProps) {
  return (
    <div
      id="promedios"
      className="bg-[#41614b] rounded-3xl w-full p-4 relative overflow-hidden flex md:flex-row md:items-end md:gap-6 flex-col"
    >
      <div className="absolute w-full h-full inset-0">
        <Image
          src={
            "https://images.prismic.io/fiordanirenzi/aTxrgnNYClf9oIHU_Fondo-grafico.jpg?auto=format,compress"
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
          <h3 className="text-xl md:text-2xl font-serif">Precios</h3>
          <h3 className="text-xl md:text-2xl font-serif">Fiordani Renzi</h3>
          <div className="h-0 border-b bg-white w-full max-w-xs"></div>
          <p className="text-xs md:text-sm">Cotización diaria</p>
          <p className="text-xs md:text-sm">Fiordani Renzi</p>
          <p className="text-xs md:text-sm">Cereales S.A.</p>
        </div>
      </div>

      {/* Table - Bottom Section with Scroll */}
      <div className="relative flex-1 bg-white rounded-xl overflow-hidden py-6 z-10">
        {preciosData &&
        preciosData.tabla_json &&
        preciosData.tabla_json.length > 1 ? (
          <div className="w-full h-full flex flex-col">
            <div className="px-3 md:px-4">
              <p className="font-semibold text-lg">
                FIORDANI RENZI - FECHA {preciosDate}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-4 md:px-6">
              <table className="w-full">
                <tbody>
                  {preciosData.tabla_json.slice(1).map((row, rowIdx) => {
                    const productName = row[0] as string;
                    const iconPath = productIcons[productName];

                    return (
                      <tr
                        key={rowIdx}
                        className="border-b-3 border-black last:border-b-0"
                      >
                        <td className="py-2">
                          <div className="flex items-start gap-4 justify-between">
                            {/* Product name and icon */}
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="font-normal text-gray-900 ">
                                {productName}
                              </span>
                            </div>

                            {/* Price information in grid layout */}
                            <div className="flex-1 flex items-start justify-end">
                              {iconPath && (
                                <Image
                                  src={iconPath}
                                  alt={productName}
                                  width={28}
                                  height={28}
                                  className="inline-flex mr-5"
                                />
                              )}
                              {row[1] &&
                                (() => {
                                  // Example: "$279.500 Entregado en planta de acopio$276.000 Entregado en puertoAbril U$s180"
                                  let text = row[1];
                                  const rows: Array<{
                                    price: string;
                                    description: string;
                                  }> = [];

                                  // First, add space before month if puerto is directly followed by month
                                  text = text.replace(
                                    /puerto([A-Z][a-z]+)/g,
                                    "puerto $1"
                                  );

                                  // Check if there's a month + USD price at the end
                                  const endMatch = text.match(
                                    /([A-Z][a-z]+)\s+U\$s([\d]+)$/i
                                  );
                                  let mainText = text;
                                  let monthAndUsd = null;

                                  if (endMatch) {
                                    monthAndUsd = {
                                      month: endMatch[1],
                                      usd: "U$s" + endMatch[2],
                                    };
                                    // Remove the month and USD from the end
                                    mainText = text.substring(
                                      0,
                                      text.lastIndexOf(endMatch[0])
                                    );
                                  }

                                  // Now parse the price sections from mainText
                                  const priceRegex = /\$([\d.,]+)\s+([^$]+)/g;
                                  let match;

                                  while (
                                    (match = priceRegex.exec(mainText)) !== null
                                  ) {
                                    const description = match[2].trim();

                                    rows.push({
                                      price: "$" + match[1],
                                      description: description,
                                    });
                                  }

                                  // Add the month and USD price as the last row
                                  if (monthAndUsd) {
                                    rows.push({
                                      price: monthAndUsd.month,
                                      description: monthAndUsd.usd,
                                    });
                                  }

                                  return (
                                    <div className="">
                                      {rows.map((row, idx) => (
                                        <div key={idx} className="flex gap-3">
                                          <div className="text-gray-900 w-[100px] shrink-0">
                                            {row.price}
                                          </div>
                                          <div className="text-gray-700">
                                            {row.description}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                })()}
                            </div>
                          </div>
                        </td>
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
