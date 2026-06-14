// Card.js — A reusable card component
// Props (inputs): title, description, actionText, actionLink
// "Props" are like function parameters — they let you reuse the same card with different content

export default function Card({ title, description, actionText, actionLink }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      
      {/* Top colored banner (placeholder for product image) */}
      <div className="h-40 bg-orange-100 flex items-center justify-center">
        <span className="text-5xl">🌾</span>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        
        {/* Only show the link if actionText is provided */}
        {actionText && (
          <a
            href={actionLink || "#"}
            className="text-orange-500 font-semibold text-sm hover:underline"
          >
            {actionText} →
          </a>
        )}
      </div>

    </div>
  );
}