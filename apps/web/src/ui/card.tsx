import { selectCardSchema } from "@flashcards/database/schema";
import { useState } from "react";
import { z } from "zod";

type card = z.infer<typeof selectCardSchema>;

export default function CardUI({
  card,
  startWithQuestion,
}: {
  card: card;
  startWithQuestion: boolean;
}) {
  const [showAnswer, setCardState] = useState(startWithQuestion);

  return (
    <>
      <div
        className="flex"
        onClick={() => {
          setCardState(!showAnswer);
        }}
      >
        {showAnswer ? <p>{card.answer}</p> : <p>{card.question}</p>}
      </div>
    </>
  );
}
