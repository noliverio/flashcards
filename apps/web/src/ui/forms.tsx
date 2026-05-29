import { createCategory } from "../lib/api-queries";
import { type iCategoryType } from "../lib/types";

export function NewCategoryForm() {
  function formHandler(formData: FormData) {
    const name = formData.get("name");
    const newCategory: iCategoryType = { category_name: name };
    createCategory(newCategory);
  }

  return (
    <>
      <form action={formHandler}>
        <input type="text" name="name" />
      </form>
    </>
  );
}
