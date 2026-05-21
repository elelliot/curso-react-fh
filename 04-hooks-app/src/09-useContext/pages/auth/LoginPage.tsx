import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Iniciar Sesion</h1>
      <hr />

      <form className="flex flex-col gap-2 my-10">
        <Input type="numbner" placeholder="ID del Usuario" />

        <Button type="submit">Login</Button>

        <Link to="/about">
          <Button variant="ghost">Volver a la pagina principal</Button>
        </Link>
      </form>
    </div>
  );
};
