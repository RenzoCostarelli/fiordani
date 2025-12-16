"use client";
import { CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";

interface DolarRate {
  moneda: string;
  origen: string;
  compra: number;
  venta: number;
  actualizado: string;
}

export default function DollarCard() {
  const [dolarOficial, setDolarOficial] = useState<DolarRate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDolarRates = async () => {
      try {
        const oficialRes = await fetch("/api/dolar");
        const oficial = await oficialRes.json();
        console.log("Dólar Oficial:", oficial);

        setDolarOficial(oficial);
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

  return (
    <div
      className="col-span-1 md:col-span-3 bg-[#a5b4aa] rounded-xl h-[300px] relative overflow-hidden py-4 text-white"
      data-card
    >
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-center">
            <div className="text-lg">Cargando...</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-center text-center">
          <CircleDollarSign width={100} height={100} className="mx-auto mb-4" />
          <div className="px-4">
            <div className="text-xl tracking-wider mb-4">DÓLAR BNA</div>
            <div className="h-0.5 w-full md:w-[90%] mx-auto bg-white mb-4"></div>
            <div className="flex justify-between px-4 md:px-8">
              <div className="flex flex-col text-center">
                <span className="opacity-80 text-sm">COMPRA</span>
                <span className="font-semibold">
                  ${" "}
                  {dolarOficial?.compra.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="opacity-80 text-sm">VENTA</span>
                <span className="font-semibold">
                  ${" "}
                  {dolarOficial?.venta.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            {/* <div className="flex justify-between text-[10px] mb-0.5">
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
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
