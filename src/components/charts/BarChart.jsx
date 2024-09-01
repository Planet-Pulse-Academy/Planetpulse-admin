import React from "react";
import Chart from "react-apexcharts";

export default function BarChart(props) {
  const { series, options } = props;

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height="100%"
    />
  );
}
