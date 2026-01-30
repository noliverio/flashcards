import { db } from ".";
import { cards, categories } from "./schema/cards";
import { insertCategorySchema, insertCardSchema } from "./schema/cards";

console.log("preparing data")

const catObj = {
    id: 1,
    category_name: "Latin Vocabulary",
    session_number: 0,
    last_play_date: String(Date.now())
}

const insertCatParsed = insertCategorySchema.parse(catObj)
console.log("prepped category")
console.log(1)
const insertCard1Parsed = insertCardSchema.parse({
    id: 1,
    category_key:catObj.id,
    question:"nihil",
    answer:"nothing",
    use_history: {uses:[0]},
    next_session:1
})
console.log(2)

const insertCard2Parsed = insertCardSchema.parse({
    id: 2,
    category_key:catObj.id,
    question:"saepe",
    answer:"often",
    use_history:{uses:[0]},
    next_session:1
})
console.log(3)

const insertCard3Parsed = insertCardSchema.parse({
    id: 3,
    category_key:catObj.id,
    question:"laudāre,",
    answer:"to praise",
    use_history:{uses:[0]},
    next_session:1
})
console.log("prepped cards")

console.log("seeding db")
await db.insert(categories).values(insertCatParsed)

await db.insert(cards).values(insertCard1Parsed)

await db.insert(cards).values(insertCard2Parsed)

await db.insert(cards).values(insertCard3Parsed)
console.log("seeding complete")