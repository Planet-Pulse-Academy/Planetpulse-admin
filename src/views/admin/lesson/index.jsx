import { Dialog, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import api_service from "api/api_service";
import AlbumCard from "components/card/AlbumCard";
import InputField from "components/fields/InputField";
import { Add } from "iconsax-react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Lottie from "react-lottie";
import * as yup from "yup";
import empty from "assets/json/empty";
import LessonCard from "components/card/LessonCard";

const schema = yup.object({ nama_album: yup.string().required() }).required();

const Lesson = () => {
  const [data, setData] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const getData = async () => {
    try {
      setData({ ...data, loading: true });
      const res = await api_service.get("/lesson");
      setData({ ...data, data: res.data, loading: false });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setData({ ...data, error: true });
    }
  };
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

  useEffect(() => {
    getData();
  }, []);
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
              <LessonCard
                key={i}
                id={data._id}
                name={data.title}
                image={data.photo_url}
                category={data.categories}
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

export default Lesson;
