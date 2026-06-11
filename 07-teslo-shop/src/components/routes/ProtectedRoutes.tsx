import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/auth/store/auth.store";

// NOTE: Protegemos rutas que ocupan que el usuario este logueado (Rutas Privadas, opcional de momento por que solo hay Admin Routes que proteger)
export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  if (authStatus === "checking") return null; // NOTE: Regresa pagina en blanco, se puede poner un spinner o algo pero ya tenemos <CheckAuthProvider /> para eso y agregar otro taria raron
  if (authStatus === "not-authenticated") return <Navigate to="/auth/login" />;

  return children;
};

// Protegemos rutas publicas que el user no debería ver estando logueado (por ejemplo el Login o Register)
export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  if (authStatus === "checking") return null;
  if (authStatus === "authenticated") return <Navigate to="/" />;

  return children;
};

// NOTE: Protegemos Admin routes
export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { authStatus, isAdmin } = useAuthStore();
  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated") return <Navigate to="/auth/login" />;
  if (!isAdmin()) return <Navigate to="/" />;

  return children;
};
