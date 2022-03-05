import React, { memo, useCallback, useEffect, useState, VFC } from "react";

type MOUNTAIN = {
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

type MOUNTAINS = {
  mountain: MOUNTAIN;
  id: number;
  onClickGetSingleData: (id: number) => void;
};

export const Card: VFC<MOUNTAINS> = memo((props) => {
  const { mountain, id, onClickGetSingleData } = props;
  const [today, setToday] = useState("");

  const getToday = useCallback(() => {
    let newToday = new Date();
    let month = newToday.getMonth() + 1;
    let day = newToday.getDate();
    let todayDate = `${month}月${day}日`;
    setToday(todayDate);
  }, []);

  useEffect(() => {
    getToday();
  }, []);

  return (
    <>
      <div className="w-11/12 border mx-auto rounded-xl shadow-2xl my-8 p-8">
        <p className="text-center text-xl flex justify-center mb-4">
          <span className="font-bold mr-2">今日</span>
          {today}
        </p>

        <img
          className="w-20 h-20 rounded-full mx-auto mb-4"
          src="https://source.unsplash.com/random"
          alt=""
        />
        <p className="text-center text-xl mb-4">晴れ</p>
        <div className="text-2xl flex justify-center mb-4">
          <p className="text-red-400 mr-2">
            20°
            <span className="text-sm">[-3]</span>
          </p>
          <p className="text-blue-400 ml-2">
            10°
            <span className="text-sm">[-2]</span>
          </p>
        </div>
        <div>
          <div className="flex items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#d1d5db"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 2c3.86 0 7 3.14 7 7 0 5.25-7 13-7 13S5 14.25 5 9c0-3.86 3.14-7 7-7zm-1.53 12L17 7.41 15.6 6l-5.13 5.18L8.4 9.09 7 10.5l3.47 3.5z" />
            </svg>
            <p className="text-gray-500 text-sm">{mountain.prefectures}</p>
          </div>

          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl font-bold mr-4">{mountain.name}</h2>
            <p className="text-gray-400">{mountain.elevation}m</p>
          </div>
          <button
            className="block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            data-modal-toggle="defaultModal"
            onClick={() => {
              onClickGetSingleData(id);
            }}
          >
            詳しくみる
          </button>
        </div>
      </div>
    </>
  );
});
