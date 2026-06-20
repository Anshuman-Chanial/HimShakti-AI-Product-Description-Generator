// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.js file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }









// page.js — This is your HOME page (localhost:3000)
// It imports and combines all 4 components

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

// Sample HimShakti products — the Card component will display these
const products = [
  {
    title: "Himalayan Millet Snack",
    description: "Crispy, nutritious snacks made from high-altitude millets grown in Uttarakhand. Rich in protein and fiber.",
    actionText: "Generate Description",
    actionLink: "/generate",
  },
  {
    title: "Traditional Fruit Pickle",
    description: "Artisanal fruit pickles made from locally sourced Himalayan produce using age-old family recipes.",
    actionText: "Generate Description",
    actionLink: "/generate",
  },
  {
    title: "Mountain Berry Juice",
    description: "Cold-pressed juices from wild Himalayan berries, packed with antioxidants and natural goodness.",
    actionText: "Generate Description",
    actionLink: "/generate",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      
      {/* Top navigation */}
      <Navbar />

      {/* Hero banner */}
      <Hero />

      {/* Products grid section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900 flex-grow transition-colors">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
            HimShakti Products
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-10">
            Generate AI-powered descriptions for these products
          </p>

          {/* 3 cards in a grid — Card component used 3 times */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}