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
  loading: boolean;
  onClickCloseModal: () => void;
};

export const Modal: VFC<PROP> = memo((props) => {
  const { weatherData, getWeatherData } = useWeatherData();

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
        <div className="relative p-4 w-full max-w-2xl h-full flex items-center md:mx-auto">
          <div className="relative overflow-auto bg-white w-full h-full my-8 rounded-lg shadow">
            <div className="flex justify-between items-center p-6 rounded-t border-b">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                {props.singleMountain?.name}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
              <h4 className="text-xl font-bold mb-2">???????????????</h4>
              {props.loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              ) : (
                <TodayWeather
                  todayTemp={weatherData?.current.temp}
                  todayIcon={weatherData?.current.weather[0].icon}
                  todayHumi={weatherData?.current.humidity}
                />
              )}

              <h4 className="text-xl font-bold mb-2">48????????????</h4>
              <div className="flex mb-2">
                <div className="w-20 pr-2 bg-white flex flex-col items-center text-center">
                  <p className="text-sm w-8 h-6 flex justify-center items-center">
                    ??????
                  </p>
                  <div className="w-8 h-8"></div>
                  <p className="text-sm w-8 h-6 flex justify-center items-center">
                    ??????
                  </p>
                  <p className="text-sm w-8 h-6 flex justify-center items-center">
                    ??????
                  </p>
                </div>

                <ul className="flex overflow-auto pb-2">
                  {weatherData?.hourly.map((hour, index) => (
                    <HourlyWeather hour={hour} key={index} />
                  ))}
                </ul>
              </div>
              <div className="pb-2 mb-12">
                <h5 className="text-md font-bold">????????????</h5>
                <p className="text-sm">
                  1???10...?????????11???20...?????????20???...???????????????
                </p>
              </div>

              <h4 className="text-xl font-bold mb-2">??????????????????</h4>
              <ul className="lg:flex lg:flex-wrap lg:justify-around">
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
