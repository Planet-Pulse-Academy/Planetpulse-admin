import Card from "components/card";
import img from "../../assets/img/thumbnail.jpg";
import React, { useState, Fragment } from "react";
import Dropdown from "components/dropdown";
import { BsThreeDots } from "react-icons/bs";
import api_service from "api/api_service";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Edit, Trash } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const GaleriCard = ({ title, image, extra, alt, id, slug, getData }) => {
  return (
    <>
      <div className="cursor-pointer">
        <Card
          extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
        >
          <div className="h-full w-full">
            <div className="mb-4 flex justify-end">
              <CardMenu slug={slug} getData={getData} title={title} id={id} />
            </div>
            <div className="relative w-full">
              <img
                src={!image ? img : image}
                className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
                alt={alt}
              />
            </div>

            <p className="w-72 overflow-hidden text-ellipsis whitespace-nowrap text-left text-lg font-bold text-navy-700 dark:text-white lg:w-52 ">
              {" "}
              {title}{" "}
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default GaleriCard;

function CardMenu({ transparent, slug, getData, title, id }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const navigate = useNavigate();
  function closeModalDelete() {
    setIsOpenDelete(false);
  }
  function openModalDelete() {
    setIsOpenDelete(true);
  }

  return (
    <>
      <ModalDelete
        closeModal={closeModalDelete}
        getData={getData}
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        slug={slug}
        title={title}
      />
      <Dropdown
        button={
          <div
            onClick={() => setOpenMenu(!openMenu)}
            open={openMenu}
            className={`flex items-center text-xl hover:cursor-pointer ${
              transparent
                ? "bg-none text-white hover:bg-none active:bg-none"
                : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
            } linear justify-center rounded-lg font-bold transition duration-200`}
          >
            <BsThreeDots className="h-6 w-6" />
          </div>
        }
        animation={"origin-top-right transition-all duration-300 ease-in-out"}
        classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
        children={
          <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm drop-shadow-lg dark:!bg-navy-700 dark:shadow-none">
            <button
              onClick={() => {
                navigate(`edit/${slug}`);
              }}
              className="flex cursor-pointer items-center gap-2  rounded-md px-3 py-1 text-gray-700 hover:bg-gray-200"
            >
              <span>
                <Edit size={18} />
              </span>
              Edit
            </button>
            <button
              onClick={openModalDelete}
              className="mt-2 flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 pt-1 text-gray-700 hover:bg-gray-200"
            >
              <span>
                <Trash size={18} />
              </span>
              Delete
            </button>
          </div>
        }
      />
    </>
  );
}

function ModalDelete({ getData, slug, setIsOpen, isOpen, closeModal, title }) {
  const [isLoading, setIsLoading] = useState(false);
  const deleteAlbum = async () => {
    try {
      setIsLoading(true);
      await api_service.delete(`/galeri/delete/${slug}`);
      getData();
      setIsLoading(false);
      setIsOpen(false);
    } catch (er) {
      setIsLoading(false);
      setIsOpen(false);
      console.log(er);
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[99]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#000000] bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Apakah anda yakin ingin menghapus{" "}
                  <span className="font-black">' {title} '</span>
                </Dialog.Title>
                <div className="mt-4 flex items-center">
                  <button
                    type="button"
                    className="border-transparent justify-center rounded-md border bg-red-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 lg:mr-5"
                    onClick={closeModal}
                  >
                    Tidak
                  </button>
                  <button
                    onClick={deleteAlbum}
                    type="button"
                    className="border-transparent flex justify-center rounded-md border bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {isLoading ? (
                      <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                    ) : (
                      "Ya"
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
