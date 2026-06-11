import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appRouter } from "./app.router";
import { checkAuthAction } from "./auth/actions/check-auth.action";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";

const queryClient = new QueryClient();

// Si usamos `useQuery` de retornar los componentes, tenemos error, ya que el queryClient en ese punto ni siquiera esta montado en el arbol de componentes
const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthAction,
    retry: false, // Si falla esta peticion, es por que el token rip, asi que ni lo reintentes
    refetchInterval: 1000 * 60 * 60 * 1.5, // Como el token espira en 2 horas, podemos hacer un refetch en una hora y media para checar el status
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />

      {/* Para este punto, el query client ya esta instanciado, asi que podemos usar el `useQuery` y checar el status.
      ¿Pero por que wrapeamos el router? 
      por que ocuparemos saber el status para la autorizacion en las rutas... */}
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
