import React from "react";
import DevelopmentTable from "./components/ComponentTable";
import { columnsDataDevelopment } from "./variables/columnsData";
import api_service from "api/api_service";

export default function Questions() {
  const [data, setData] = React.useState({
    loading: false,
    error: false,
    data: [],
    max: null,
  });

  const getData = async (page, key, limit) => {
    try {
      setData({ ...data, loading: true });
      const res = await api_service.get(
        `/admin/question${page !== undefined ? `?page=${page}` : ""}${
          key !== undefined ? `&key=${key}` : ""
        }`
      );
      setData({ ...data, data: res.data, loading: false, max: res.maxPage });
    } catch (error) {
      setData({ ...data, error: true, loading: false });
      console.log(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="mt-5 h-full">
      <DevelopmentTable
        header={columnsDataDevelopment}
        getData={getData}
        data={data}
      />
    </div>
  );
}
