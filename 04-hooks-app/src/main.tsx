import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoHook } from "./06-memos/MemoHook";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoHook />
  </StrictMode>,
);
