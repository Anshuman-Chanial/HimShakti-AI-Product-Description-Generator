// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function Login() {
//   return (
//     <main className="min-h-screen flex flex-col">
//       <Navbar />

//       <section className="flex-grow flex items-center justify-center bg-gray-50 py-20 px-6">
//         <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">

//           <h1 className="text-2xl font-bold text-gray-800 mb-2">
//             Login
//           </h1>

//           <p className="text-gray-500 mb-6">
//             Access your HimShakti AI dashboard
//           </p>

//           <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
//             <p className="text-orange-500 font-semibold">
//               🚧 Authentication coming in Week 6
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
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Store the token — this is what "logged in" means from now on
      localStorage.setItem("token", data.token);

      router.push("/"); // redirect to home after login
    } 
    
    catch (err) {
      setError("Something went wrong. Try again.");
    }

    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <button type="submit" className="w-full bg-black text-white rounded p-2">
          Login
        </button>
        <p className="text-sm text-center">
          No account? <a href="/register" className="underline">Register</a>
        </p>
      </form>
      <div className="mt-4 text-center">
  
        <a href="http://localhost:5000/api/auth/google" 
          className="inline-block w-full border rounded p-2 text-center hover:bg-gray-50"
        >
          Sign in with Google
        </a>
      </div>
    </div>
  );
}