"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const [checked, setChecked] = useState(false); // avoids flash of protected content
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setChecked(true); // token exists — safe to show the page
    }
  }, [router]);

  // While we're checking, render nothing (prevents a flash of protected content
  // before the redirect kicks in)
  if (!checked) return null;

  return <>{children}</>;
}