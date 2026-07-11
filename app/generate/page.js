// "use client";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useState } from "react";

// export default function Generate() {
//   const [productName, setProductName] = useState("");
//   return (
//     <main className="min-h-screen flex flex-col">
//       <Navbar />

//       <section className="flex-grow py-20 px-6 bg-white">
//         <div className="max-w-4xl mx-auto text-center">

//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             Generate Product Description
//           </h1>

//           <p className="text-gray-500 text-lg mb-8">
//             Enter your product details below to generate a professional
//             e-commerce listing optimised for Amazon.in and Flipkart.
//           </p>

//           <input
//             type="text"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             placeholder="Enter product name..."
//             className="border border-gray-300 rounded px-3 py-2 w-full max-w-md mx-auto block mb-4 placeholder:text-gray-600 text-gray-800"
//           />
//           <p className="mt-2 text-gray-500">You typed: {productName}</p>

//           <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
//             <p className="text-orange-500 font-semibold text-lg">
//               🚧 AI Integration Coming Soon
//             </p>
//             <p className="text-gray-400 text-sm mt-2">
//               Backend and AI API integration scheduled for Week 4–7
//             </p>
//           </div>

//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Generate() {
  // One useState per form field — same pattern you already know
  const [productName, setProductName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [weight, setWeight] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("health-focused");

  // Two NEW pieces of state needed for the fetch flow:
  const [result, setResult] = useState(null);     // stores the generated description once it arrives
  const [isLoading, setIsLoading] = useState(false); // tracks whether we're currently waiting for the backend

  // This function runs when the Generate button is clicked
  const handleGenerate = async () => {
    // Basic validation — matches what your backend already checks
    if (!productName) {
      toast.error("Please enter a product name");
      return;
    }

    setIsLoading(true);   // show the skeleton
    setResult(null);      // clear any previous result

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ productName, ingredients, weight, features, tone }),
      });

      if (!response.ok) {
        throw new Error("Backend returned an error");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Description generated!");

    } catch (error) {
      toast.error("Could not connect to backend. Is the server running?");
      console.error(error);

    } finally {
      setIsLoading(false);  // hide the skeleton, whether it succeeded or failed
    }
  };

  return (
    <ProtectedRoute>
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow py-16 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-2xl mx-auto">

          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Generate Product Description
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Enter your product details to generate a professional e-commerce listing.
          </p>

          <div className="space-y-4">
            <Input
              placeholder="Product name (e.g. Himalayan Millet Snack)"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Input
              placeholder="Ingredients (e.g. millets, sea salt)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <Input
              placeholder="Weight (e.g. 150g)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Input
              placeholder="Key features (e.g. high protein, gluten-free)"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? "Generating..." : "Generate Description"}
            </Button>
          </div>

          {/* Skeleton shows ONLY while isLoading is true */}
          {isLoading && (
            <div className="mt-8 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}

          {/* Result shows ONLY once we have data AND we're not loading */}
          {result && !isLoading && (
            <div className="mt-8 p-6 bg-orange-50 dark:bg-gray-800 rounded-xl border border-orange-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                {result.productName}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {result.generatedText}
              </p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
    </ProtectedRoute>
  );
}

