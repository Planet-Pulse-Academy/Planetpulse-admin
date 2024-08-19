import api_service from "api/api_service";
import InputField from "components/fields/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })
  .required();

export default function SignIn() {
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api_service.login(data);
      if (res.status == "Success") {
        // console.log(res);
        localStorage.setItem("token", res.token);
        setErrorEmail(null);
        setErrorPassword(null);
        navigate("/admin/dashboard");
      } else {
        setErrorPassword(res.messages);
      }
    } catch (er) {
      console.log(er);
      if (er.message === "email tidak ditemukan") setErrorEmail(er.message);
      if (er.message === "password salah") setErrorPassword(er.message);
    }
  };
  useEffect(() => {
    setErrorEmail(null);
    setErrorPassword(null);
  }, [errors?.email?.message, errors?.password?.message]);
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <InputField
            register={register}
            name="email"
            variant="auth"
            extra="mb-1"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="email"
          />
          {errorEmail && (
            <p className="mb-3 text-sm text-red-500">{errorEmail}</p>
          )}
          <p className="mb-3 text-sm text-red-500">
            {errors?.email && "Email wajib diisi"}
          </p>
          {/* Password */}
          <InputField
            register={register}
            name="password"
            variant="auth"
            extra="mb-1"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
          />
          {errorPassword && (
            <p className="mb-3 text-sm text-red-500">{errorPassword}</p>
          )}
          <p className="mb-3 text-sm text-red-500">
            {errors?.password && "Password wajib diisi"}
          </p>
          {/* Checkbox */}
          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
