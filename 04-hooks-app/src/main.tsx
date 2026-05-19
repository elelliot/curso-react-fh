import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { InstagromApp } from "./07-useOptimistic/InstagromApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InstagromApp />
  </StrictMode>,
);
