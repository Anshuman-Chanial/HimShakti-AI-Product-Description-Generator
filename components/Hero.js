// Hero.js — The big banner section on the Home page
// Has: headline, subheadline, and a CTA button

export default function Hero() {
  return (
    <section className="bg-orange-50 dark:bg-gray-900 py-20 px-6 text-center transition-colors">
      
      {/* Main headline */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        AI-Powered Product Descriptions{" "}
        <span className="text-orange-500">for Himalayan Foods</span>
      </h1>

      {/* Subheadline */}
      <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
        Help HimShakti Food Processing Unit create professional, 
        platform-ready product listings for Amazon.in and Flipkart — in seconds.
      </p>

      {/* CTA Button */}
      <a
        href="/generate"
        className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 inline-block"
      >
        Try It Now →
      </a>

    </section>
  );
}