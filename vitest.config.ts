import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { include: [process.env.BUILD_CHECK ? "tests/**/*.check.ts" : "tests/**/*.test.ts"] },
})
