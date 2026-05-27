import { Button } from "./button"
// import { selectCardSchema } from '@flashcards/database/schema'
// import { z } from "zod"

// type Card = z.infer<typeof selectCardSchema>
type Category = { id: string; name: string }

export function ListCategory({categories}:{categories:Category[]}){
  return (
<>
<h2 className="text-lg font-semibold mt-4">Categories</h2>
<ul className="mt-2 space-y-2">
  {categories.map((c) => (
    <li key={c.id} className="flex items-center justify-between">
      <span className="text-base">{c.name}</span>
      <button className="ml-3 text-red-600 hover:text-red-800">Delete</button>
    </li>
  ))}
</ul>
</>
  )
}

export function AddCategory(){
return(
<>
<Button label="Add Category"/>
</>
)
}

export function ManageCategory({categories}:{categories:Category[]}){
  return (
<section>
  <ListCategory categories={categories} />
  <AddCategory />
</section>
  )
}