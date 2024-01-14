import React, { useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import Card from "components/card";
// import { lineChartOptionsTotalSpent } from "variables/charts";
import LineChart from "components/charts/LineChart";
import api_service from "api/api_service";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Loading from "components/Loading";

const TotalPengunjung = () => {
  const [traffic, setTraffic] = useState({
    loading: false,
    error: false,
    data: [],
  });
  const months = [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ];
  const chartOption = {
    chart: { type: "line", toolbar: { show: false } },
    xaxis: {
      categories: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MEI",
        "JUN",
        "JUL",
        "AGT",
        "SEP",
        "OKT",
        "NOV",
        "DES",
      ],
      labels: {
        style: {
          color: "#A3AED0",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    dataLabels: { enabled: false },
    grid: { show: false },
    legend: { show: false },
    stroke: { curve: "smooth" },
    tooltip: { style: { fontSize: "12px" }, theme: "dark" },
  };
  async function getTraffic() {
    try {
      setTraffic({ loading: true, error: false, data: [] });
      const res = await api_service.get("/admin/log");
      setTraffic({ loading: false, error: false, data: res.data });
      console.log(
        traffic.data?.map((v) => ({
          dateLog: v.dateLog,
          month: months[new Date(v.dateLog).getMonth()],
        }))
      );
    } catch (er) {
      console.log(er);
      setTraffic({ loading: false, error: true, data: [] });
    }
  }

  useEffect(() => {
    getTraffic();
  }, []);
  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-navy-700 dark:text-white">
          Total Pengunjung
        </h1>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          {traffic.loading ? (
            <Loading extra={"h-7 w-20 rounded-full"} />
          ) : (
            <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
              {traffic.data?.length}
            </p>
          )}
        </div>
        <div className="h-full w-full">
          {traffic.loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin text-5xl text-blueSecondary" />
            </div>
          ) : (
            <LineChart
              options={chartOption}
              series={[
                {
                  name: "pengunjung",
                  data: traffic.data?.map((v) => v[months[new Date(v.dateLog).getMonth()]]),
                },
              ]}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default TotalPengunjung;
