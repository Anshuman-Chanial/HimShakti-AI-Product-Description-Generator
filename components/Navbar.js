// // Navbar.js — The top navigation bar shown on every page
// // It has: logo on left, navigation links in middle, CTA button on right

// import { ThemeToggle } from "@/components/theme-toggle";

// export default function Navbar() {
//   return (
//     <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between transition-colors">
      
//       {/* Logo on the left */}
//       <div className="text-orange-500 font-bold text-xl">
//         🌿 HimShakti AI
//       </div>

//       {/* Navigation links in the middle */}
//       <div className="flex gap-6">
//         {/* <a href="/" className="text-gray-700 hover:text-orange-500 font-medium">
//           Home
//         </a>
//         <a href="/generate" className="text-gray-700 hover:text-orange-500 font-medium">
//           Generate
//         </a>
//         <a href="/about" className="text-gray-700 hover:text-orange-500 font-medium">
//           About
//         </a> */}
//         <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium">
//           Home
//         </a>
//         <a href="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium">
//           Dashboard
//         </a>
//         <a href="/generate" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium">
//           Generate
//         </a>
//         <a href="/about" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium">
//           About
//         </a>
//       </div>

//       {/* CTA button on the right */}
//       <ThemeToggle />
//       <a href="/generate" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
//         Try Now
//       </a>

//     </nav>
//   );
// }
























"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react"; // hamburger + close icons, already available via lucide-react

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // tracks whether the mobile menu is expanded

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/generate", label: "Generate" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 transition-colors relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-orange-500 font-bold text-xl">
          🌿 HimShakti AI
        </div>

        {/* Desktop-only nav links — hidden below 768px, flex from 768px up */}
        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop-only theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="/generate"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600"
          >
            Try Now
          </a>
        </div>

        {/* Mobile-only hamburger button — shown below 768px, hidden from 768px up */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu — only rendered when isOpen is true */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium"
              onClick={() => setIsOpen(false)} // closes menu after tapping a link
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-800">
            <ThemeToggle />
            <a
              href="/generate"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600"
              onClick={() => setIsOpen(false)}
            >
              Try Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}