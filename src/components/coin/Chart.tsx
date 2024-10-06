// https://apexcharts.com/
// https://www.npmjs.com/package/apexcharts

import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: string;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

export default function Chart() {
  const { coinId } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["fetchHistory", coinId],
    () => fetchCoinHistory(coinId)
  );
  data?.slice(0, 10).map((x) => {
    console.log(x.close);
  });
  const series = [
    {
      name: "Desktops",
      // data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      data: data?.slice(0, 10).map((x) => Number(x.close)) || [],
    },
  ];

  data?.map((x) => console.log(typeof Number(x.close)));

  const options = {};

  return (
    <>
      {isLoading ? (
        ".."
      ) : (
        <ApexChart type="line" series={series} options={options} />
      )}
    </>
  );
}
