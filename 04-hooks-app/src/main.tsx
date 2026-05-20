import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { ClientInformation } from "./08-use-suspense/ClientInformation";

import "./index.css";
import { getUserAction } from "./08-use-suspense/api/get-user.action";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <Suspense
      fallback={
        <div className="bg-gradient flex flex-col gap-4">
          <h1 className="text-2xl">Cargando</h1>
        </div>
      }
    >
      {/* Podemos mandar un `Usable` que seria una funcion `async` en este caso */}
      <ClientInformation getUser={getUserAction(1000)} />
    </Suspense>
  </StrictMode>,
);
