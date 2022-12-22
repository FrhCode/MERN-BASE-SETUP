import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import useStore, { auth } from "../zustand/store";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, Variants, motion } from "framer-motion";
import axiosClient from "@src/utils/axiosClient";

const navMenuListVariants: Variants = {
  initial: { maxHeight: "0px" },
  open: { maxHeight: "110px", transition: { when: "beforeChildren" } },
  close: { maxHeight: "0px", transition: { when: "afterChildren" } },
};
const navMenuItemstVariants: Variants = {
  initial: { opacity: 0, visibility: "hidden" },
  open: { opacity: 1, visibility: "visible" },
  close: { opacity: 0, visibility: "hidden" },
};

const carrotVariants: Variants = {
  open: { rotate: -90 },
  close: { rotate: 0 },
};

export default function TopNav() {
  const auth = useStore.use.auth();
  const [isMiniNavOpen, setIsMiniNavOpen] = useState(false);
  const isNavMobileOpen = useStore.use.isNavMobileOpen();
  const setIsNavMobileOpen = useStore.use.setIsNavMobileOpen();
  const miniNavRef = useRef<HTMLDivElement>(null);
  const buttonNavRef = useRef<HTMLButtonElement>(null);
  const setAuth = useStore.use.setAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axiosClient.post<auth>("/auth/logout");
      setAuth(data);
      navigate("/auth/login");
    } catch (error) {}
  };
  const handleClickOutsideMiniNav = (e: MouseEvent) => {
    // biar typescipt g berisik
    if (!(e.target instanceof HTMLElement)) return;

    // kalo button yang buat open yang di click. keluar
    if (buttonNavRef.current?.contains(e.target)) return;

    if (!miniNavRef.current?.contains(e.target)) {
      setIsMiniNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideMiniNav);
    return () => {
      document.removeEventListener("click", handleClickOutsideMiniNav);
    };
  }, [isMiniNavOpen]);

  return (
    <nav className="border-b border-base-300">
      <div className="px-8 lg:px-6 sm:px-4">
        <div className="flex h-16 items-center justify-end lg:justify-between">
          <div className="hidden lg:block">
            <button onClick={() => setIsNavMobileOpen(true)}>
              <GiHamburgerMenu />
            </button>
          </div>
          <div className="flex items-center rounded">
            <div className="relative">
              <button
                className="flex items-center space-x-2 rounded p-3 text-sm font-medium duration-150 ease-in-out hover:bg-base-content/10"
                onClick={() => setIsMiniNavOpen((prev) => !prev)}
                ref={buttonNavRef}
              >
                <div>{auth.userName}</div>

                <motion.div
                  variants={carrotVariants}
                  animate={isMiniNavOpen ? "open" : "close"}
                  className="origin-center"
                >
                  <AiFillCaretLeft />
                </motion.div>
              </button>
              <AnimatePresence>
                {isMiniNavOpen && (
                  <motion.div
                    className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-base-200"
                    variants={navMenuListVariants}
                    initial={"initial"}
                    animate={"open"}
                    exit={"close"}
                    ref={miniNavRef}
                  >
                    <motion.div variants={navMenuItemstVariants}>
                      <Link
                        to="#"
                        className="block w-full overflow-hidden rounded p-4 text-left text-sm leading-5 transition duration-150 ease-in-out hover:bg-base-content/20"
                      >
                        Profile
                      </Link>
                    </motion.div>
                    <motion.div variants={navMenuItemstVariants}>
                      <button
                        className="block w-full overflow-hidden rounded p-4 text-left text-sm leading-5 transition duration-150 ease-in-out hover:bg-base-content/20"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
