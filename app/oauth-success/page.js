"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Read the ?token=... value from the URL
    const token = searchParams.get("token");

    if (token) {
      // Same as normal login — this token is what makes you "logged in"
      localStorage.setItem("token", token);
      router.push("/"); // send them home, now logged in
    } else {
      // No token means something went wrong — bounce to login
      router.push("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500">Signing you in...</p>
    </div>
  );
}