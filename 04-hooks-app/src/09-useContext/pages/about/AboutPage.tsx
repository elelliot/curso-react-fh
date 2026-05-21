import { use } from "react";
import { Link } from "react-router";
import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";

export const AboutPage = () => {
  const { isAuthenticated, logout } = use(UserContext);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Pagina sobre mi</h1>

      <div className="flex flex-col ga-2">
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="hover:text-blue-500 underline text-2xl"
            >
              Perfil
            </Link>

            <Button variant="destructive" className="mt-4" onClick={logout}>
              Salir
            </Button>
          </>
        ) : (
          <Link to="/login" className="hover:text-blue-500 underline text-2xl">
            Iniciar Sesion
          </Link>
        )}
        {/* <Link to="/profile" className="hover:text-blue-500 underline text-2xl">
          Perfil
        </Link>
        <Link to="/login" className="hover:text-blue-500 underline text-2xl">
          Iniciar Sesion
        </Link> */}
      </div>
    </div>
  );
};
