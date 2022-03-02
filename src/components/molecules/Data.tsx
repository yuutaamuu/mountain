import axios from "axios";
import React, { memo, useEffect, useState } from "react";

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
  mountains: MOUNTAIN[];
};

export const Data = memo(() => {
  const [mountains, setMountains] = useState<MOUNTAIN[]>([]);
  const [today, setToday] = useState("");
  const [open, setOpen] = useState(false);

  const getMountainData = () => {
    axios
      .get<MOUNTAINS>("https://mountix.codemountains.org/api/v1/mountains")
      .then((res) => setMountains(res.data.mountains))
      .catch((err) => console.log(err));
  };

  const getToday = () => {
    let newToday = new Date();
    let month = newToday.getMonth() + 1;
    let day = newToday.getDate();
    let todayDate = `${month}月${day}日`;
    setToday(todayDate);
  };

  useEffect(() => {
    getMountainData();
    getToday();
  }, []);

  return (
    <div>
      <div>
        <div className="w-11/12 border mx-auto rounded-xl shadow-2xl mb-8">
          <p className="text-center pt-4 text-xl flex flex-col">
            <span className="font-bold">今日</span>
            {today}
          </p>
          <img
            className="w-36 h-36 rounded-full mx-auto my-8"
            src="https://source.unsplash.com/random"
            alt=""
          />
          <div className="text-xl flex justify-evenly">
            <p className="text-red-400">
              20°
              <span className="text-sm">[-3]</span>
            </p>
            <p className="text-blue-400">
              10°
              <span className="text-sm">[-2]</span>
            </p>
          </div>
          <div className="p-4">
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
              <p className="text-gray-500 text-sm">
                {mountains[0].prefectures}
              </p>
            </div>

            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold mr-4">{mountains[0].name}</h2>
              <p className="text-gray-400">{mountains[0].elevation}m</p>
            </div>
            <button
              className="block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              data-modal-toggle="defaultModal"
              onClick={() => {
                setOpen(!open);
              }}
            >
              詳細へ
            </button>
          </div>
        </div>

        <div className="w-11/12 border mx-auto rounded-xl shadow-2xl">
          <p className="text-center pt-4 text-xl flex flex-col">
            <span className="font-bold">今日</span>
            {today}
          </p>
          <img
            className="w-36 h-36 rounded-full mx-auto my-8"
            src="https://source.unsplash.com/random"
            alt=""
          />
          <div className="text-xl flex justify-evenly">
            <p className="text-red-400">
              20°
              <span className="text-sm">[-3]</span>
            </p>
            <p className="text-blue-400">
              10°
              <span className="text-sm">[-2]</span>
            </p>
          </div>
          <div className="p-4">
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
              <p className="text-gray-500 text-sm">
                {mountains[1].prefectures}
              </p>
            </div>

            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold mr-4">{mountains[1].name}</h2>
              <p className="text-gray-400">{mountains[1].elevation}m</p>
            </div>
            <button
              className="block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              data-modal-toggle="defaultModal"
              onClick={() => {
                setOpen(!open);
              }}
            >
              詳細へ
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="defaultModal"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 bottom-0 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-gray-600 bg-opacity-50"
        >
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto flex items-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                  Terms of Service
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  With less than a month to go before the European Union enacts
                  new consumer privacy laws for its citizens, companies around
                  the world are updating their terms of service agreements to
                  comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  The European Union’s General Data Protection Regulation
                  (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                  common set of data rights in the European Union. It requires
                  organizations to notify users as soon as possible of high-risk
                  data breaches that could personally affect them.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <ul className="text-center">
        {mountains.map((mountain) => (
          <li key={mountain.id}>
            {mountain.name}({mountain.elevation}m)
          </li>
        ))}
      </ul> */}
    </div>
  );
});
