import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Config para testing (cambiemos el `defineConfig` de `vite` por el de `vitest/config`)... al correr el test, nos pedira instalar 'jsdom', damos que si
  test: {
    environment: "jsdom",
    globals: true,
  },
});
