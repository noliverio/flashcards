import { db } from "..";
import { desc } from "drizzle-orm";
import { selectCardSchema, insertCardSchema } from "../schema";
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
    // const result = await db.transaction(async (tx)=>{
    //     const lastCard = await tx.select().from(cards).limit(1).orderBy(desc(cards.id))
    //     const lastCardId = selectCardSchema.parse(lastCard).id
    //     validated.id = lastCardId + 1
    //     tx.insert(cards).values(validated) 
    // })
    return result
}
