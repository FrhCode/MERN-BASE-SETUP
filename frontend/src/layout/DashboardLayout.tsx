import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";
import useStore, { auth } from "@src/zustand/store";
import { Outlet } from "react-router-dom";
import SideBarDesktop from "@src/componens/sideBar/SideBarDesktop";
import SideBarMobile from "@src/componens/sideBar/SideBarMobile";
import TopNav from "@src/componens/TopNav";
import Noaccess from "@src/page/Dashboard/Noaccess";

type props = {
  allowedRoles: string[];
};

export default function DashboardLayout({ allowedRoles }: props) {
  const auth = useStore.use.auth();
  const setAuth = useStore.use.setAuth();
  const { data: authResponse, error } = useAxiosFetch<
    auth,
    { name: string; message: string }
  >("/auth/verify");

  const location = useLocation();

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
  if (auth.userId === undefined) {
    return <Navigate to={`/auth/login?next=${location.pathname}`} />;
  }

  return (
    <div className="flex min-h-screen">
      <SideBarDesktop />
      <SideBarMobile />
      <div className="w-full">
        <TopNav />
        <div className="flash mt-4 mb-6 px-8 lg:px-6 sm:px-4"></div>
        <header>
          <h2 className="mb-5 px-8 text-xl font-semibold leading-tight lg:px-6 sm:px-4">
            Dashboard
          </h2>
        </header>
        {allowedRoles.filter((allowedRolesItem) =>
          auth.roles?.includes(allowedRolesItem)
        ).length === 0 ? (
          <Noaccess />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
