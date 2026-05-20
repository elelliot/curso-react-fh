import { createBrowserRouter, Navigate } from "react-router";
import { AboutPage } from "../pages/about/AboutPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { LoginPage } from "../pages/auth/LoginPage";

// NOTE: React Router (sin react-router-dom) en modo Data (Basicamente como Vue Router) el declarativo es el de rutas como arbol de componentes de <Route />

// Creamos el router y lo usamos en la app
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AboutPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  // Si no existe, redirect to About using <Navigate />
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
