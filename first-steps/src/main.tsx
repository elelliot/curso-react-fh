import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FirstStepsApp } from "./FirstStepsApp";
// import { MyAwesomeApp } from "./MyAwesomeApp";

createRoot(document.getElementById("root")!).render(
  // El StrictMode es lo que hace que react corra 2 veces, para evitar efectos secundarios
  <StrictMode>
    <FirstStepsApp />
    {/* <MyAwesomeApp /> */}
  </StrictMode>,
);
