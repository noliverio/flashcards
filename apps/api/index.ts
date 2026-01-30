import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono";
import { insertCardSchema } from "@flashcards/database/schema";
import { getCardByID, createNewCard } from "@flashcards/database/queries"
import { z } from "zod"

const createCardPublicSchema = insertCardSchema.omit({
    use_history: true,
    next_session: true
})

type createCardInput = z.infer<typeof createCardPublicSchema>


const app = new Hono()

app.get('/', (c) => c.json({message:'Hello Bun!'}))

app.get("/api/v1/card/:cardId", async (c) =>{
    const cardIDStr = c.req.param("cardId")
    const cardID = Number(cardIDStr)
    const card = await getCardByID(cardID)
    return c.json(card)
})

// app.post("api/v1/card", zValidator("json", createCardPublicSchema), async (c) => {
app.post("api/v1/card", zValidator("json", createCardPublicSchema), (c) => {
// app.post("api/v1/card", async(c) => {
    // console.log("entered function")
    // console.log("input:")
    console.log(c.req.json())
    // console.log("validating input")
    const validatedInput = c.req.valid("json")
    // const validatedInput = createCardPublicSchema.parse(await c.req.json())
    console.log("input:")
    console.log(validatedInput)
    const newCard = insertCardSchema.parse({
        ...validatedInput,
        use_history: {uses:[]},
        next_session: 0
    })
    const result = await createNewCard(newCard)
    return c.json({success:true, card: result})
})

export default app