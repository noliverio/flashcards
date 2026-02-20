import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono";
import { cors } from "hono/cors";
import { insertCardSchema, insertCategorySchema } from "@flashcards/database/schema";
import { getCardByID, createNewCard, deleteCard, deleteCategory } from "@flashcards/database/queries"
import { getCategoryByID, createNewCategory } from "@flashcards/database/queries"
import { z } from "zod"
import { httpInstrumentationMiddleware } from "@hono/otel";


const createCardPublicSchema = insertCardSchema.omit({
    use_history: true,
    next_session: true
})

type createCardInput = z.infer<typeof createCardPublicSchema>


const app = new Hono()
app.use(cors({origin: 'http://localhost:5173'}))
app.use(httpInstrumentationMiddleware({serviceName:"flashcards-api", serviceVersion: "0.0.1", captureRequestHeaders: ["user-agent", "service-name"]}))

// // // // // // //
// GET ENDPOINTS  //
// // // // // // //

app.get('/', (c) => c.json({message:'Hello Bun!'}))

app.get("/api/v1/card/:cardId", async (c) =>{
    try{
        const cardID = z.coerce.number().parse(c.req.param("cardId"))
        const card = await getCardByID(cardID)
        return c.json(card)
    } catch (e){
        return c.json({}, 400)
    }
})

app.get("/api/v1/categories", async (c) => {
    return c.json({})
})

app.get("/api/v1/category/:categoryId", async (c)=>{
    const categoryId = z.number().parse(c.req.param("categoryId"))
    const category = await getCategoryByID(categoryId)
    return c.json(category)  
})


// // // // // // //
// POST ENDPOINTS //
// // // // // // //


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


// // // // // // // //
//  DELETE ENDPOINTS //
// // // // // // // //


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

export default app