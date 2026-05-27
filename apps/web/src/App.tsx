import CardUI from './ui/card'
import './App.css'
import { getCard } from './lib/api-queries'
import { useEffect, useState, useRef } from 'react'
import { selectCardSchema } from '@flashcards/database/schema'
import { z } from "zod"
import Management from './ui/Management'

type cardType = z.infer<typeof selectCardSchema>

export function App() {
  const [card, setCard] = useState<cardType | undefined>()
  const [cardIDInput, setCardIDInput] = useState<string>('1')
  const mountedRef = useRef(true)
  const [showManagement, setShowManagement] = useState(false)

  const fetchCardById = async (id: number) => {
    const eCard = await getCard(id)
    if (mountedRef.current) {
      setCard(eCard)
    }
  }

  useEffect(() => {
    fetchCardById(1)
    return () => {
      mountedRef.current = false
    }
  }, [])

  return (
    <div>
      {showManagement ? (
        <Management onClose={() => setShowManagement(false)} />
      ) : (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Card ID:&nbsp;
              <input
                type="number"
                value={cardIDInput}
                onChange={(e) => setCardIDInput(e.target.value)}
              />
            </label>
            <button
              onClick={() => {
                const id = parseInt(cardIDInput, 10)
                if (!Number.isNaN(id)) {
                  void fetchCardById(id)
                }
              }}
            >
              Fetch
            </button>
            <button type="button" onClick={() => setShowManagement(true)}>Management</button>
          </div>

          {!card ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            <div>
              <CardUI card={card} startWithQuestion={true} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
