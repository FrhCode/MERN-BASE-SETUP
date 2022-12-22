import create from "zustand";
import { devtools } from "zustand/middleware";

import createSelectors from "./selectors";

export type auth = {
  userId?: string;
  userName?: string;
  roles?: string[];
  token?: string;
  isReady: boolean;
};

interface store {
  auth: auth;
  setAuth: (data: auth) => void;
  isNavMobileOpen: boolean;
  setIsNavMobileOpen: (data: boolean) => void;
}

const useStoreBase = create<store>()(
  devtools((set) => ({
    auth: { isReady: false },
    setAuth: (data: auth) => set((state) => ({ auth: data })),
    isNavMobileOpen: false,
    setIsNavMobileOpen: (data: boolean) =>
      set((state) => ({ isNavMobileOpen: data })),
  }))
);

export default createSelectors(useStoreBase);
