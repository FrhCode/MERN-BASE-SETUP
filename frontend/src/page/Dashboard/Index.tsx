import useStore, { auth } from "@src/zustand/store";
import { BiLogOut } from "react-icons/bi";
import axiosClient from "@src/utils/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const auth = useStore.use.auth();
  const setAuth = useStore.use.setAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axiosClient.post<auth>("/auth/logout");
      setAuth(data);
      navigate("/auth/login");
    } catch (error) {}
  };

  return (
    <main>
      <div className="pb-12">
        <div className="px-8 lg:px-6 sm:px-4">
          <div className="overflow-hidden bg-base-200 shadow-sm sm:rounded-lg">
            <div className="p-6">HALAMAN DASHBOARD</div>
          </div>
        </div>
      </div>
    </main>
  );
}
