"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Demo() {
  const [email, setEmail] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Pretends to load for 2 seconds, then stops — simulating an API call
  const simulateLoading = () => {
    setShowSkeleton(true);
    setTimeout(() => setShowSkeleton(false), 2000);
  };

  return (
    <ProtectedRoute>
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow py-16 px-6 max-w-3xl mx-auto w-full space-y-12">

        <h1 className="text-3xl font-bold text-gray-800">Component Library Showcase</h1>

        {/* BUTTON */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Button</h2>
          <div className="flex gap-4 flex-wrap">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* INPUT */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Input</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && !email.includes("@") && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid email</p>
          )}
        </div>

        {/* MODAL / DIALOG */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Modal (Dialog)</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>
                  Are you sure you want to regenerate this description? This will replace your current text.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* TOAST */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Toast (Sonner)</h2>
          <Button onClick={() => toast("Description copied to clipboard!")}>
            Trigger Toast
          </Button>
        </div>

        {/* LOADER / SKELETON */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Loader (Skeleton)</h2>
          <Button onClick={simulateLoading} className="mb-4">
            Simulate Loading
          </Button>
          {showSkeleton ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Click the button above to see the skeleton.</p>
          )}
        </div>

      </section>

      <Footer />
    </main>
    </ProtectedRoute>
  );
}