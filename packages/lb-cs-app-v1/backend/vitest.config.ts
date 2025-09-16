import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "html"],
      lines: 70,
      functions: 70,
      statements: 70,
      branches: 70
    }
  }
});
