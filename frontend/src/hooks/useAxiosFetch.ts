import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

export default function useAxiosFetch<T, K>(url: string) {
  const [data, SetData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<K>();

  useEffect(() => {
    const number = Math.floor(Math.random() * 100);

    const controller = new AbortController();
    let isMounted = true;

    const fethData = async () => {
      try {
        //
        const { data } = await axiosClient.get<T>(url, {
          signal: controller.signal,
          withCredentials: true,
        });
        if (isMounted == false) {
          return;
        }

        SetData(data);
        //
      } catch (error) {
        //

        if (isMounted == false) {
          return;
        }
        if (error instanceof AxiosError) {
          setError(error.response?.data);
        }

        //
      } finally {
        setIsLoading(false);
      }
    };

    fethData();

    return () => {
      isMounted = false;

      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
}
