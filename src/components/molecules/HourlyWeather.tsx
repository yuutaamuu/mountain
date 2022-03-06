import React, { memo, useCallback, VFC } from "react";
import hourly from "../../hourly.json";

type HOURLY = typeof hourly;

type PROPS = {
  hour: HOURLY;
};

export const HourlyWeather: VFC<PROPS> = memo((props) => {
  const { hour } = props;

  const getRound = useCallback((num: number) => {
    let n = 1;
    let roundDegree = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
    return roundDegree;
  }, []);

  const getHour = useCallback((num: number) => {
    let dateHourly = new Date(num * 1000);
    let h = dateHourly.getHours();
    let m = dateHourly.getMinutes();
    let day = `${h}:0${m}`;
    return day;
  }, []);

  return (
    <>
      <li className="w-40 px-4 flex flex-col border-r items-center">
        <p className="h-6">{getHour(hour.dt)}</p>
        <img
          className="w-8 h-8"
          src={
            "http://openweathermap.org/img/w/" + hour.weather[0].icon + ".png"
          }
          alt=""
        />
        <p className="h-6">{getRound(hour.temp)}</p>
        <p className="h-6">{getRound(hour.wind_speed)}</p>
      </li>
    </>
  );
});
