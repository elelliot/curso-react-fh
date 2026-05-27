import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
// import { SearchPage } from "@/heroes/search/SearchPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
// import { AdminLayout } from "@/heroes/layouts/AdminLayout";

// eslint-disable-next-line react-refresh/only-export-components
const SearchPage = lazy(() => import("@/heroes/search/SearchPage")); // NOTE: Lazy loaded route (need to default export our route, but we'll get a eslint error)
// eslint-disable-next-line react-refresh/only-export-components
const AdminLayout = lazy(() => import("@/heroes/layouts/AdminLayout"));

//! Forma antigua de lazy load
// const SearchPage = lazy(() =>
//   import("@/heroes/search/SearchPage").then((module) => ({
//     default: module.SearchPage,
//   })),
// );

export const appRouter = createBrowserRouter([
  // Layout
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true, // Es la pagina principal del layout, no ocupamos poner el `path`
        element: <HomePage />,
      },
      {
        // Dynamic param
        path: "heroes/:idSlug", // Tampoco ocupamos poner el slash ya que el padre lo provee
        element: <HeroPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
