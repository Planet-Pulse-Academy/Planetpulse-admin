import TotalPengunjung from "views/admin/default/components/TotalPengunjung";
import Widget from "components/widgets/index";
import { Document, House, People } from "iconsax-react";
import { useEffect, useState } from "react";
import api_service from "api/api_service";
import DesaTraffic from "./components/TransactionTraffic";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Card from "components/card";

const Dashboard = () => {
  const [totalPenduduk, setTotalPenduduk] = useState(0);
  const [totalBerita, setTotalBerita] = useState(0);
  const [totalDesa, setTotalDesa] = useState(0);
  const [totalPegawai, setTotalPegawai] = useState(0);

  const [loading, setLoading] = useState(true);

  async function getTotalPenduduk() {
    try {
      const res = await api_service.get("/admin/user");
      setTotalPenduduk(res.count);
    } catch (er) {
      setLoading(false);

      console.log(er);
    }
  }
  async function getTotalBerita() {
    try {
      const res = await api_service.get("/lesson");
      setTotalBerita(res.data.length);
    } catch (er) {
      setLoading(false);

      console.log(er);
    }
  }
  async function getTotalDesa() {
    try {
      const res = await api_service.get("/admin/question");
      setTotalDesa(res.data.length);
    } catch (er) {
      setLoading(false);

      console.log(er);
    }
  }
  async function getTotalPegawai() {
    try {
      const res = await api_service.get("/pegawai/total");
      setTotalPegawai(res.data);
    } catch (er) {
      setLoading(false);

      console.log(er);
    }
  }

  useEffect(() => {
    getTotalPenduduk();
    getTotalBerita();
    getTotalDesa();
    getTotalPegawai();
  }, []);

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        {loading ? (
          [1, 2, 3, 4].map((i, key) => (
            <Card
              key={key}
              extra="flex-grow animate-pulse !flex-row items-center rounded-[20px]"
            >
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center bg-brand-500 h-3 dark:text-white">
                    
                  </span>
                </div>
              </div>

              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium h-3 bg-gray-600">
                  
                </p>
                <h4 className="text-xl font-bold bg-navy-700 h-3 dark:text-white">
                  
                </h4>
              </div>
            </Card>
          ))
        ) : (
          <>
            <Widget
              icon={<People size="27" variant="Bulk" />}
              title={"Users"}
              subtitle={totalPenduduk}
            />
            <Widget
              icon={<Document size="27" variant="Bulk" />}
              title={"Lesson"}
              subtitle={totalBerita}
            />
            <Widget
              icon={<Document size="27" variant="Bulk" />}
              title={"Question"}
              subtitle={totalDesa}
            />
            <Widget
              icon={<People size="27" variant="Bulk" />}
              title={"Finished"}
              subtitle={totalPegawai}
            />
          </>
        )}
      </div>
      {/* <div className="mt-5">
        <DesaTraffic />
      </div> */}
      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalPengunjung />
      </div> */}
    </div>
  );
};

export default Dashboard;
