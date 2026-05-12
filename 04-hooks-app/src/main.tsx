import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FocusScreen } from "./04-useRef/FocusScreen";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FocusScreen />
  </StrictMode>,
);
