import Card from "components/card";
import { Add, DocumentDownload, Edit, Trash } from "iconsax-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import api_service from "api/api_service";
import { useForm } from "react-hook-form";
import InputField from "components/fields/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "components/alert";
import empty from "assets/json/empty.json";
import Lottie from "react-lottie";

const schema = yup
  .object({
    nama: yup.string().required(),
    syarat: yup.string().required(),
  })
  .required();

const DevelopmentTable = ({ header, data }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState(null);

  function closeModalDelete() {
    setIsOpenDelete(false);
  }
  function openModalDelete() {
    setIsOpenDelete(true);
  }

  function closeModalCreate() {
    setIsOpenCreate(false);
  }
  function openModalCreate() {
    setIsOpenCreate(true);
  }
  function closeModalEdit() {
    setIsOpenEdit(false);
  }
  function openModalEdit() {
    setIsOpenEdit(true);
  }
  return (
    <Card extra={"w-full h-full p-4"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Transactions List
        </div>
        <div className="flex lg:space-x-5">
          <div className="flex h-full items-center rounded-full bg-lightPrimary py-3 text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
            <p className="pl-3 pr-2 text-xl">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </p>
            <input
              type="text"
              placeholder="Search..."
              className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
            />
          </div>
        </div>
      </div>
      {data.loading ? (
        <div className="my-5 flex h-96 w-full items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin text-5xl text-blueSecondary" />
        </div>
      ) : (
        <div className="h-full overflow-x-scroll">
          <table
            className="mt-8 h-max w-full"
            variant="simple"
            color="gray-500"
            mb="24px"
          >
            <thead>
              <tr>
                {header?.map((data, i) => (
                  <th
                    key={i}
                    className="border-b border-gray-200 pr-32 text-start dark:!border-navy-700"
                  >
                    <h1 className="text-xs font-bold tracking-wide text-gray-600">
                      {data}
                    </h1>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.data?.map((data, i) => (
                <tr key={i}>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {data.id}
                    </p>
                  </td>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {data.tgl}
                    </p>
                  </td>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {data.product}
                    </p>
                  </td>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {data.payment}
                    </p>
                  </td>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {data.status}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.data.length === 0 && (
            <div className="flex justify-center">
              <div className="w-1/4">
                <Lottie
                  options={{
                    animationData: empty,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default DevelopmentTable;

function ModalEdit({ isOpen, closeModal, getData, selectedLayanan }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [errorDocument, setErrorDocument] = useState(null);
  const [documentData, setDocumentData] = useState(null);

  function getDocument(e) {
    if (e.target.files && e.target.files[0]) {
      if (
        e.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setDocumentData(e.target.files[0]);
      } else {
        setErrorDocument("Hanya file ber-ekstensi .docx");
      }
    }
  }

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append("nama", data.nama);
      formdata.append("syarat", data.syarat);
      formdata.append(
        "template",
        typeof documentData === "string" ? documentData.name : documentData
      );
      await api_service.putWithDocument(
        `/layanan/edit/${selectedLayanan?.slug}`,
        formdata
      );
      setIsLoading(false);
      getData();
      closeModal();
      reset();
    } catch (er) {
      setErrorMessage(er);
      setIsLoading(false);
      console.log(er);
    }
  }
  useEffect(() => {
    reset();
    if (isOpen) {
      setDocumentData(
        selectedLayanan?.template
          ?.substring(85, selectedLayanan?.template?.length)
          ?.replaceAll("%20", " ")
      );
    } else {
      setDocumentData(null);
    }
  }, [isOpen, reset, selectedLayanan?.template]);
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
                {errorDocument && <Alert message={errorDocument} />}
                {errorMessage && <Alert message={errorMessage} />}
                <Dialog.Title
                  as="h3"
                  className="mb-5 text-lg font-bold leading-6 text-gray-900"
                >
                  Edit Layanan
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputField
                    label="Nama Layanan"
                    register={register}
                    name="nama"
                    extra="mb-1"
                    value={selectedLayanan?.nama}
                  />
                  {errors?.nama && (
                    <p className="text-sm italic text-red-500">
                      Nama layanan tidak boleh kosong
                    </p>
                  )}
                  <InputField
                    label="Syarat"
                    register={register}
                    name="syarat"
                    extra="mb-1"
                    value={selectedLayanan?.syarat}
                  />
                  <p className="text-xs italic text-gray-500">
                    Gunakan tanda koma (,) sebagai pemisah, ex: fotokopi ktp,
                    fotokopi kk, dll
                  </p>
                  {errors?.syarat && (
                    <p className="text-sm italic text-red-500">
                      Syarat tidak boleh kosong
                    </p>
                  )}
                  <button
                    type="button"
                    className="relative mt-5 flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-50"
                  >
                    <input
                      accept=".docx"
                      onChange={getDocument}
                      type="file"
                      className="absolute z-10 mt-3 h-full w-full cursor-pointer opacity-0 "
                    />
                    <p
                      className={`text-blue-500 ${documentData && "font-bold"}`}
                    >
                      {typeof documentData === "string"
                        ? documentData
                        : documentData?.name}
                    </p>
                  </button>
                  <div className="mt-4 flex items-center">
                    <button
                      type="button"
                      className="border-transparent mr-5 justify-center rounded-md border bg-red-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button className="border-transparent flex justify-center rounded-md border bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                      {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
function ModalCreate({ isOpen, closeModal, getData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [errorDocument, setErrorDocument] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [disable, setDisable] = useState(true);

  function getDocument(e) {
    if (e.target.files && e.target.files[0]) {
      if (
        e.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setDocumentData(e.target.files[0]);
      } else {
        setErrorDocument("Hanya file ber-ekstensi .docx");
      }
    }
  }

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append("nama", data.nama);
      formdata.append("syarat", data.syarat);
      formdata.append("template", documentData);
      await api_service.postWithDocument("/layanan/create", formdata);
      setIsLoading(false);
      getData();
      closeModal();
      reset();
    } catch (er) {
      setErrorMessage(er);
      setIsLoading(false);
      console.log(er);
    }
  }
  useEffect(() => {
    if (!documentData) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [documentData]);
  useEffect(() => {
    reset();
    setDocumentData(null);
  }, [isOpen, reset]);
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
                {errorDocument && <Alert message={errorDocument} />}
                {errorMessage && <Alert message={errorMessage} />}
                <Dialog.Title
                  as="h3"
                  className="mb-5 text-lg font-bold leading-6 text-gray-900"
                >
                  Create Layanan
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputField
                    label="Nama Layanan"
                    register={register}
                    name="nama"
                    extra="mb-1"
                  />
                  {errors?.nama && (
                    <p className="text-sm italic text-red-500">
                      Nama layanan tidak boleh kosong
                    </p>
                  )}
                  <InputField
                    label="Syarat"
                    register={register}
                    name="syarat"
                    extra="mb-1"
                  />
                  <p className="text-xs italic text-gray-500">
                    Gunakan tanda koma (,) sebagai pemisah, ex: fotokopi ktp,
                    fotokopi kk, dll
                  </p>
                  {errors?.syarat && (
                    <p className="text-sm italic text-red-500">
                      Syarat tidak boleh kosong
                    </p>
                  )}
                  <button
                    type="button"
                    className="relative mt-5 flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-50"
                  >
                    <input
                      accept=".docx"
                      onChange={getDocument}
                      type="file"
                      className="absolute z-10 mt-3 h-full w-full cursor-pointer opacity-0 "
                    />
                    <p
                      className={`text-blue-500 ${documentData && "font-bold"}`}
                    >
                      {!documentData
                        ? "Upload Template Surat"
                        : documentData?.name}
                    </p>
                  </button>
                  <div className="mt-4 flex items-center">
                    <button
                      type="button"
                      className="border-transparent mr-5 justify-center rounded-md border bg-red-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={disable}
                      className={`border-transparent flex justify-center rounded-md border ${
                        disable
                          ? "cursor-not-allowed bg-gray-300 text-gray-700"
                          : "bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      } px-4 py-2 text-sm font-medium `}
                    >
                      {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
function ModalDelete({ isOpen, closeModal, selectedLayanan, getData }) {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteDesa(slug) {
    try {
      setIsLoading(true);
      await api_service.delete(`/layanan/delete/${slug}`);
      getData();
      setIsLoading(false);
      closeModal();
    } catch (er) {
      setIsLoading(false);
      console.log(er);
    }
  }
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
                  <span className="font-black">
                    ' {selectedLayanan?.nama} '
                  </span>
                </Dialog.Title>
                <div className="mt-4 flex items-center">
                  <button
                    type="button"
                    className="border-transparent mr-5 justify-center rounded-md border bg-red-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Tidak
                  </button>
                  <button
                    onClick={() => deleteDesa(selectedLayanan?.slug)}
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
