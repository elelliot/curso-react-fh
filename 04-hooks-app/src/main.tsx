import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TrafficLightWithHook />
  </StrictMode>,
);
