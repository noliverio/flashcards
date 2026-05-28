import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: false,
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      enabled: true,
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage",
      include: ["queries/**/*.ts", "schema/**/*.ts"],
      exclude: ["index.ts", "tests/**", "node_modules/**"],
    },
  },
});
