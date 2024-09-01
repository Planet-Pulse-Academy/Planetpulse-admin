import api_service from "api/api_service";
import Card from "components/card";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdBarChart } from "react-icons/md";
import Chart from "react-apexcharts";

export default function ActiveClient() {
  const [traffic, setTraffic] = React.useState({
    loading: false,
    error: false,
    data: [],
    page: 1,
    maxPage: 1,
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(30);

  // Define the dates for grouping
  const datesToShow = ["2024-08-26", "2024-08-29"];

  async function getTraffic(page = 1) {
    try {
      setTraffic({ ...traffic, loading: true });
      const res = await api_service.get(
        `/admin/logs/chart?page=${page}&limit=${itemsPerPage}`
      );
      setTraffic({
        loading: false,
        error: false,
        data: res.activeClients,
        page: res.page,
        maxPage: res.maxPage,
      });
    } catch (er) {
      console.error(er);
      setTraffic({
        loading: false,
        error: true,
        data: [],
        page: 1,
        maxPage: 1,
      });
    }
  }

  React.useEffect(() => {
    getTraffic(currentPage);
  }, [currentPage]);

  // Prepare data for charts
  const chartOption = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: [], 
    colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0", "#008FFB"],
    legend: { show: true },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.globals.series[opts.seriesIndex];
      },
    },
    tooltip: {
      enabled: true,
      style: { fontSize: "12px" },
      theme: "dark",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },
  };


  const dataForDate = (date) => {
    const series = [];
    const labels = [];
    
    traffic.data.forEach((entry) => {
      if (entry._id === date) {
        entry.clients.forEach((client) => {
          labels.push(`${client.ip || "Unknown IP"} (${client.machineId})`);
          series.push(client.activityCount);
        });
      }
    });

    return { series, labels };
  };

  const { series: seriesDate20240829, labels: labelsDate20240829 } = dataForDate("2024-08-29");
  const { series: seriesDate20240826, labels: labelsDate20240826 } = dataForDate("2024-08-26");

  const chartOptionDate20240829 = { ...chartOption, labels: labelsDate20240829 };
  const chartOptionDate20240826 = { ...chartOption, labels: labelsDate20240826 };

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  return (
    <Card extra="!p-[30px] text-center !w-full !h-[600px]">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-navy-700 dark:text-white">
          Active Clients
        </h1>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>
      <div className="flex h-full w-full flex-col gap-8 sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-[250px] w-full">
          {traffic.loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin text-5xl text-blueSecondary" />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Active Clients on 2024-08-29</h2>
                <Chart options={chartOptionDate20240829} series={seriesDate20240829} type="donut" />
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Active Clients on 2024-08-26</h2>
                <Chart options={chartOptionDate20240826} series={seriesDate20240826} type="donut" />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        {datesToShow.includes("2024-08-26") && (
          <select
            className="rounded-md border border-gray-300 p-2"
            value={currentPage}
            onChange={handlePageChange}
          >
            {Array.from({ length: traffic.maxPage }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Page {index + 1}
              </option>
            ))}
          </select>
        )}
      </div>
    </Card>
  );
}
