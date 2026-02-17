import { db } from "..";
import { desc } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { selectCardSchema, insertCardSchema, selectCategorySchema, insertCategorySchema } from "../schema";
import { cards, categories } from "../schema";
import { z } from "zod"
import opentelemetry from "@opentelemetry/api"
import {trace, type Span} from "@opentelemetry/api"

const tracer = opentelemetry.trace.getTracer("flashcard-db-lib", "0.0.1")


export async function getCardByID(cardID: string| number){
    return tracer.startActiveSpan("getCardByID", async (span: Span)=>{
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
        span.end()
        return validated
    })
}

export async function createNewCard(card:z.infer<typeof insertCardSchema>){
    return tracer.startActiveSpan("createNewCard", async (span: Span) =>{
        const validated = insertCardSchema.parse(card)
        const result = await db.insert(cards).values(validated).returning()
        span.end()
        return result
    })
}

export async function getCategoryByID(categoryId: string | number){
    return tracer.startActiveSpan("getCategoryByID", async(span: Span) =>{
        if (typeof categoryId == "string"){
            categoryId = z.number().parse(categoryId)
        }
        const category_rows = await db.select().from(categories).where(eq(categories.id, categoryId))
        if(category_rows.length == 0){
            return null
        }
        const validated = selectCategorySchema.parse(category_rows[0])
        span.end()
        return validated
    })

}

export async function createNewCategory(category: z.infer<typeof insertCategorySchema>){
    return tracer.startActiveSpan("createNewCategory", async (span:Span)=> {
        const validated = insertCategorySchema.parse(category)
        const result = await db.insert(categories).values(validated).returning()
        span.end()
        return result
    })
}

export async function deleteCard(cardID: string|number) {
    return tracer.startActiveSpan("deleteCard", async(span: Span)=>{
        cardID = z.number().parse(cardID)
        const result = await db.delete(cards).where(eq(cards.id, cardID)).returning()
        span.end()
        return result
    })
}

export async function deleteCategory(categoryId: string| number){
    return tracer.startActiveSpan("deleteCategory", async (span: Span) => {
        categoryId = z.number().parse(categoryId)
        await db.delete(cards).where(eq(cards.category_key, categoryId))
        const result = await db.delete(categories).where(eq(categories.id, categoryId)).returning()
        span.end()
        return result
    })
}