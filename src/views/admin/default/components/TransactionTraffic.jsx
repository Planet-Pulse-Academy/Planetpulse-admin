import BarChart from "components/charts/BarChart";
import Card from "components/card";
import { useEffect, useState } from "react";
import api_service from "api/api_service";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TransactionsTraffic = () => {
  const [desa, setDesa] = useState({ loading: false, error: false, data: [] });
  async function getData() {
    try {
      setDesa({ loading: true, error: false, data: [] });
      const res = await api_service.get("/traffic/total-pendaftar");
      setDesa({ loading: false, error: false, data: res.data });
    } catch (er) {
      setDesa({ loading: false, error: true, data: [] });
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <h1 className="text-xl font-bold text-navy-700 dark:text-white">
            Transaction
          </h1>
        </div>
      </div>

      <div className="h-[300px] w-full pt-10 pb-0">
        {desa.loading ? (
          <div className="flex justify-center items-center h-full">
            <AiOutlineLoading3Quarters className="animate-spin text-5xl text-blueSecondary" />
          </div>
        ) : (
          <BarChart
            chartData={[
              {
                name: "Total Pendaftar",
                data: desa.data?.map((v) => v[Object.keys(v)[0]]),
              },
            ]}
            chartOptions={{
              chart: {
                toolbar: {
                  show: false,
                },
              },
              tooltip: {
                style: {
                  fontSize: "12px",
                  fontFamily: undefined,
                  backgroundColor: "#000000",
                },
                onDatasetHover: {
                  style: {
                    fontSize: "12px",
                    fontFamily: undefined,
                  },
                },
                theme: "dark",
              },
              xaxis: {
                categories: desa.data?.map((v) => Object.keys(v)[0]),
                show: false,
                labels: {
                  show: true,
                  style: {
                    colors: "#A3AED0",
                    fontSize: "14px",
                    fontWeight: "500",
                  },
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
              },
              yaxis: {
                show: false,
                color: "black",
                labels: {
                  show: true,
                  style: {
                    colors: "#CBD5E0",
                    fontSize: "14px",
                  },
                },
              },
              grid: {
                show: false,
                strokeDashArray: 5,
                yaxis: {
                  lines: {
                    show: true,
                  },
                },
                xaxis: {
                  lines: {
                    show: false,
                  },
                },
              },
              fill: {
                type: "gradient",
                gradient: {
                  type: "vertical",
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.9,
                  colorStops: [
                    [
                      {
                        offset: 0,
                        color: "#4318FF",
                        opacity: 1,
                      },
                      {
                        offset: 100,
                        color: "rgba(67, 24, 255, 1)",
                        opacity: 0.28,
                      },
                    ],
                  ],
                },
              },
              dataLabels: {
                enabled: false,
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  columnWidth: "40px",
                },
              },
            }}
          />
        )}
      </div>
    </Card>
  );
};

export default TransactionsTraffic;
