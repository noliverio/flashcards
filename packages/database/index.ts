import { drizzle } from "drizzle-orm/bun-sqlite";
import {relations} from "./schema/relations"


if (process.env.DB_URL == null) {
  console.log(process.env)
  throw new Error("Path to database not configured.")
}

export const db = drizzle(process.env.DB_URL, { relations })