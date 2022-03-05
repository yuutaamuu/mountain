import React, { memo, useCallback, VFC } from "react";
import daily from "../../daily.json";

type DAILY = typeof daily;

type PROPS = {
  date: DAILY;
};

export const DailyWeather: VFC<PROPS> = memo((props) => {
  const { date } = props;

  const changeDate = useCallback((num: number) => {
    let dateDaily = new Date(num * 1000);
    let day = dateDaily.toLocaleDateString("ja-JP").slice(5);
    return day;
  }, []);

  const getRound = useCallback((num: number) => {
    let n = 1;
    let roundDegree = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
    return roundDegree;
  }, []);

  return (
    <>
      <li className="flex mb-1 border-b">
        <div className="flex items-center">
          <span className="block w-8">{changeDate(date.dt)}</span>
          <img
            className="w-8 h-8 ml-4"
            src={
              "http://openweathermap.org/img/w/" + date.weather[0].icon + ".png"
            }
            alt=""
          />
        </div>
        <p className="ml-auto flex items-center text-right">
          <span className="text-red-400 text-sm mr-4 w-12 block">
            {getRound(date.temp.max)}℃
          </span>
          <span className="text-blue-400 text-sm mr-4 w-12 block">
            {getRound(date.temp.min)}℃
          </span>
          <span className="text-sm w-10 block">
            {getRound(date.pop) * 100}%
          </span>
        </p>
        {/* {date.weather[0].icon} */}
      </li>
    </>
  );
});
