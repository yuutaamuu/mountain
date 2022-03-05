import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useModalData } from "../../hooks/useModalData";
import { Card } from "./Card";
import { Modal } from "./Modal";

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
  const { singleMountain, getMountainData } = useModalData(0);

  const getMountainDatas = useCallback(async () => {
    await axios
      .get<MOUNTAINS>("https://mountix.codemountains.org/api/v1/mountains")
      .then((res) => setMountains(res.data.mountains))
      .catch((err) => console.log(err));
  }, []);

  const onClickGetSingleData = (id: number) => {
    getMountainData(id);
    setOpen(!open);
  };

  const onClickCloseModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getMountainDatas();
  }, []);

  return (
    <div>
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
