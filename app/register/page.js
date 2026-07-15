// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.errors?.[0]?.msg || data.error || "Registration failed");
//         return;
//       }

//       router.push("/login"); // registered — now go log in
//     } catch (err) {
//       setError("Something went wrong. Try again.");
//     } finally{
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
//         <h1 className="text-2xl font-bold">Register</h1>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border rounded p-2"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password (6+ chars)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border rounded p-2"
//           required
//         />
//         <button type="submit" className="w-full bg-black text-white rounded p-2">
//           Register
//         </button>
//         <p className="text-sm text-center">
//           Already have an account? <a href="/login" className="underline">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// }























"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.errors?.[0]?.msg || data.error || "Registration failed");
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
          Register
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Create your HimShakti AI account
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-950 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password (6+ chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="underline text-gray-700 dark:text-gray-200">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}