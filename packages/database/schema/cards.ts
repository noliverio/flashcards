import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql, defineRelations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema  } from "drizzle-zod"
import { z } from "zod"

const useHistoryFormat = z.object({uses: z.array(z.number())}, "invalid use history format")

export const cards = sqliteTable("cards", {
    id: integer("id").primaryKey({autoIncrement:true}),
    category_key: integer().references(()=>categories.id, {onDelete: "cascade"}).notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    use_history: text({mode:"json"}),
    next_session: integer().notNull()
})

export const categories = sqliteTable("categories", {
    id: integer("id").primaryKey({autoIncrement: true}),
    category_name: text("category").notNull(),
    session_number: integer().default(0).notNull(),
    last_play_date: text().default(sql`(current_timestamp)`).notNull()
})

export const selectCategorySchema = createSelectSchema(categories)

export const insertCategorySchema = createInsertSchema(categories)

export const selectCardBaseSchema = createSelectSchema(cards, {
    use_history: useHistoryFormat
})
export const updateCardSchema = createInsertSchema(cards, {
    use_history: useHistoryFormat
})

export const insertCardSchema = updateCardSchema.omit({"id":true})

export const selectCardSchema = selectCardBaseSchema.extend({
    category: selectCategorySchema
})
