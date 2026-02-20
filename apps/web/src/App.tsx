import CardUI from './ui/card'
import './App.css'
import { getCard } from './lib/api-queries'
import { useEffect, useState } from 'react'
import { type selectCardSchema } from '@flashcards/database/schema'
import { z } from "zod"

type cardType = z.infer<typeof selectCardSchema>

function App() {
  const blankCard: cardType|null = null
  const [card, setCard] = useState(blankCard)

  useEffect(()=>{
    async function _ (){
      const eCard = await getCard(1)
      
      if (! ignore) { 
        setCard(eCard)
      }
    }

    let ignore = false
    _()
    return ()=>{
      ignore = true
    }
  })

  // const card = await getCard(1)
  console.log(1)
  // if (typeof card == "undefined"){
  //   return (
  //     <p>Could not get card</p>
  //   )
  // }
  console.log(2)
  return (
    <div>
    <h1>Wave!</h1>
    <CardUI card={card} startWithQuestion={true}></CardUI>
    </div>
  )
}