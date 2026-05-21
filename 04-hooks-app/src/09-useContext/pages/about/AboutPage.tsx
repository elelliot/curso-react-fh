import { Link } from "react-router";

export const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Pagina sobre mi</h1>

      <div className="flex flex-col ga-2">
        <Link to="/profile" className="hover:text-blue-500 underline text-2xl">
          Perfil
        </Link>
        <Link to="/login" className="hover:text-blue-500 underline text-2xl">
          Iniciar Sesion
        </Link>
      </div>
    </div>
  );
};
