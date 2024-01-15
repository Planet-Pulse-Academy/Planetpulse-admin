import Card from "components/card";
import { Add, DocumentDownload, Edit, InfoCircle, Trash } from "iconsax-react";
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
import { format } from "date-fns";
import OptionField from "components/fields/OptionField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "components/Loading";
import TextField from "../../../../components/fields/TextField"
const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();

const DevelopmentTable = ({ header, data, getData }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenContent, setIsOpenContent] = useState(false);
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

  function closeModalContent() {
    setIsOpenContent(false);
  }
  function openModalContent() {
    setIsOpenContent(true);
  }
  return (
    <Card extra={"w-full h-full p-4"}>
      <ModalEdit
        closeModal={closeModalEdit}
        isOpen={isOpenEdit}
        getData={getData}
        selectedLayanan={selectedLayanan}
      />
      <ModalCreate
        closeModal={closeModalCreate}
        isOpen={isOpenCreate}
        getData={getData}
      />
      <ModalContent
        closeModal={closeModalContent}
        isOpen={isOpenContent}
        getData={getData}
        selectedLayanan={selectedLayanan}
      />
      <ModalDelete
        getData={getData}
        closeModal={closeModalDelete}
        isOpen={isOpenDelete}
        selectedLayanan={selectedLayanan}
      />
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Stage List
        </div>
        <div className="flex lg:space-x-5">
          <button
            onClick={openModalCreate}
            className="flex items-center space-x-1 rounded-full bg-brand-700 px-4 py-2 text-white drop-shadow-md hover:bg-white hover:text-brand-700 dark:bg-brand-400 dark:hover:bg-white dark:hover:text-brand-400"
          >
            <Add />
            <p>Create</p>
          </button>
          <div className="flex h-full items-center rounded-full bg-lightPrimary py-3 text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
            <p className="pl-3 pr-2 text-xl">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </p>
            <input
              onChange={(e) => getData(e.target.value)}
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
                      {i + 1}
                    </p>
                  </td>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {data.name}
                    </p>
                  </td>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {data.difficulty == 1
                        ? "Easy"
                        : data.difficulty == 2
                        ? "Medium"
                        : "Hard"}
                    </p>
                  </td>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {data.lesson_name}
                    </p>
                  </td>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {data.quizzes.length}
                    </p>
                  </td>
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      {format(new Date(data.createdAt), "MMMM dd, yyyy")}
                    </p>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedLayanan(data);
                        openModalEdit();
                      }}
                      className="rounded-md bg-blue-500 px-4 py-1.5 hover:bg-blue-600 lg:mr-3"
                    >
                      <Edit className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLayanan(data);
                        openModalDelete();
                      }}
                      className="rounded-md bg-red-500 px-4 py-1.5 hover:bg-red-600 md:mr-4 lg:mr-3"
                    >
                      <Trash className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLayanan(data);
                        openModalContent();
                      }}
                      className="rounded-md bg-blue-500 px-4 py-1.5 hover:bg-blue-600"
                    >
                      <InfoCircle className="h-4 w-4 text-white" />
                    </button>
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
  const [lesson, setLesson] = useState("");
  const [difficulty, setDifficulty] = useState("");

  async function onSubmit(data) {
    try {
      console.log(data);
      setIsLoading(true);
      const formData = {
        name: data.title,
        id_lesson: lesson,
        difficulty: difficulty,
      };
      await api_service.put(
        `/lesson/stages/update/${selectedLayanan?._id}`,
        formData
      );
      setIsLoading(false);
      getData();
      closeModal();
    } catch (er) {
      setErrorMessage(er);
      setIsLoading(false);
      console.log(er);
    }
  }

  const [lessonData, setLessonData] = useState({
    loading: false,
    error: false,
    data: [],
  });
  const getLesson = async () => {
    try {
      setLessonData({ ...lessonData, loading: true });
      const res = await api_service.get("/lesson");
      setLessonData({ ...lessonData, data: res.data, loading: false });
    } catch (error) {
      console.log(error);
      setLessonData({ ...lessonData, error: true });
    }
  };

  useEffect(() => {
    getLesson();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLesson(selectedLayanan?.id_lesson);
      setDifficulty(selectedLayanan?.difficulty);
    }
  }, [isOpen, selectedLayanan]);
  function handleChange(e) {
    setLesson(e.target.value);
    console.log(lesson);
  }
  function handleChange2(e) {
    setDifficulty(e.target.value);
    console.log(e.target.value);
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
                {errorMessage && <Alert message={errorMessage} />}
                <Dialog.Title
                  as="h3"
                  className="mb-5 text-lg font-bold leading-6 text-gray-900"
                >
                  Create Stage
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputField
                    label="Nama Stage"
                    register={register}
                    name="title"
                    extra="mb-1"
                    value={selectedLayanan?.name}
                  />
                  {errors?.title && (
                    <p className="text-sm italic text-red-500">
                      Nama Stage tidak boleh kosong
                    </p>
                  )}
                  <OptionField
                    handleChange={handleChange}
                    data={lessonData.data}
                    name={"id_lesson"}
                    placeholder={"Pilih Lesson"}
                    loading={lessonData.loading}
                    label={"Pilih Lesson"}
                    value={lesson}
                  />
                  <OptionField
                    handleChange={handleChange2}
                    data={[
                      { _id: 1, title: "Easy" },
                      { _id: 2, title: "Medium" },
                      { _id: 3, title: "Hard" },
                    ]}
                    name={"difficulty"}
                    placeholder={"Pilih Kesusahan"}
                    loading={false}
                    label={"Pilih Kesusahan"}
                    value={difficulty}
                  />
                  <div className="mt-10 flex items-center">
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

  const [disable, setDisable] = useState(true);
  const [lesson, setLesson] = useState("");
  const [difficulty, setDifficulty] = useState("");

  async function onSubmit(data) {
    try {
      console.log(data);
      setIsLoading(true);
      const formData = {
        name: data.title,
        id_lesson: lesson,
        difficulty: difficulty,
      };
      await api_service.post("/lesson/stages/post", formData);
      setIsLoading(false);
      getData();
      closeModal();
    } catch (er) {
      setErrorMessage(er);
      setIsLoading(false);
      console.log(er);
    }
  }

  useEffect(() => {
    if (!lesson) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [lesson]);
  const [lessonData, setLessonData] = useState({
    loading: false,
    error: false,
    data: [],
  });
  const getLesson = async () => {
    try {
      setLessonData({ ...lessonData, loading: true });
      const res = await api_service.get("/lesson");
      setLessonData({ ...lessonData, data: res.data, loading: false });
    } catch (error) {
      console.log(error);
      setLessonData({ ...lessonData, error: true });
    }
  };

  useEffect(() => {
    getLesson();
  }, []);

  function handleChange(e) {
    setLesson(e.target.value);
    console.log(lesson);
  }
  function handleChange2(e) {
    setDifficulty(e.target.value);
    console.log(e.target.value);
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
                {errorMessage && <Alert message={errorMessage} />}
                <Dialog.Title
                  as="h3"
                  className="mb-5 text-lg font-bold leading-6 text-gray-900"
                >
                  Create Stage
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputField
                    label="Nama Stage"
                    register={register}
                    name="title"
                    extra="mb-1"
                  />
                  {errors?.title && (
                    <p className="text-sm italic text-red-500">
                      Nama Stage tidak boleh kosong
                    </p>
                  )}
                  <OptionField
                    handleChange={handleChange}
                    data={lessonData.data}
                    name={"id_lesson"}
                    placeholder={"Pilih Lesson"}
                    loading={lessonData.loading}
                    label={"Pilih Lesson"}
                    value={lesson}
                  />
                  <OptionField
                    handleChange={handleChange2}
                    data={[
                      { _id: 1, title: "Easy" },
                      { _id: 2, title: "Medium" },
                      { _id: 3, title: "Hard" },
                    ]}
                    name={"difficulty"}
                    placeholder={"Pilih Kesusahan"}
                    loading={false}
                    label={"Pilih Kesusahan"}
                    value={difficulty}
                  />
                  <div className="mt-10 flex items-center">
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

function ModalContent({ isOpen, closeModal, getData, selectedLayanan }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [disable, setDisable] = useState(true);
  const [content, setContent] = useState("");

  async function onSubmit(data) {
    try {
      console.log(data.title);
      setIsLoading(true);
      const formData = {
        title: data.title,
        content: data.content,
      };
      await api_service.put(
        `/lesson/stages/content/${selectedLayanan._id}`,
        formData
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
    if (!content) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [content]);

  useEffect(() => {
    reset();
    if (isOpen) {
      setContent(selectedLayanan?.detail?.content);
    } else {
      setContent(null);
    }
  }, [isOpen, reset, selectedLayanan?.detail]);
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
                {errorMessage && <Alert message={errorMessage} />}
                <Dialog.Title
                  as="h3"
                  className="mb-5 text-lg font-bold leading-6 text-gray-900"
                >
                  Update Content
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputField
                    register={register}
                    name={"title"}
                    label="Title"
                    extra={"mb-3"}
                    value={selectedLayanan?.detail?.title}
                  />
                  {errors?.title && (
                    <p className="text-sm italic text-red-500">
                      Nama Konten tidak boleh kosong
                    </p>
                  )}
                 
                  <TextField
                    register={register}
                    id={"content"}
                    label={"konten"}
                    disabled={false}
                    value={selectedLayanan?.detail?.content}

                  />
                  <div className="mt-10 flex items-center">
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

  async function deleteDesa(id) {
    try {
      setIsLoading(true);
      await api_service.delete(`/lesson/stages/delete/${id}`);
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
                    ' {selectedLayanan?.name} '
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
                    onClick={() => deleteDesa(selectedLayanan?._id)}
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
