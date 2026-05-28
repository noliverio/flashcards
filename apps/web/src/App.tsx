import CardUI from "./ui/card";
import "./App.css";
import { getCard } from "./lib/api-queries";
import { useEffect, useState } from "react";
import { type sCardType } from "./lib/types";
import Management from "./Management";

export function App() {
  const [card, setCard] = useState<sCardType | undefined>();
  const [cardID, setCardID] = useState<number>(1);
  const [showManagement, setShowManagement] = useState(false);

  useEffect(() => {
    async function _() {
      const eCard = await getCard(cardID);
      if (!ignore) {
        setCard(eCard);
      }
    }

    let ignore = false;
    _();
    return () => {
      ignore = true;
    };
  }, [cardID]);

  return (
    <div>
      {showManagement ? (
        <Management onClose={() => setShowManagement(false)} />
      ) : (
        <>
          <div style={{ marginBottom: "1rem" }}>
            {/* <form action={updateCard}> */}
            <form
              action={(formData: FormData) => {
                const id = formData.get("cardID") as string;
                const idNum = parseInt(id);
                setCardID(idNum);
              }}
            >
              <label>
                Card ID:
                <input type="number" defaultValue={cardID} name="cardID" />
              </label>
              {/* <input type="submit"></input> */}
              <button type="submit">Fetch</button>
            </form>
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
          <button type="button" onClick={() => setShowManagement(true)}>
            Management
          </button>
        </>
      )}
    </div>
  );
}
