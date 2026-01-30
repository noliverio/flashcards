import { selectCardSchema, insertCardSchema } from "@flashcards/database/schema"
import { z } from "zod"


const createCardPublicSchema = insertCardSchema.omit({
    use_history: true,
    next_session: true
})

type createCardInput = z.infer<typeof createCardPublicSchema>

const input: createCardInput = {
        question: "valēte",
        answer: "good-bye",
        category_key: 1,
    }

console.log("creating new card")
const newCard = await fetch("localhost:3000/api/v1/card", {
    method: "POST",
    body: JSON.stringify(input)
})

const newCardJson = await newCard.json()
console.log(newCardJson)
console.log("fetching new card")
const confirmation = await fetch(`localhost:3000/api/v1/card/11`)
console.log(await confirmation.json())