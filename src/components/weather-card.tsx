import React from "react";
import { Card, CardContent, Typography, Box, Grid2 } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterIcon from "@mui/icons-material/Water";
import WindPowerIcon from "@mui/icons-material/WindPower";
import { WeatherData } from "../types/weather-data";

interface WeatherCardProps {
  data: WeatherData;
}

const getWeatherIcon = (description: string) => {
  switch (description.toLowerCase()) {
    case "clear sky":
      return <WbSunnyIcon fontSize="large" />;
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
      return <CloudIcon fontSize="large" />;
    case "rain":
    case "shower rain":
      return <GrainIcon fontSize="large" />;
    case "snow":
      return <AcUnitIcon fontSize="large" />;
    default:
      return <CloudIcon fontSize="large" />;
  }
};

const getBackgroundColor = (description: string) => {
  switch (description.toLowerCase()) {
    case "clear sky":
      return "linear-gradient(to right, #E57E7E, #DED47F)";
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
      return "linear-gradient(to right, #905AD4, #3330A5)";
    case "rain":
    case "shower rain":
      return "linear-gradient(to right, #4e54c8, #8f94fb)";
    case "snow":
      return "linear-gradient(to right, #605ad4, #3072a5)";
    default:
      return "linear-gradient(to right, #6CCDB0, #3278B9)";
  }
};

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const weatherDescription = data.weather[0].description;
  const weatherIcon = getWeatherIcon(weatherDescription);
  const backgroundColor = getBackgroundColor(weatherDescription);

  return (
    <Card
      sx={{
        marginTop: 4,
        padding: 2,
        background: backgroundColor,
        color: "#fff",
        borderRadius: "15px",
      }}
    >
      <CardContent>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2
            display="flex"
            gap={3}
            sx={{
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            <Grid2 display="flex" alignItems="center">
              {weatherIcon}
            </Grid2>
            <Grid2
              paddingRight={2}
              marginRight={2}
              sx={{
                borderRight: {
                  xs: "none",
                  md: 'solid 1px #c4c4c4'
                },
              }}
            >
              <Typography variant="h1" component="div" lineHeight={1}>
                {Math.round(data.main.temp)}
                <sup>°</sup>
              </Typography>
              <Typography
                variant="h4"
                component="div"
                lineHeight={1}
                sx={{ textAlign: { xs: "left" } }}
              >
                {data.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ textAlign: { xs: "left" }, textTransform: 'capitalize' }}
              >
                {weatherDescription}
              </Typography>
            </Grid2>
            <Grid2
              display="flex"
              flexDirection="column"
              justifyContent="center"
              textAlign={"left"}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <WaterIcon sx={{ color: "#fff" }} fontSize="large" />
                <Typography variant="body1" lineHeight={1}>
                  Humidity
                </Typography>
              </Box>
              <Typography variant="h4" lineHeight={1}>
                {data.main.humidity}%
              </Typography>
            </Grid2>
            <Grid2
              display="flex"
              flexDirection="column"
              justifyContent="center"
              textAlign={"left"}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <WindPowerIcon sx={{ color: "#fff" }} fontSize="large" />
                <Typography variant="body1" lineHeight={1}>
                  Wind Speed
                </Typography>
              </Box>
              <Typography variant="h4" lineHeight={1}>
                {data.wind.speed} <sup>m/s</sup>
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
