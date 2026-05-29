import { useEffect, useState } from "react";

import { getCategories } from "./lib/api-queries.ts";
import { selCards } from "./lib/mocks.tsx";
import { type sCategoryType } from "./lib/types.tsx";
import { ManageCards } from "./ui/manage-cards";
import { ManageCategory } from "./ui/manage-categories";

export default function Management({ onClose }: { onClose?: () => void }) {
  const [categories, setCategories] = useState<sCategoryType[] | undefined>();

  useEffect(() => {
    async function _() {
      const i = await getCategories();
      if (!ignore) {
        setCategories(i);
      }
    }
    let ignore = false;
    _();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div
      className="p-6 font-sans max-w-4xl mx-auto"
      data-testid="management-root"
    >
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Management</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Close
          </button>
        )}
      </header>
      {categories === undefined ? (
        <p> No categories found</p>
      ) : (
        <ManageCategory categories={categories} />
      )}
      <ManageCards cards={selCards} />
    </div>
  );
}
