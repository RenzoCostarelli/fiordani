"use client";
import ReactWeather, { useOpenWeather } from "react-open-weather";
import { useEffect } from "react";

export default function WeatherWidget() {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: process.env.OPENWEATHER_API || "",
    lat: "-34.6037",
    lon: "-58.3816",
    lang: "es",
    unit: "metric",
  });

  // useEffect(() => {
  //   console.log("Weather data:", data);
  //   console.log("Loading:", isLoading);
  //   console.log("Error:", errorMessage);
  // }, [data, isLoading, errorMessage]);

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
    <div className="w-full h-full">
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="es"
        locationLabel="Buenos Aires"
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
    </div>
  );
}
