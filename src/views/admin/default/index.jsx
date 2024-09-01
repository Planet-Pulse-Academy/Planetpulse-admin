import TotalPengunjung from "views/admin/default/components/TotalPengunjung";
import Widget from "components/widgets/index";
import { Document, House, People } from "iconsax-react";
import { useEffect, useState } from "react";
import api_service from "api/api_service";
import DesaTraffic from "./components/TransactionTraffic";

const Dashboard = () => {
  const [totalPenduduk, setTotalPenduduk] = useState(0);
  const [totalBerita, setTotalBerita] = useState(0);
  const [totalDesa, setTotalDesa] = useState(0);
  const [totalPegawai, setTotalPegawai] = useState(0);

  async function getTotalPenduduk() {
    try {
      const res = await api_service.get("/admin/user");
      setTotalPenduduk(res.count);
    } catch (er) {
      console.log(er);
    }
  }
  async function getTotalBerita() {
    try {
      const res = await api_service.get("/lesson");
      setTotalBerita(res.data.length);
    } catch (er) {
      console.log(er);
    }
  }
  async function getTotalDesa() {
    try {
      const res = await api_service.get("/admin/question");
      setTotalDesa(res.data.length);
    } catch (er) {
      console.log(er);
    }
  }
  async function getTotalPegawai() {
    try {
      const res = await api_service.get("/pegawai/total");
      setTotalPegawai(res.data);
    } catch (er) {
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
