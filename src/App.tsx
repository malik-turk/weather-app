import React, { useState } from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SearchInput from "./components/search-input";
import WeatherCard from "./components/weather-card";
import { fetchWeatherData } from "./services/weather.service";
import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "./types/weather-data";

const App: React.FC = () => {
  const [city, setCity] = useState<string | null>(null);

  const {
    data: weatherData,
    error,
    isLoading,
    isError,
  } = useQuery<WeatherData, Error>({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherData(city as string),
    enabled: !!city,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const handleSearch = (city: string) => {
    setCity(city);
  };

  return (
    <Container>
      <SearchInput isDisabled={isLoading} onSearch={handleSearch} />
      {isLoading && <CircularProgress />}
      {weatherData && <WeatherCard data={weatherData} />}
      <Snackbar open={isError} autoHideDuration={6000}>
        <Alert severity="error">{error?.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
