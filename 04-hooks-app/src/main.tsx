import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoCounter } from "./06-memos/MemoCounter";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoCounter />
  </StrictMode>,
);
