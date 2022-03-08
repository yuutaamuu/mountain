import { useCallback } from "react";

export const useRound = () => {
  //   const [roundNum, setRoundNum] = useState(0);

  const getRoundNum = useCallback((num: number) => {
    let n = 1;
    let roundDegree = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
    return roundDegree;
  }, []);

  return { getRoundNum };
};
