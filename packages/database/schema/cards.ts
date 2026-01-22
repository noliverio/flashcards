import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema  } from "drizzle-zod"


export const cardTable = sqliteTable("cards", {
    id: integer("id").primaryKey({"autoIncrement": true}),
    category: text("category").notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull()
})

export const cardUseTable = sqliteTable("card-use",{
    cardId: integer().primaryKey(),
    use_history: text().notNull(),
    next_session: integer().notNull()
})