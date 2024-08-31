import axios from "axios";
import { WeatherData } from "../types/weather-data";

// TODO: Replace this hardcoded API key with an environment variable in production.
const API_KEY = "0bdbc7569e543292f5908aaa432422cf";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("City not found");
      } else if (error.response?.status === 401) {
        throw new Error("Invalid API key");
      } else {
        throw new Error("Failed to fetch weather data");
      }
    }
    throw new Error("An unknown error occurred");
  }
};
