import Card from "components/card";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import api_service from "api/api_service";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const NewsCard = ({
  title,
  author,
  image,
  extra,
  alt,
  created,
  slug,
  getData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const deleteNews = async () => {
    try {
      setIsLoading(true);
      await api_service.delete(`/berita/delete/${slug}`);
      getData();
      setIsLoading(false);
      setIsOpen(false);
    } catch (er) {
      setIsLoading(false);
      setIsOpen(false);
      console.log(er);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
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
                      onClick={deleteNews}
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
      <Card
        extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
      >
        <div className="h-full w-full">
          <div className="relative w-full">
            <div className="mb-3 lg:h-36 h-52 w-full rounded-xl 3xl:h-full 3xl:w-full bg-gray-200 bg-cover" style={{backgroundImage:`url(${image})`}}></div>
            {/* <img
              src={image}
              className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
              alt={alt}
            /> */}
          </div>

          <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
            <div className="mb-2">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-navy-700 dark:text-white md:w-40 lg:w-52 w-72">
                {" "}
                {title}{" "}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                {created}{" "}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                By {author}{" "}
              </p>
            </div>
          </div>

          <div className="flex space-x-3 text-sm">
            <button
              onClick={() => {
                navigate(`edit/${slug}`);
              }}
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            >
              Edit
            </button>
            <button onClick={openModal} className="font-medium text-red-500 ">
              Delete
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default NewsCard;
