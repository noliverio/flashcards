import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono";
import { insertCardSchema, insertCategorySchema } from "@flashcards/database/schema";
import { getCardByID, createNewCard, deleteCard, deleteCategory } from "@flashcards/database/queries"
import { getCategoryByID, createNewCategory } from "@flashcards/database/queries"
import { z } from "zod"

import opentelemetry from "@opentelemetry/api"
import {trace, SpanStatusCode, type Span} from "@opentelemetry/api"

export const tracer = opentelemetry.trace.getTracer("flashcards-api", "0.0.1")


const createCardPublicSchema = insertCardSchema.omit({
    use_history: true,
    next_session: true
})

type createCardInput = z.infer<typeof createCardPublicSchema>


const app = new Hono()

app.get('/', (c) => c.json({message:'Hello Bun!'}))

app.get("/api/v1/card/:cardId", async (c) =>{
    return tracer.startActiveSpan("getCard", async (span:Span) =>{
        try{
            const cardID = z.coerce.number().parse(c.req.param("cardId"))
            span.setAttribute("cardID", cardID.toString())
            const card = await getCardByID(cardID)
            span.end()
            return c.json(card)
        } catch (e){
            // TODO: find package to replace http status code numbers with semantic values.
            if (e instanceof Error){
                span.recordException(e)
            }
            span.setStatus({code: SpanStatusCode.ERROR})
            return c.json({}, 400)
        }
    })
})

app.get("/api/v1/category/:categoryId", async (c)=>{
    return tracer.startActiveSpan("getCategory", async (span: Span)=>{
        const categoryId = z.number().parse(c.req.param("categoryId"))
        span.setAttribute("catedoryID", categoryId.toString())
        const category = await getCategoryByID(categoryId)
        span.end()
        return c.json(category)  
    })
})

app.post("/api/v1/card", zValidator("json", createCardPublicSchema), async (c) => {
    return tracer.startActiveSpan("createCard", async (span:Span) =>{
        const validatedInput = c.req.valid("json")
        span.setAttribute("category", validatedInput.category_key)
        span.setAttribute("question", validatedInput.question)
        span.setAttribute("answer", validatedInput.answer)
        const newCard = insertCardSchema.parse({
            ...validatedInput,
            use_history: {uses:[]},
            next_session: 0
        })
        const result = await createNewCard(newCard)
        span.end()
        return c.json({success:true, card: result[0]})
    })
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

export default app