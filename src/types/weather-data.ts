export interface WeatherData {
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
}
