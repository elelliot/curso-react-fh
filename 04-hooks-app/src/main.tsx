import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TrafficLight } from "./01-useState/TrafficLight";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TrafficLight />
  </StrictMode>,
);
