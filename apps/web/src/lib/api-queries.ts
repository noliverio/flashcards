// import { selectCardSchema } from "@flashcards/database/schema";
import { selectCardSchema, selectCategorySchema } from "@flashcards/database/schema";
import type { iCategoryType } from "./types";

const baseAPIPath = "http://localhost:3000"

export async function getCardsByCategory(category: string){
// take a category id, return all cards with that id.
//
console.log(category)
}

export async function getCategories() {
    const categories = []
    const path = `${baseAPIPath}/api/v1/categories`
    const resp = await fetch(path)
    const categoriesJSON = await resp.json()
    if (( 300 <= resp.status) || (resp.status <= 199)){
        return
    }
    for (const categoryJSON of categoriesJSON){
        categories.push(selectCategorySchema.parse(categoryJSON))
    }
    return categories
}

export async function getCard(cardID: number) {
    const path = `${baseAPIPath}/api/v1/card/${cardID}`
    const resp = await fetch(path)
    const cardJSON = await resp.json()
    if (( 300 <= resp.status) || (resp.status <= 199)){
        // TODO replace magic numbers
        return
    }
    const card = selectCardSchema.parse(cardJSON)
    return card
}

export async function createCard(newCard:string){
    const path = `${baseAPIPath}/api/v1/card`
    const resp = await fetch(path, {
        method: "POST",
        body:JSON.stringify(newCard)
    })
    if (( 300 <= resp.status) || (resp.status <= 199)){
        // TODO replace magic numbers
        return
    }
}

export async function createCategory(newCategory:iCategoryType){
    const path = `${baseAPIPath}/api/v1/category`
    const resp = await fetch(path, {
        method: "POST",
        body: JSON.stringify(newCategory)
    })
    if (( 300 <= resp.status) || (resp.status <= 199)){
        // TODO replace magic numbers
        return false
    }
    return true
}