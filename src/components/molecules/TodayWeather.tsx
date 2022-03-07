import React, { memo, useCallback, VFC } from "react";

type PROPS = {
  todayTemp: number | undefined;
  todayIcon: string | undefined;
  todayHumi: number | undefined;
};

export const TodayWeather: VFC<PROPS> = memo((props) => {
  const getRound = useCallback((num: number | undefined) => {
    if (num) {
      let n = 1;
      let roundDegree = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
      return roundDegree;
    } else {
      return;
    }
  }, []);

  return (
    <div className="mb-12 flex items-center justify-around">
      <img
        className="w-24 h-24"
        src={"http://openweathermap.org/img/wn/" + props.todayIcon + "@2x.png"}
        alt=""
      />
      <div className="text-center font-bold w-48">
        <p className="text-xl mb-2">気温：{getRound(props.todayTemp)}℃</p>
        <p className="text-xl">湿度：{props.todayHumi}%</p>
      </div>
    </div>
  );
});
