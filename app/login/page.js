import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex items-center justify-center bg-gray-50 py-20 px-6">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Login
          </h1>

          <p className="text-gray-500 mb-6">
            Access your HimShakti AI dashboard
          </p>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
            <p className="text-orange-500 font-semibold">
              🚧 Authentication coming in Week 6
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}