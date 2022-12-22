import { AiOutlineHome, AiOutlineIdcard } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsBriefcase } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import SideBaritem from "./SideBaritem";

export default function SideBarDesktop() {
  return (
    <aside id="menu" className="block lg:hidden">
      <div className="h-full w-72 bg-base-200 px-3">
        <div className="flex h-16 w-full items-center justify-start">
          <a href="http://127.0.0.1:8000/dashboard"></a>
        </div>
        <SideBaritem />
      </div>
    </aside>
  );
}
