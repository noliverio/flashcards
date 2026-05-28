import {
  insertCardSchema,
  selectCardSchema,
} from "@flashcards/database/schema";
import {
  type sCardType,
  type sCategoryType,
  type iCardType,
  type iCategoryType,
} from "./types";

const insCat1Obj = {
  id: 1,
  category_name: "Latin Vocabulary",
  session_number: 0,
  last_play_date: String(Date.now()),
};

const insCat2Obj = {
  id: 1,
  category_name: "Latin Grammar",
  session_number: 0,
  last_play_date: String(Date.now()),
};

const insertCard1Parsed = insertCardSchema.parse({
  id: 1,
  category_key: insCat1Obj.id,
  question: "nihil",
  answer: "nothing",
  use_history: { uses: [0] },
  next_session: 1,
});

const insertCard2Parsed = insertCardSchema.parse({
  id: 2,
  category_key: insCat1Obj.id,
  question: "saepe",
  answer: "often",
  use_history: { uses: [0] },
  next_session: 1,
});
console.log(3);

const insertCard3Parsed = insertCardSchema.parse({
  id: 3,
  category_key: insCat1Obj.id,
  question: "laudāre,",
  answer: "to praise",
  use_history: { uses: [0] },
  next_session: 1,
});

export const insCategories: iCategoryType[] = [insCat1Obj, insCat2Obj];
export const insCards: iCardType[] = [
  insertCard1Parsed,
  insertCard2Parsed,
  insertCard3Parsed,
];

const selCat1Obj = {
  id: 1,
  category_name: "Latin Vocabulary",
  session_number: 0,
  last_play_date: String(Date.now()),
};

const selCat2Obj = {
  id: 1,
  category_name: "Latin Grammar",
  session_number: 0,
  last_play_date: String(Date.now()),
};

const selectCard1Parsed = selectCardSchema.parse({
  id: 1,
  category_key: insCat1Obj.id,
  question: "nihil",
  answer: "nothing",
  use_history: { uses: [0] },
  next_session: 1,
  category: selCat1Obj,
});

const selectCard2Parsed = selectCardSchema.parse({
  id: 2,
  category_key: insCat1Obj.id,
  question: "saepe",
  answer: "often",
  use_history: { uses: [0] },
  next_session: 1,
  category: selCat1Obj,
});
console.log(3);

const selectCard3Parsed = selectCardSchema.parse({
  id: 3,
  category_key: insCat1Obj.id,
  question: "laudāre,",
  answer: "to praise",
  use_history: { uses: [0] },
  next_session: 1,
  category: selCat1Obj,
});

export const selCategories: sCategoryType[] = [selCat1Obj, selCat2Obj];
export const selCards: sCardType[] = [
  selectCard1Parsed,
  selectCard2Parsed,
  selectCard3Parsed,
];
