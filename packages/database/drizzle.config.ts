import { defineConfig } from "drizzle-kit";

if (process.env.DB_URL == null) {
  throw new Error("Path to database not configured.")
}

export default defineConfig({
  dialect: "sqlite",
  schema: "./schema",
  dbCredentials: {
    url: process.env.DB_URL
  },
});
