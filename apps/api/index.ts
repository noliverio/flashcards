import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono";
import { insertCardSchema } from "@flashcards/database/schema/cards";
import { getCardByID } from "@flashcards/database/queries/cards"


const app = new Hono()

app.get('/', (c) => c.json({message:'Hello Bun!'}))

app.get("/api/v1/card/:cardId", async (c) =>{
    const cardIDStr = c.req.param("cardId")
    const cardID = Number(cardIDStr)
    const card = getCardByID(cardID)
    return c.json(card)})

app.post("api/v1/card/", zValidator("json", insertCardSchema), async(c) => {
    const validatedData = c.req.valid("json")
    await db.insert(cards).values(validatedData)
    return c.json({success:true})
})

export default app