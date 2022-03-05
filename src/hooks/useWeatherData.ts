import axios from "axios";
import React, { memo, useCallback, useState } from "react";
import weather from "../weather.json";

type WEATHER = typeof weather;

type getData = (id: number) => void;

type UseCount = {
  weatherData: WEATHER | undefined;
  getWeatherData: getData;
};

export const useWeatherData = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [weatherData, setWeatherData] = useState<WEATHER | undefined>();

  const getWeatherData = useCallback(
    (lat: number | undefined, lon: number | undefined) => {
      axios
        .get<WEATHER>(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
        .then((res) => {
          console.log(res.data);
          setWeatherData(res.data);
        })
        .catch((err) => console.log(err));
    },
    []
  );

  return { weatherData, setWeatherData, getWeatherData };
};
