import { Menu, Transition } from "@headlessui/react";
import api_service from "api/api_service";
import NewsCard from "components/card/NewsCard";
import { Add, ArrowDown2 } from "iconsax-react";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import empty from "assets/json/empty";
import Lottie from "react-lottie";

const Berita = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ loading: false, error: false, data: [] });
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
  const [selectedFilter, setSelecterFilter] = useState("terbaru");
  const filter = ["terbaru", "terlama"];
  const getData = async (sort) => {
    try {
      setData({ loading: true, error: false, data: [] });
      const res = await api_service.get(`/berita?sort=${sort}`);
      setData({ loading: false, error: false, data: res.data });
    } catch (er) {
      setData({ loading: false, error: true, data: [] });
      console.log(er);
    }
  };
  useEffect(() => {
    getData(selectedFilter);
  }, [selectedFilter]);
  return (
    <div className="mt-3">
      <div className="mb-7 flex justify-end space-x-7">
        <button
          onClick={() => {
            navigate("create");
          }}
          className="flex items-center space-x-1 rounded-full bg-brand-700 px-4 py-2 text-white drop-shadow-md hover:bg-white hover:text-brand-700 dark:bg-brand-400 dark:hover:bg-white dark:hover:text-brand-400"
        >
          <Add />
          <p>Create</p>
        </button>
        <Filter
          filter={filter}
          selectedFilter={selectedFilter}
          setSelecterFilter={setSelecterFilter}
        />
      </div>
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
              <NewsCard
                key={i}
                slug={data.slug}
                getData={getData}
                title={data.judul}
                author={data.author.username}
                image={data.thumbnail}
                alt={data.judul}
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

export default Berita;

function Filter({ filter, selectedFilter, setSelecterFilter }) {
  return (
    <Menu as="div" className="relative z-30 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium capitalize drop-shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {selectedFilter}
          <ArrowDown2 className="text-violet-200 hover:text-violet-100 ml-2 -mr-1 h-5 w-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="ring-black absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {filter.map((data, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <button
                    onClick={() => setSelecterFilter(data)}
                    className={`${
                      active ? "bg-violet-500 " : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                  >
                    {data}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
