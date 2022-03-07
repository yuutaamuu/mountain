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
  const { singleMountain, getMountainData } = useModalData(0);

  const getMountainDatas = useCallback(async () => {
    await axios
      .get<MOUNTAINS>("https://mountix.codemountains.org/api/v1/mountains")
      .then((res) => setMountains(res.data.mountains))
      .catch((err) => console.log(err));
  }, []);

  const onClickGetSingleData = useCallback((id: number) => {
    getMountainData(id);
    setOpen(!open);
  }, []);

  const onClickCloseModal = useCallback(() => {
    setOpen(!open);
  }, []);

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  console.log(input);

  useEffect(() => {
    getMountainDatas();
  }, []);

  return (
    <div>
      <Search onChangeSearch={onChangeSearch} input={input} />
      <div>
        {mountains.map((mountain) => (
          <Card
            key={mountain.id}
            mountain={mountain}
            id={mountain.id}
            onClickGetSingleData={onClickGetSingleData}
          />
        ))}
      </div>

      {open && (
        <Modal
          singleMountain={singleMountain}
          onClickCloseModal={onClickCloseModal}
        />
      )}
    </div>
  );
});
