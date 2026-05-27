import { ManageCards } from "./ui/manage-cards";
import { ManageCategory } from "./ui/manage-categories";



type Card = { id: string; question: string; answer: string; categoryId: string }
type Category = { id: string; name: string }

const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Math' },
  { id: 'cat-2', name: 'Science' },
]

const mockCards: Card[] = [
  { id: 'card-1', question: '2+2', answer: '4', categoryId: 'cat-1' },
  { id: 'card-2', question: 'What is H2O?', answer: 'Water', categoryId: 'cat-2' },
]

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

      <ManageCategory categories={mockCategories} />
      <ManageCards cards={mockCards} />
    </div>
  )
}
