// Navbar.js — The top navigation bar shown on every page
// It has: logo on left, navigation links in middle, CTA button on right

import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between transition-colors">
      
      {/* Logo on the left */}
      <div className="text-orange-500 font-bold text-xl">
        🌿 HimShakti AI
      </div>

      {/* Navigation links in the middle */}
      <div className="flex gap-6">
        {/* <a href="/" className="text-gray-700 hover:text-orange-500 font-medium">
          Home
        </a>
        <a href="/generate" className="text-gray-700 hover:text-orange-500 font-medium">
          Generate
        </a>
        <a href="/about" className="text-gray-700 hover:text-orange-500 font-medium">
          About
        </a> */}
        <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium">
          Home
        </a>
        <a href="/generate" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium">
          Generate
        </a>
        <a href="/about" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium">
          About
        </a>
      </div>

      {/* CTA button on the right */}
      <ThemeToggle />
      <a href="/generate" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
        Try Now
      </a>

    </nav>
  );
}