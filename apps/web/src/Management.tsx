import { ManageCards } from "./ui/manage-cards";
import { ManageCategory } from "./ui/manage-categories";
import { selCards, selCategories } from "./lib/mocks.tsx"

export default function Management({ onClose }: { onClose?: () => void }) {
  return (
    <div className="p-6 font-sans max-w-4xl mx-auto" data-testid="management-root">
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

      <ManageCategory categories={selCategories} />
      <ManageCards cards={selCards} />
    </div>
  )
}
