import React from "react";
import { AiOutlineHome, AiOutlineIdcard } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsBriefcase } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { TfiWrite } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import useStore, { auth } from "@src/zustand/store";
import { MdListAlt } from "react-icons/md";
import { GrDocumentUpload } from "react-icons/gr";

export default function SideBaritem() {
  const auth = useStore.use.auth();
  return (
    <>
      <ul className="flex w-full flex-col">
        <li>
          <NavLink
            end
            to={"/dashboard"}
            className="flex items-center space-x-2 rounded p-3 duration-150 [&:not(.active)]:hover:bg-base-content/10"
          >
            <AiOutlineHome />
            <p>Dashboard</p>
          </NavLink>
        </li>
        {auth.roles!.includes("admin") && (
          <>
            {" "}
            <li>
              <NavLink
                to={"/dashboard/admin"}
                className="flex items-center space-x-2 rounded p-3 duration-150 [&:not(.active)]:hover:bg-base-content/10"
              >
                <BiUser />
                <p>Admin</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/agen"}
                className="flex items-center space-x-2 rounded p-3 duration-150 [&:not(.active)]:hover:bg-base-content/10"
              >
                <HiUserGroup />
                <p>Agen</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/progam"}
                className="flex items-center space-x-2 rounded p-3 duration-150 [&:not(.active)]:hover:bg-base-content/10"
              >
                <BsBriefcase />
                <p>Program</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/jamaah"}
                className="flex items-center space-x-2 rounded p-3 duration-150 [&:not(.active)]:hover:bg-base-content/10"
              >
                <AiOutlineIdcard />
                <p>Jamaah</p>
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <ul className="flex w-full flex-col">
        <li className="h-[0.06rem] w-full rounded bg-base-content/10"></li>
        <li className="mt-3 px-3 text-xs font-bold text-base-content/40">
          Artikel
        </li>
        <li>
          <NavLink
            to={"/dashboard/artikel"}
            end
            className="flex items-center space-x-2 rounded p-3 duration-150 [&:not(.active)]:hover:bg-base-content/10"
          >
            <MdListAlt />
            <p>Data artikel</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/artikel/create"}
            className="flex items-center space-x-2 rounded p-3 duration-150 [&:not(.active)]:hover:bg-base-content/10 "
          >
            <GrDocumentUpload />
            <p>Upload artikel</p>
          </NavLink>
        </li>
      </ul>
    </>
  );
}
