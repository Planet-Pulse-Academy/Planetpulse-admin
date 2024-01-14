
import { Fragment, useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Lottie from "react-lottie";
import empty from "assets/json/empty";
import CompanyCard from "components/card/CompanyCard";
const Company = () => {
  const [data, setData] = useState({
    loading: false,
    error: false,
    data: [
      {
        title: "EnterKomputer",
        image:
          "https://enterkomputer.com/web-assets/frontend/icon/aboutus/Info-Enterkomputer_Logo.png",
        desc: "Lorem ipsum dolor",
       
      },
      {
        title: "Logitech",
        image:
          "https://enterkomputer.com/web-assets/frontend/icon/aboutus/Info-Enterkomputer_Logo.png",
        desc: "Lorem ipsum dolor",
        
      },
      {
        title: "Fantech",
        image:
          "https://enterkomputer.com/web-assets/frontend/icon/aboutus/Info-Enterkomputer_Logo.png",
        desc: "Lorem ipsum dolor",
        
      },
      {
        title: "Samsung ",
        image:
          "https://enterkomputer.com/web-assets/frontend/icon/aboutus/Info-Enterkomputer_Logo.png",
        desc: "Lorem ipsum dolor",
        
      },
    ],
  });
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    " Oktober",
    "November",
    "Desember",
  ];
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  function closeModalCreate() {
    setIsOpenCreate(false);
  }
  function openModalCreate() {
    setIsOpenCreate(true);
  }

  return (
    <div className="mt-3">
      {data.loading ? (
        <div className="flex h-96 w-full items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin text-5xl text-blueSecondary" />
        </div>
      ) : data.data.length === 0 ? (
        <div className="flex h-96 w-full items-center justify-center">
          <Lottie options={{ animationData: empty }} />
        </div>
      ) : (
        <div className="grid h-full grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {data.data?.map((data, i) => {
            const date = new Date(data.createdAt);
            return (
              <CompanyCard
                key={i}
                id={data.id}
                slug={data.slug}
                title={data.title}
                image={data.image}
                alt={data.nama_album}
                desc={data.desc}
               
                created={`${date.getDate()} ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Company;
