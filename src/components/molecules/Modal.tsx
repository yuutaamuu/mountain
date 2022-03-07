import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { useWeatherData } from "../../hooks/useWeatherData";
import { DailyWeather } from "./DailyWeather";
import { HourlyWeather } from "./HourlyWeather";
import { TodayWeather } from "./TodayWeather";

type PROPS = {
  id: number;
  name: string;
  nameKana: string;
  area: string;
  prefectures: string[];
  elevation: number;
  location: {
    latitude: number;
    longitude: number;
    gsiUrl: string;
  };
  tags: string[];
};

type PROP = {
  singleMountain: PROPS | undefined;
  onClickCloseModal: () => void;
};

export const Modal: VFC<PROP> = memo((props) => {
  const { weatherData, setWeatherData, getWeatherData } = useWeatherData();

  let lat = props.singleMountain?.location.latitude;
  let lon = props.singleMountain?.location.longitude;

  useEffect(() => {
    if (lat) {
      getWeatherData(lat, lon);
      //   getToday();
    }
  }, [lat, lon]);

  return (
    <>
      <div
        id="defaultModal"
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 bottom-0 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-gray-600 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto flex items-center">
          <div className="relative overflow-auto bg-white w-full h-full my-8 rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-center p-6 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                {props.singleMountain?.name}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
                onClick={props.onClickCloseModal}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="px-5 py-6 overflow-auto w-full">
              <h4 className="text-xl font-bold mb-2">現在の天気</h4>
              <TodayWeather
                todayTemp={weatherData?.current.temp}
                todayIcon={weatherData?.current.weather[0].icon}
                todayHumi={weatherData?.current.humidity}
              />
              <h4 className="text-xl font-bold mb-2">48時間予報</h4>
              <div className="flex mb-2">
                <div className="w-20 pr-2 bg-white flex flex-col items-center text-center">
                  <p className="text-sm w-8 h-6 flex justify-center items-center">
                    時間
                  </p>
                  <div className="w-8 h-8"></div>
                  <p className="text-sm w-8 h-6 flex justify-center items-center">
                    気温
                  </p>
                  <p className="text-sm w-8 h-6 flex justify-center items-center">
                    風速
                  </p>
                </div>

                <ul className="flex overflow-auto pb-2">
                  {weatherData?.hourly.map((hour, index) => (
                    <HourlyWeather hour={hour} key={index} />
                  ))}
                </ul>
              </div>
              <div className="pb-2 mb-12">
                <h5 className="text-md font-bold">風速目安</h5>
                <p className="text-sm">
                  1〜10...安全　11〜20...危険　20〜...非常に危険
                </p>
              </div>

              <h4 className="text-xl font-bold mb-2">週間天気予報</h4>
              <ul>
                {weatherData?.daily.map((date, index) => (
                  <DailyWeather date={date} key={index} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
