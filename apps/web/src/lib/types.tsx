import { z } from "zod";
import {
  selectCardSchema,
  selectCategorySchema,
  insertCardSchema,
  insertCategorySchema,
} from "@flashcards/database/schema";

export type sCategoryType = z.infer<typeof selectCategorySchema>;
export type iCategoryType = z.infer<typeof insertCategorySchema>;
export type sCardType = z.infer<typeof selectCardSchema>;
export type iCardType = z.infer<typeof insertCardSchema>;
