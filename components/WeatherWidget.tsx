"use client";
import ReactWeather, { useVisualCrossing } from "react-open-weather";

const customStyles = {
  fontFamily: "Arial, sans-serif",
  gradientStart: "#3b82f6",
  gradientMid: "#2563eb",
  gradientEnd: "#1d4ed8",
  locationFontColor: "#FFF",
  todayTempFontColor: "#FFF",
  todayDateFontColor: "#e0f2fe",
  todayRangeFontColor: "#e0f2fe",
  todayDescFontColor: "#e0f2fe",
  todayInfoFontColor: "#e0f2fe",
  todayIconColor: "#FFF",
  forecastBackgroundColor: "rgba(255, 255, 255, 0.1)",
  forecastSeparatorColor: "rgba(255, 255, 255, 0.2)",
  forecastDateColor: "#FFF",
  forecastDescColor: "#e0f2fe",
  forecastRangeColor: "#FFF",
  forecastIconColor: "#FFF",
};

export default function WeatherWidget() {
  const { data, isLoading, errorMessage } = useVisualCrossing({
    key: process.env.NEXT_PUBLIC_VISUALCROSSING_API_KEY || "",
    lat: "-33.39858754531226",
    lon: "-61.843514186505374",
    lang: "es",
    unit: "metric",
  });

  if (errorMessage) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">Error al cargar el clima</p>
          <p className="text-xs opacity-80">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full [&_.rw-box-days]:hidden">
      <ReactWeather
        theme={customStyles}
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="es"
        locationLabel="Gödeken"
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        // showForecast
      />
    </div>
  );
}
