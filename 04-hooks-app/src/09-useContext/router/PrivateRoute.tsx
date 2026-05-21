import { use, type JSX } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface Props {
  element: JSX.Element; // ReactNode tambien puede ser
}

// Con este componente podemos validar si el user esta autenticado y y asi poder redirigirlo a la pagina, de lo contrario lo mandamos al login, asi evitamos hacer esas verificaciones en las mismas paginas
export const PrivateRoute = ({ element }: Props) => {
  const { authStatus } = use(UserContext);

  if (authStatus === "checking") {
    return <div>Cargando Padre bello...</div>; // o podemos retornar `null` por si no queremos mostrar nada
  }

  if (authStatus === "authenticated") {
    return element;
  }

  return <Navigate to="/login" replace />;
};
