import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";
import useStore, { auth } from "../zustand/store";

export default function AuthLayout() {
  const auth = useStore.use.auth();
  const setAuth = useStore.use.setAuth();
  const { data: authResponse, error } = useAxiosFetch<
    auth,
    { name: string; message: string }
  >("/auth/verify");

  useEffect(() => {
    if (typeof authResponse === "object") {
      setAuth({ ...authResponse, isReady: true });
    } else if (typeof error === "object") {
      setAuth({ isReady: true });
    }
  }, [authResponse, error]);

  if (auth.isReady === false) {
    return <div></div>;
  }

  if (typeof auth.userId === "string") {
    return <Navigate to={`/dashboard`} />;
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-md bg-base-200 p-8">
      <Outlet />
    </div>
  );
}
