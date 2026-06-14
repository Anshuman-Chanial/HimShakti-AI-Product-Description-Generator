import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            About HimShakti AI
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            HimShakti Food Processing Unit is a rural enterprise near Haldwani,
            Uttarakhand. They transform raw Himalayan millets and locally sourced
            fruits into packaged snacks, juices, and traditional pickles.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Despite producing high-quality natural products, the unit lacked the
            capacity to write professional product descriptions for e-commerce
            platforms like Amazon.in and Flipkart. This tool solves that problem
            using AI.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            Built as part of the TBI-GEU Summer Internship Program 2026 by
            Anshuman Chanial (Intern ID: TBI-26100231), AI-Assisted Full Stack
            Web Development track.
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}