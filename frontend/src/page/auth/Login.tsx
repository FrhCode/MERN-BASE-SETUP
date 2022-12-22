import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import React, { useState } from "react";
import axiosClient from "@src/utils/axiosClient";
import { auth } from "@src/zustand/store";
import useNavigateNext from "@src/hooks/useNavigateNext";

import useStore from "@src/zustand/store";

export default function SignIn() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState<
    { email: string; password: string; message: string } | boolean
  >(false);
  const setAuth = useStore.use.setAuth();

  const navigate = useNavigateNext();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }
  ) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    try {
      setIsSubmit(true);

      const { data } = await axiosClient.post<auth>(`/auth/login`, formData);
      setIsError(false);

      setAuth({ ...data, isReady: true });
      navigate("/dashboard");
      //
    } catch (error) {
      if (!(error instanceof AxiosError)) return;

      setIsError(error.response?.data);

      //
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <p className="text-center font-semibold">Login</p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="form-controls">
          <label className="label">
            <span className="label-text">Alamat Email</span>
            {typeof isError === "object" && (
              <span className="label-text-alt">{isError.email}</span>
            )}{" "}
          </label>
          <input
            type="text"
            placeholder="farhan@gmail.com"
            className={`form-control input-bordered input-ghost input  w-full ${
              typeof isError === "object" && isError.email ? "input-error" : ""
            }`}
            name="email"
          />
        </div>
        <div className="form-controls">
          <label className="label">
            <span className="label-text">Password</span>
            {typeof isError === "object" && (
              <span className="label-text-alt">{isError.password}</span>
            )}
          </label>
          <input
            type="password"
            placeholder="asdd"
            className={`form-control input-bordered input-ghost input  w-full ${
              typeof isError === "object" && isError.password
                ? "input-error"
                : ""
            }`}
            name="password"
          />
        </div>
        <p>
          Belum punya akun?{" "}
          <Link
            to={"/auth/register"}
            className="cursor-pointer hover:underline"
          >
            Daftar
          </Link>
        </p>
        {typeof isError === "object" && isError.message && (
          <div>
            <div className="alert alert-error mt-6 shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{isError.message}</span>
              </div>
            </div>
          </div>
        )}
        <span className="flex justify-end">
          <button
            type="submit"
            className={`btn mt-6  ${isSubmit === true && "disable loading"}`}
          >
            Login
          </button>
        </span>
      </form>
    </>
  );
}
