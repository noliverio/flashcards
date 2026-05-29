import { selectCardSchema } from "@flashcards/database/schema";
import { z } from "zod";

import { Button } from "./button";

type selCard = z.infer<typeof selectCardSchema>;

export function ListCards({ cards }: { cards: selCard[] }) {
  return (
    <>
      <h2 className="text-lg font-semibold mt-6">Cards</h2>
      <ul className="mt-2 space-y-3">
        {cards.map((card) => (
          <li
            key={card.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="font-semibold">{card.question}</div>
              <div className="text-sm text-gray-400">{card.answer}</div>
            </div>
            <button className="mt-2 sm:mt-0 ml-0 sm:ml-3 text-red-600 hover:text-red-800">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export function AddCard() {
  return (
    <>
      <Button label="Add Card" />
    </>
  );
}

export function ManageCards({ cards }: { cards: selCard[] }) {
  return (
    <section>
      <ListCards cards={cards} />
      <AddCard />
    </section>
  );
}
