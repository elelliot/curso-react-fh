import { Button } from "@/components/ui/button";

export const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Perfil del usuario</h1>

      <hr />

      <pre className="my-4">{JSON.stringify({}, null, 2)}</pre>

      <Button variant="destructive">Salir</Button>
    </div>
  );
};
