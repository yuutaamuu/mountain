import axios from "axios";
import { memo, useCallback, useState } from "react";

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

type getData = (id: number) => void;

type UseCount = {
  singleMountain: MOUNTAIN | undefined;
  getMountainData: getData;
};

export const useModalData = (id: number): UseCount => {
  const [singleMountain, setSingleMountain] = useState<MOUNTAIN>();

  const getMountainData = useCallback(async (id: number) => {
    await axios
      .get<MOUNTAIN>(`https://mountix.codemountains.org/api/v1/mountains/${id}`)
      .then((res) => setSingleMountain(res.data))
      .catch((err) => console.log(err));
  }, []);

  return { singleMountain, getMountainData };
};
