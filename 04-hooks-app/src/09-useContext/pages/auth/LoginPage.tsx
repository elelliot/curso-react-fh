import { useContext, useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/09-useContext/context/UserContext";
import { toast } from "sonner";

export const LoginPage = () => {
  const navigation = useNavigate();
  const { login } = useContext(UserContext); //* Consumimos el Context que creamos

  const [userId, setUserId] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = login(+userId);
    if (!result) {
      toast.error("Usuario no encontrado");
      return;
    }

    navigation("/profile");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Iniciar Sesion</h1>
      <hr />

      <form className="flex flex-col gap-2 my-10" onSubmit={handleSubmit}>
        <Input
          type="numbner"
          placeholder="ID del Usuario"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />

        <Button type="submit">Login</Button>

        <Link to="/about">
          <Button variant="ghost">Volver a la pagina principal</Button>
        </Link>
      </form>
    </div>
  );
};
