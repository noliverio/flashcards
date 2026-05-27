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

      <section>
        <h2 className="text-lg font-semibold mt-4">Categories</h2>
        <ul className="mt-2 space-y-2">
          {mockCategories.map((c) => (
            <li key={c.id} className="flex items-center justify-between">
              <span className="text-base">{c.name}</span>
              <button className="ml-3 text-red-600 hover:text-red-800">Delete</button>
            </li>
          ))}
        </ul>
        <button className="mt-3 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Add Category</button>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">Cards</h2>
        <ul className="mt-2 space-y-3">
          {mockCards.map((card) => (
            <li key={card.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-semibold">{card.question}</div>
                <div className="text-sm text-gray-400">{card.answer}</div>
              </div>
              <button className="mt-2 sm:mt-0 ml-0 sm:ml-3 text-red-600 hover:text-red-800">Delete</button>
            </li>
          ))}
        </ul>
        <button className="mt-3 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Add Card</button>
      </section>
    </div>
  )
}
