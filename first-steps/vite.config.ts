import { defineConfig } from "vitest/config";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  // Config para testing (cambiemos el `defineConfig` de `vite` por el de `vitest/config`)... al correr el test, nos pedira instalar 'jsdom', damos que si
  test: {
    environment: "jsdom",
    globals: true,
  },
});
