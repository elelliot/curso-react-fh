/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";

// import { AuthLayout } from "./auth/layouts/AuthLayout";
// import { AdminLayout } from "./admin/layouts/AdminLayout";

const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));

export const appRouter = createBrowserRouter([
  // Main Routes
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:idSlug", element: <ProductPage /> },
      { path: "gender/:gender", element: <GenderPage /> },
    ],
  },
  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      // Redirecciona automaticamente a login cuando entremos a `/auth`
      { index: true, element: <Navigate to="auth/login" /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      // Como es admin panel, no importa usar el id normal, un SlugId sirve para dar mejor UX, y los bots de google lo aprecian mas
      {
        path: "products/:id",
        element: <AdminProductPage />,
      },
    ],
  },

  // Comodin por si no existe alguna ruta
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
