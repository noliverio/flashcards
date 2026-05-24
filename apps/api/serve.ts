import "./instrumentation.ts"
import app from "./index.ts"

const port = Number(process.env.PORT ?? 3000)

if (typeof Bun !== "undefined" && typeof Bun.serve === "function") {
  Bun.serve({
    port,
    fetch: app.fetch,
  })
} else {
  console.error("Bun runtime required. Start with `bun ./apps/api/serve.ts`.")
  if (typeof process !== "undefined" && process.exit) process.exit(1)
}
