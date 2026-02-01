import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono";
import { insertCardSchema, insertCategorySchema } from "@flashcards/database/schema";
import { getCardByID, createNewCard, deleteCard, deleteCategory } from "@flashcards/database/queries"
import { getCategoryByID, createNewCategory } from "@flashcards/database/queries"
import { z } from "zod"

const createCardPublicSchema = insertCardSchema.omit({
    use_history: true,
    next_session: true
})

type createCardInput = z.infer<typeof createCardPublicSchema>


const app = new Hono()

app.get('/', (c) => c.json({message:'Hello Bun!'}))

app.get("/api/v1/card/:cardId", async (c) =>{
    const cardID = z.number().parse(c.req.param("cardId"))
    const card = await getCardByID(cardID)
    return c.json(card)
})

app.get("/api/v1/category/:categoryId", async (c)=>{
    const categoryId = z.number().parse(c.req.param("categoryId"))
    const category = await getCategoryByID(categoryId)

})

app.post("/api/v1/card", zValidator("json", createCardPublicSchema), async (c) => {
    const validatedInput = c.req.valid("json")
    const newCard = insertCardSchema.parse({
        ...validatedInput,
        use_history: {uses:[]},
        next_session: 0
    })
    const result = await createNewCard(newCard)
    return c.json({success:true, card: result[0]})
})

app.post("/api/v1/category", zValidator("json", insertCategorySchema), async (c) => {
    const validatedInput = c.req.valid("json")
    const result = await createNewCategory(validatedInput)
    return c.json({success:true, card: result[0]})
})

app.delete("/api/v1/card/:cardID", async (c)=>{
    const cardId = z.number().parse(c.req.param("cardID"))
    const result = await deleteCard(cardId)
    return c.json(result)
})

app.delete("/api/v1/category/:categoryID", async (c)=>{
    const categoryId = z.number().parse(c.req.param("categoryID"))
    const result = await deleteCategory(categoryId)
    return c.json(result)
})