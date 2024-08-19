import Card from "components/card";
import { Add, DocumentDownload, Edit, Import, Trash } from "iconsax-react";
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
import OptionField from "components/fields/OptionField";
import * as XLSX from "xlsx";
import Papa from "papaparse";
const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();

const DevelopmentTable = ({ header, data, getData }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenUp, setIsOpenUp] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
  function closeModalUp() {
    setIsOpenUp(false);
  }
  function openModalUp() {
    setIsOpenUp(true);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getData(newPage, undefined, 30);
  };
  return (
    <Card extra={"w-full h-full p-4"}>
      <ModalCreate
        closeModal={closeModalCreate}
        isOpen={isOpenCreate}
        getData={getData}
        currentPage={currentPage}
      />
      <ModalUp
        closeModal={closeModalUp}
        isOpen={isOpenUp}
        getData={getData}
        currentPage={currentPage}
      />
      <ModalEdit
        closeModal={closeModalEdit}
        isOpen={isOpenEdit}
        getData={getData}
        selectedLayanan={selectedLayanan}
        currentPage={currentPage}
      />
      <ModalDelete
        getData={getData}
        closeModal={closeModalDelete}
        isOpen={isOpenDelete}
        selectedLayanan={selectedLayanan}
        currentPage={currentPage}
      />
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Question List
        </div>
        <div className="flex lg:space-x-5">
          <button
            onClick={openModalUp}
            className="flex items-center space-x-1 rounded-full bg-brand-700 px-4 py-2 text-white drop-shadow-md hover:bg-white hover:text-brand-700 dark:bg-brand-400 dark:hover:bg-white dark:hover:text-brand-400"
          >
            <Import />
            <p>Import</p>
          </button>
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
              onChange={(e) => getData(currentPage, e.target.value, 30)}
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
                      {data.text}
                    </p>
                  </td>
                  {data.options?.map((data, i) => (
                    <td key={i}>
                      <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                        {data}
                      </p>
                    </td>
                  ))}
                  <td>
                    <p className="my-3 mr-5 text-sm font-bold text-navy-700 dark:text-white">
                      Answer : Option {data.correctOptionIndex + 1}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination controls */}
          <div className="mt-4 flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 rounded-full bg-blue-500 px-3 py-1 text-white"
            >
              Previous
            </button>
            <p className="mr-2 text-gray-600">
              Page {currentPage} of {data.max}
            </p>
            <button
              disabled={currentPage === data.max}
              onClick={() => handlePageChange(currentPage + 1)}
              className="rounded-full bg-blue-500 px-3 py-1 text-white"
            >
              Next
            </button>
          </div>
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
function ModalUp({ isOpen, closeModal, getData, currentPage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [errorDocument, setErrorDocument] = useState(null);
  const [documentData, setDocumentData] = useState([]);
  const [docs, setDocs] = useState(null);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    // Other useEffect logic if needed
  }, [documentData]);

  function handleCSVFile(content, file) {
    Papa.parse(content, {
      header: true,
      complete: (result) => {
        const csvArray = result.data;

        // Define expected headers
        const expectedHeaders = [
          "text",
          "options[0]",
          "options[1]",
          "options[2]",
          "correctOptionIndex",
        ];

        // Check if CSV headers match the expected headers
        const csvHeaders = result.meta.fields;
        if (!areHeadersValid(csvHeaders, expectedHeaders)) {
          setErrorDocument(
            "Invalid CSV headers. Please make sure the headers match the expected structure."
          );
          return;
        }
        setDocs(file);
        if (csvArray.length > 0) {
          // Map headers to their respective indices
          const headerMap = {
            text: "text",
            "options[0]": "options[0]",
            "options[1]": "options[1]",
            "options[2]": "options[2]",
            correctOptionIndex: "correctOptionIndex",
          };

          // Extract values for all entries
          const allEntriesData = csvArray.map((entry) => ({
            text: entry[headerMap["text"]] || "",
            options: [
              entry[headerMap["options[0]"]] || "",
              entry[headerMap["options[1]"]] || "",
              entry[headerMap["options[2]"]] || "",
            ],
            correctOptionIndex: entry[headerMap["correctOptionIndex"]] || null,
          }));

          // Update the state by adding new entries to the existing array
          setDocumentData((prevData) => [
            ...(prevData || []),
            ...allEntriesData,
          ]);

          // Check if the necessary fields are filled to enable/disable the submit button
          setDisable(
            !allEntriesData.every(
              (entry) =>
                entry.text &&
                entry.options.length &&
                entry.correctOptionIndex !== null
            )
          );
        }
      },
      error: (error) => {
        console.error("CSV parsing error:", error);
        setErrorDocument("Terjadi kesalahan");
      },
    });
  }

  // Function to check if headers are valid
  function areHeadersValid(csvHeaders, expectedHeaders) {
    return (
      JSON.stringify(csvHeaders.sort()) ===
      JSON.stringify(expectedHeaders.sort())
    );
  }

  function getDocument(e) {
    if (e.target.files && e.target.files[0]) {
      const allowedFileType = "text/csv"; // CSV file type

      const file = e.target.files[0];
      if (file.type === allowedFileType) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target.result;
          handleCSVFile(content, file);
        };

        reader.readAsText(file);
        setErrorDocument(""); // Clear any previous errors
      } else {
        setErrorDocument("Hanya file ber-ekstensi .csv");
      }
    }
  }

  async function onSubmit() {
    try {
      setIsLoading(true);
      const requestData = documentData.map((question) => ({
        text: question.text,
        options: question.options,
        correctOptionIndex: question.correctOptionIndex,
      }));

      await api_service.post("/admin/question/bulk-post", requestData);

      setIsLoading(false);
      getData(currentPage, undefined, 30);
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
    setDocs(null);
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
                  Insert Questions
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <button
                    type="button"
                    className="relative mt-5 flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-50"
                  >
                    <input
                      accept="csv"
                      onChange={getDocument}
                      type="file"
                      className="absolute z-10 mt-3 h-full w-full cursor-pointer opacity-0 "
                    />
                    <p
                      className={`text-blue-500 ${documentData && "font-bold"}`}
                    >
                      {!docs ? "Upload File csv" : docs?.name}
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
function ModalEdit({
  isOpen,
  closeModal,
  getData,
  selectedLayanan,
  currentPage,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [options, setOptions] = useState([]);
  const [disable, setDisable] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const formdata = {
        text: data.title,
        options: options.map((option) => option.title),
        correctOptionIndex: parseInt(correctAnswer),
      };
      await api_service.put(
        `/admin/question/${selectedLayanan?._id}`,
        formdata
      );
      setIsLoading(false);
      getData(currentPage, undefined, 30);
      closeModal();
      reset();
    } catch (er) {
      setErrorMessage(er);
      setIsLoading(false);
      console.log(er);
    }
  }
  useEffect(() => {
    const areOptionsEmpty = options.some(
      (option) => (option.title || "").trim() === ""
    );
    if (areOptionsEmpty || correctAnswer == "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [options, correctAnswer]);
  useEffect(() => {
    reset();
    setOptions(["", "", ""]);
  }, [isOpen, reset]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  function handleChange(e) {
    setCorrectAnswer(e.target.value);
  }

  useEffect(() => {
    if (isOpen) {
      const newOptions = selectedLayanan.options.map((option) => ({
        title: option,
      }));
      setOptions(newOptions);
      setCorrectAnswer(selectedLayanan?.correctOptionIndex);
    }
  }, [isOpen, selectedLayanan]);
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
                  Create Question
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputField
                    label="Judul Question"
                    register={register}
                    value={selectedLayanan?.text}
                    name="title"
                    extra="mb-1"
                  />
                  {errors?.nama && (
                    <p className="text-sm italic text-red-500">
                      Nama layanan tidak boleh kosong
                    </p>
                  )}
                  {options.map((option, index) => (
                    <div key={index} className="mb-4">
                      {/* <label className="block">
                        <span className="text-lg font-bold">
                          Option {index + 1}:
                        </span>
                        <input
                          className="mt-2 w-full rounded-md border p-2"
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                        />
                      </label> */}
                      <InputField
                        label={`Option ${index + 1}:`}
                        register={register}
                        value={option.title}
                        name={`option${index + 1}`}
                        extra="mb-1"
                        onChange={(value) =>
                          handleOptionChange(index, { title: value })
                        }
                      />
                    </div>
                  ))}
                  {/* <label className="mb-4 block">
                    <span className="text-lg font-bold">Correct Answer:</span>
                    <select
                      className="mt-2 w-full rounded-md border p-2"
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(e.target.value)}
                    >
                      <option value="">Select Correct Answer</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label> */}
                  <OptionField
                    value={correctAnswer}
                    data={options}
                    name={"correctOptionIndex"}
                    placeholder={"Pilih Jawaban"}
                    label={"Pilih Jawaban"}
                    loading={options.some(
                      (option) => (option.title || "").trim() === ""
                    )}
                    handleChange={handleChange}
                  />
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
function ModalCreate({ isOpen, closeModal, getData, currentPage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [options, setOptions] = useState([
    { title: "" },
    { title: "" },
    { title: "" },
  ]);
  const [disable, setDisable] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const formdata = {
        text: data.title,
        options: options.map((option) => option.title),
        correctOptionIndex: parseInt(correctAnswer),
      };
      await api_service.post("/admin/question/post", formdata);
      setIsLoading(false);
      getData(currentPage, undefined, 30);
      closeModal();
      reset();
    } catch (er) {
      setErrorMessage(er);
      setIsLoading(false);
      console.log(er);
    }
  }
  useEffect(() => {
    const areOptionsEmpty = options.some(
      (option) => (option.title || "").trim() === ""
    );
    if (areOptionsEmpty || correctAnswer == "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [options, correctAnswer]);
  useEffect(() => {
    reset();
    setOptions(["", "", ""]);
  }, [isOpen, reset]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  function handleChange(e) {
    setCorrectAnswer(e.target.value);
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
                  Create Question
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputField
                    label="Judul Question"
                    register={register}
                    name="title"
                    extra="mb-1"
                  />
                  {errors?.nama && (
                    <p className="text-sm italic text-red-500">
                      Nama layanan tidak boleh kosong
                    </p>
                  )}
                  {options.map((option, index) => (
                    <div key={index} className="mb-4">
                      {/* <label className="block">
                        <span className="text-lg font-bold">
                          Option {index + 1}:
                        </span>
                        <input
                          className="mt-2 w-full rounded-md border p-2"
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                        />
                      </label> */}
                      <InputField
                        label={`Option ${index + 1}:`}
                        register={register}
                        value={option}
                        name={`option${index + 1}`}
                        extra="mb-1"
                        onChange={(value) =>
                          handleOptionChange(index, { title: value })
                        }
                      />
                    </div>
                  ))}
                  {/* <label className="mb-4 block">
                    <span className="text-lg font-bold">Correct Answer:</span>
                    <select
                      className="mt-2 w-full rounded-md border p-2"
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(e.target.value)}
                    >
                      <option value="">Select Correct Answer</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label> */}
                  <OptionField
                    value={correctAnswer}
                    data={options}
                    name={"correctOptionIndex"}
                    placeholder={"Pilih Jawaban"}
                    label={"Pilih Jawaban"}
                    loading={options.some(
                      (option) => (option.title || "").trim() === ""
                    )}
                    handleChange={handleChange}
                  />
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
function ModalDelete({
  isOpen,
  closeModal,
  selectedLayanan,
  getData,
  currentPage,
}) {
  const [isLoading, setIsLoading] = useState(false);
  async function deleteDesa(id) {
    try {
      setIsLoading(true);
      await api_service.delete(`/admin/question/${id}`);
      getData(currentPage, undefined, 30);
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
                    ' {selectedLayanan?.text} '
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
