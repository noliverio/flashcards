import { db } from "..";
import { selectCardSchema, insertCardSchema } from "../schema/cards";
import { cards, categories } from "../schema/cards";
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
    const result = db.insert(cards).values(validated)
    return result
}