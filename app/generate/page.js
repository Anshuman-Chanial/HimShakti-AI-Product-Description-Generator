"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Generate() {
  const [productName, setProductName] = useState("");
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Generate Product Description
          </h1>

          <p className="text-gray-500 text-lg mb-8">
            Enter your product details below to generate a professional
            e-commerce listing optimised for Amazon.in and Flipkart.
          </p>

          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name..."
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-md mx-auto block mb-4 placeholder:text-gray-600 text-gray-800"
          />
          <p className="mt-2 text-gray-500">You typed: {productName}</p>

          <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
            <p className="text-orange-500 font-semibold text-lg">
              🚧 AI Integration Coming Soon
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Backend and AI API integration scheduled for Week 4–7
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}