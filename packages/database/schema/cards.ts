import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
import { createInsertSchema, createSelectSchema  } from "drizzle-zod"


export const cardTable = sqliteTable("cards", {
    id: integer("id").primaryKey({"autoIncrement": true}),
    category: integer().references(()=>categoryTable.id),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    use_history: text().default(JSON.stringify({"uses": []})),
    next_session: integer().notNull()
})

export const categoryTable = sqliteTable("categories", {
    id: integer("id").primaryKey({"autoIncrement": true}),
    category_name: text("category").notNull(),
    session_number: integer().default(0),
    last_play_date: text().default(sql`(current_timestamp)`)
})

export const selectCardSchema = createSelectSchema(cardTable)
export const selectCategorySchema = createSelectSchema(categoryTable)

export const insertCardSchema = createInsertSchema(cardTable, {

})

export const insertCategorySchema = createInsertSchema(categoryTable, {
    
})