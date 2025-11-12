import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  base: "./", // Usar rutas relativas
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist", // Carpeta de salida para el build
    assetsDir: "assets",
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));