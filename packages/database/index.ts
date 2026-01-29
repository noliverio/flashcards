import { drizzle } from "drizzle-orm/bun-sqlite";
import {relations} from "./schema/relations"

export const db = drizzle("sqlite.db", { relations })