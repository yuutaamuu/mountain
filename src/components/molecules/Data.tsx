import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useModalData } from "../../hooks/useModalData";
import { Card } from "./Card";
import { Modal } from "./Modal";
import { Search } from "./Search";

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
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [input, setInput] = useState("");
  const [dataShow, setDataShow] = useState(false);
  const [searchResult, setSearchResult] = useState<MOUNTAIN[]>([]);
  const { singleMountain, loading, getMountainData } = useModalData(0);

  const getMountainDatas = useCallback(async () => {
    await axios
      .get<MOUNTAINS>("https://mountix.codemountains.org/api/v1/mountains")
      .then((res) => setMountains(res.data.mountains))
      .catch((err) => console.log(err));
  }, []);

  const onClickGetSingleData = useCallback((id: number) => {
    getMountainData(id);
    setOpen(true);
  }, []);

  const onClickCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const getSortData = () => {
    const fil = mountains.filter((mountain) => mountain.name.includes(input));
    setSearchResult(fil);
  };

  const onClickSearch = () => {
    setSearchResult([]);
    getSortData();
    setInput("");
    setDataShow(true);
  };

  useEffect(() => {
    getMountainDatas();
  }, []);

  console.log(searchResult);

  return (
    <div>
      <div className="flex items-center justify-center w-11/12 md:w-1/2 mx-auto">
        <Search
          onChangeSearch={onChangeSearch}
          onClickSearch={onClickSearch}
          input={input}
        />
        <button
          className="cursor bg-blue-500 border border-blue-500 box-content text-sm hover:bg-blue-700 text-white font-bold px-4  rounded-l-none rounded-r-md w-1/6 h-12"
          onClick={onClickSearch}
        >
          表示
        </button>
      </div>
      <div className="md:flex md:flex-wrap md:w-full md:mx-auto md:justify-between">
        {dataShow &&
          searchResult.map((mountain) => (
            <Card
              key={mountain.id}
              mountain={mountain}
              id={mountain.id}
              onClickGetSingleData={onClickGetSingleData}
            />
          ))}
        {/* {mountains.map((mountain) => (
          <Card
            key={mountain.id}
            mountain={mountain}
            id={mountain.id}
            onClickGetSingleData={onClickGetSingleData}
          />
        ))} */}
      </div>

      {!dataShow && (
        <div className="h-screen w-screen flex justify-center items-center -mt-24">
          <img
            className="w-11/12 md:w-1/2"
            src="https://yu-tam.com/wp-content/uploads/2022/03/red-mountain-1.png"
            alt=""
          />
        </div>
      )}

      {open && (
        <Modal
          singleMountain={singleMountain}
          onClickCloseModal={onClickCloseModal}
          loading={loading}
        />
      )}
    </div>
  );
});
