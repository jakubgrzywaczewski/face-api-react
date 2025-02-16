import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/face-api-react/" : "/",
  build: {
    outDir: "dist",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
