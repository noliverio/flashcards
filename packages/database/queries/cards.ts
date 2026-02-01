import { db } from "..";
import { desc } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { selectCardSchema, insertCardSchema, selectCategorySchema, insertCategorySchema } from "../schema";
import { cards, categories } from "../schema";
import { z } from "zod"

export async function getCardByID(cardID: string| number){
    if (typeof cardID == "string"){
        cardID = Number(cardID)
    }
    const card_rows = await db.query.cards.findMany({
        where: {
            id:cardID
        },
        with:{
            category:true
        }
    })
    if (card_rows.length == 0){
        return null
    }
    const card = card_rows[0]
    const validated = selectCardSchema.parse(card)
    return validated
}

export async function createNewCard(card:z.infer<typeof insertCardSchema>){
    const validated = insertCardSchema.parse(card)
    const result = await db.insert(cards).values(validated).returning()
    return result
}

export async function getCategoryByID(categoryId: string | number){
    if (typeof categoryId == "string"){
        categoryId = z.number().parse(categoryId)
    }
    const category_rows = await db.select().from(categories).where(eq(categories.id, categoryId))
    if(category_rows.length == 0){
        return null
    }
    const validated = selectCategorySchema.parse(category_rows[0])
    return validated

}

export async function createNewCategory(category: z.infer<typeof insertCategorySchema>){
    const validated = insertCategorySchema.parse(category)
    const result = await db.insert(categories).values(validated).returning()
    return result
}

export async function deleteCard(cardID: string|number) {
    cardID = z.number().parse(cardID)
    const result = await db.delete(cards).where(eq(cards.id, cardID)).returning()
    return result
}

export async function deleteCategory(categoryId: string| number){
    categoryId = z.number().parse(categoryId)
    await db.delete(cards).where(eq(cards.category_key, categoryId))
    const result = await db.delete(categories).where(eq(categories.id, categoryId)).returning()
    return result
}