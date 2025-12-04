declare module "react-open-weather" {
  export interface WeatherData {
    coord?: {
      lon: number;
      lat: number;
    };
    weather?: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    base?: string;
    main?: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility?: number;
    wind?: {
      speed: number;
      deg: number;
    };
    clouds?: {
      all: number;
    };
    dt?: number;
    sys?: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone?: number;
    id?: number;
    name?: string;
    cod?: number;
  }

  export interface UseOpenWeatherOptions {
    key: string;
    lat: string;
    lon: string;
    lang: string;
    unit: "metric" | "imperial" | "standard";
  }

  export interface UseOpenWeatherResult {
    data: WeatherData | null;
    isLoading: boolean;
    errorMessage: string | null;
  }

  export function useOpenWeather(
    options: UseOpenWeatherOptions
  ): UseOpenWeatherResult;

  export interface ReactWeatherProps {
    isLoading: boolean;
    errorMessage: string | null;
    data: WeatherData | null;
    lang: string;
    locationLabel: string;
    unitsLabels?: {
      temperature: string;
      windSpeed: string;
    };
    showForecast?: boolean;
  }

  export default function ReactWeather(props: ReactWeatherProps): JSX.Element;
}
