import { selectCardBaseSchema, insertCardSchema } from "@flashcards/database/schema"
import { z } from "zod"


const createCardPublicSchema = insertCardSchema.omit({
    use_history: true,
    next_session: true
})

type createCardInput = z.infer<typeof createCardPublicSchema>

const input: createCardInput = {
        question: "monēre",
        answer: "to remind, advise, warn",
        category_key: 1,
    }

console.log("creating new card")
const newCard = await fetch("localhost:3000/api/v1/card", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
        "Content-Type": "application/json",
    },
})
const unparsed: any = await newCard.json()
// console.log(unparsed.card[0])
const newCardJson = selectCardBaseSchema.parse(unparsed.card)
console.log(newCardJson)
const getURL = `localhost:3000/api/v1/card/${newCardJson.id}`
console.log(getURL)
console.log("fetching new card")
const confirmation = await fetch(getURL)
console.log(confirmation)
console.log(await confirmation.json())