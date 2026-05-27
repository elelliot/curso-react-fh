import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appRouter } from "./router/app.router";

// 1- La instancia de react query
const queryClient = new QueryClient();

export const HeroesApp = () => {
  return (
    // 2- Debemos wrapear la app en el <QueryClientProvider /> con nuestro `queryClient`
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
      {/* 3- Las devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
