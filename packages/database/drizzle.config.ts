// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./schema/cards.ts",
  dbCredentials: {
    url:"sqlite.db"
  },
});
