import { defineRelations } from "drizzle-orm";

import * as schema from "./cards";

export const relations = defineRelations(schema, (r) => ({
  cards: {
    category: r.one.categories({
      from: r.cards.category_key,
      to: r.categories.id,
    }),
  },
  categories: {
    cards: r.many.cards(),
  },
}));
