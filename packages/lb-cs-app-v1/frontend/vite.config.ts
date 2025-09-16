import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/": path.resolve(__dirname, "src") + "/"
    }
  },
  server: {
    proxy: {
      "/api": { target: "http://localhost:3005", changeOrigin: true }
    }
  },
  test: {
    environment: "jsdom",
    globals: true, // <-- necessario per expect globale    
    coverage: {
      reporter: ["text", "html"],
      lines: 70,
      functions: 70,
      statements: 70,
      branches: 70
    },
    setupFiles: ["./vitest.setup.ts"]
  }
});


