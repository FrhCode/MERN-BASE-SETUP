import { AiOutlineClose, AiOutlineHome, AiOutlineIdcard } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsBriefcase } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import useStore from "@src/zustand/store";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import useWindowSize from "@src/hooks/useWindowSize";
import { Link, NavLink } from "react-router-dom";
import SideBaritem from "./SideBaritem";

const variants: Variants = {
  initial: { translateX: "-100%" },
  animate: { translateX: "0%" },
  exit: { translateX: "-100%" },
};

export default function SideBarMobile() {
  const isNavMobileOpen = useStore.use.isNavMobileOpen();
  const setIsNavMobileOpen = useStore.use.setIsNavMobileOpen();
  const mininavContainerRef = useRef<HTMLDivElement>(null);
  // nilai windows size kadang ngak update, niatnya mau bikin menu mobile nya bisa auto close
  // const windowSize = useWindowSize();

  const handleClickOutsideMiniNav = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    // kalo yang diclick bukan mininav container. keluar!!!
    if ((mininavContainerRef.current === e.target) === false) return;
    setIsNavMobileOpen(false);
  };

  const handleLinkClick = (e: MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(
        ".flex.items-center.space-x-2.rounded.p-3.duration-150"
      )
    ) {
      setIsNavMobileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [isNavMobileOpen]);

  return (
    <AnimatePresence>
      {isNavMobileOpen ? (
        <motion.aside
          id="menu-mobile"
          className="absolute z-40 h-full w-full lg:block"
          variants={variants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          onClick={handleClickOutsideMiniNav}
          ref={mininavContainerRef}
        >
          <div className="relative h-screen w-80 bg-base-200 px-3 transition-all duration-300">
            <button
              className="absolute top-0 right-0 mt-2 mr-2 block -translate-x-2 translate-y-2"
              onClick={() => setIsNavMobileOpen(false)}
            >
              <AiOutlineClose size={25} />
            </button>
            <div className="flex h-16 w-full items-center justify-start">
              <Link to={"#"}></Link>
            </div>
            <SideBaritem />
          </div>
        </motion.aside>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}
