import CardUI from './ui/card'
import './App.css'
import { getCard } from './lib/api-queries'
import { useEffect } from 'react'

function App() {
  
  useEffect(()=>{
    const card = getCard(1)
    return ()=>
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

export default App
