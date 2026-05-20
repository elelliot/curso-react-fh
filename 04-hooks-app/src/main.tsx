import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import { ProfessionalApp } from "./09-useContext/ProfessionalApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <ProfessionalApp />
  </StrictMode>,
);

// Use API and <Suspense /> example
// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <Toaster />
//     <Suspense
//       fallback={
//         <div className="bg-gradient flex flex-col gap-4">
//           <h1 className="text-2xl">Cargando</h1>
//         </div>
//       }
//     >
//       {/* Podemos mandar un `Usable` que seria una funcion `async` en este caso */}
//       <ClientInformation getUser={getUserAction(1000)} />
//     </Suspense>
//   </StrictMode>,
// );
