// Card.js — A reusable card component
// Props (inputs): title, description, actionText, actionLink
// "Props" are like function parameters — they let you reuse the same card with different content

export default function Card({ title, description, actionText, actionLink }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">

      <div className="h-40 bg-orange-100 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-5xl">🌾</span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{description}</p>

        {actionText && (
          <a href={actionLink || "#"} className="text-orange-500 dark:text-orange-400 font-semibold text-sm hover:underline">
            {actionText} →
          </a>
        )}
      </div>
    </div>
  );
}