import React from "react";
import DevelopmentTable from "./components/ComponentTable";
import { columnsDataDevelopment } from "./variables/columnsData";
import api_service from "api/api_service";
import UserActivity from "./components/UserActivity";
import SyntaxActivity from "./components/SyntaxActivity";
import StateActivity from "./components/StateActivity";
import ActiveClient from "./components/ActiveClient";

export default function Logs() {
  const [data, setData] = React.useState({
    loading: false,
    error: false,
    data: [],
    max: null,
  });
  const getData = async (page, key, limit = 10) => {
    try {
      setData({ ...data, loading: true });
      const res = await api_service.get(
        `/admin/logs${
          page !== undefined
            ? `?page=${page}&limit=${limit}`
            : `?limit=${limit}`
        }${
          key !== undefined ? `&key=${key}&limit=${limit}` : `?limit=${limit}`
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
      <div className="grid grid-cols-3 gap-x-5 pb-5">
        <UserActivity />
        <StateActivity/>
        <ActiveClient/>
      </div>
      <SyntaxActivity />

      <div className="py-5">
      <DevelopmentTable
        header={columnsDataDevelopment}
        getData={getData}
        data={data}
      />
      </div>
    </div>
  );
}
