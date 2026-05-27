import { selectCardSchema } from "@flashcards/database/schema";

const baseAPIPath = "http://localhost:3000"

export async function getCategories() {
    const path = `${baseAPIPath}/api/v1/categories`
    const resp = await fetch(path)
    if (( 300 <= resp.status) || (resp.status <= 199)){
        // TODO replace magic numbers
        return
    }
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