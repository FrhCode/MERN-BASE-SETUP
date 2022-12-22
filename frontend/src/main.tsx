import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./page/Index";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@src/page/auth/Login";
import Register from "@src/page/auth/Register";
import Test from "@src/page/Test";
import AuthLayout from "@src/layout/AuthLayout";
import DashboardLayout from "@src/layout/DashboardLayout";
import DashboardIndex from "@src/page/Dashboard/Index";
import DashboardAdmin from "@src/page/Dashboard/Admin";
import DashboardAgen from "@src/page/Dashboard/Agen";
import DashboardProgam from "@src/page/Dashboard/Progam";
import DashboardJamaah from "@src/page/Dashboard/Jamaah";
import DashboardIndexArtikel from "@src/page/Dashboard/artikel/Index";
import DashboardIndexCreate from "@src/page/Dashboard/artikel/Create";

const router = createBrowserRouter([
  {
    path: "",
    element: <Index />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout allowedRoles={["admin"]} />,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: "admin",
        element: <DashboardAdmin />,
      },
      {
        path: "agen",
        element: <DashboardAgen />,
      },
      {
        path: "progam",
        element: <DashboardProgam />,
      },
      {
        path: "jamaah",
        element: <DashboardJamaah />,
      },
    ],
  },
  {
    path: "dashboard/artikel",
    element: <DashboardLayout allowedRoles={["author", "admin"]} />,
    children: [
      {
        index: true,
        element: <DashboardIndexArtikel />,
      },
      {
        path: "create",
        element: <DashboardIndexCreate />,
      },
    ],
  },
  {
    path: "test",
    element: <Test />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
