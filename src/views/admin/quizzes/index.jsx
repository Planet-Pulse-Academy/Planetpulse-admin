import React from "react";
import DevelopmentTable from "./components/ComponentTable";
import { columnsDataDevelopment } from "./variables/columnsData";

export default function Transaction() {
  const [data, setData] = React.useState({
    loading: false,
    error: false,
    data: [
      {
        id: "122192122",
        tgl: "12 September 2023",
        product: "Jam Tangan",
        payment: "Mandiri Livin",
        status: "On Progress",
      },
      {
        id: "122192122",
        tgl: "12 September 2023",
        product: "Jam Tangan",
        payment: "Mandiri Livin",
        status: "On Progress",
      },
      {
        id: "122192122",
        tgl: "12 September 2023",
        product: "Jam Tangan",
        payment: "Mandiri Livin",
        status: "On Progress",
      },
      {
        id: "122192122",
        tgl: "12 September 2023",
        product: "Jam Tangan",
        payment: "Mandiri Livin",
        status: "On Progress",
      },
    ],
  });
  return (
    <div className="mt-5 h-full">
      <DevelopmentTable header={columnsDataDevelopment} data={data} />
    </div>
  );
}
