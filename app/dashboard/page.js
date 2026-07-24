// "use client";

// import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "sonner";

// export default function Dashboard() {
//   const [history, setHistory] = useState([]);   // holds the list of past generations
//   const [isLoading, setIsLoading] = useState(true); // true by default — we're loading immediately on page open

//   // This function fetches the user's history from your backend
//   const fetchHistory = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch("http://localhost:5000/api/history", {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to load history");
//       }

//       const data = await response.json();
//       setHistory(data);
//     } catch (error) {
//       toast.error("Could not load your generation history.");
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // useEffect with an empty [] dependency array = "run this once, when the page first loads"
//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   return (
//     <ProtectedRoute>
//       <main className="min-h-screen flex flex-col">
//         <Navbar />

//         <section className="flex-grow py-16 px-6 bg-white dark:bg-gray-950">
//           <div className="max-w-3xl mx-auto">
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
//               Your Dashboard
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 mb-8">
//               All the product descriptions you've generated.
//             </p>

//             {/* Loading state — shown only while fetching */}
//             {isLoading && (
//               <div className="space-y-4">
//                 <Skeleton className="h-24 w-full" />
//                 <Skeleton className="h-24 w-full" />
//                 <Skeleton className="h-24 w-full" />
//               </div>
//             )}

//             {/* Empty state — shown once loaded, if there's genuinely nothing */}
//             {!isLoading && history.length === 0 && (
//               <div className="text-center py-16 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No descriptions yet — generate your first one!
//                 </p>
//               </div>
//             )}

//             {/* The actual list — shown once loaded, if there's data */}
//             {!isLoading && history.length > 0 && (
//               <div className="space-y-4">
//                 {history.map((entry) => (
//                   <div
//                     key={entry.id}
//                     className="p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
//                   >
//                     <h3 className="font-bold text-gray-800 dark:text-gray-100">
//                       {entry.productName}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
//                       {entry.generatedText}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-2">
//                       Tone: {entry.tone} • {new Date(entry.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>

//         <Footer />
//       </main>
//     </ProtectedRoute>
//   );
// }



















"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const fetchHistory = async () => {
  //   setIsLoading(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch("http://localhost:5000/api/history", {
  //       headers: { "Authorization": `Bearer ${token}` },
  //     });

  //     // Specifically detect an expired/invalid session, not just "any error"
  //   if (response.status === 401) {
  //     localStorage.removeItem("token"); // clear the dead token
  //     toast.error("Your session has expired. Please log in again.");
  //     window.location.href = "/login"; // hard redirect to login
  //     return;
  //   }




  //     if (!response.ok) throw new Error("Failed to load history");
  //     const data = await response.json();
  //     setHistory(data);
  //   } catch (error) {
  //     toast.error("Could not load your generation history.");
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await authFetch("http://localhost:5000/api/history");

      if (!response.ok) throw new Error("Failed to load history");

      const data = await response.json();
      setHistory(data);
    } catch (error) {
      if (error.isSessionExpired) {
        toast.error("Your session has expired. Please log in again.");
        window.location.href = "/login";
        return;
      }
      toast.error("Could not load your generation history.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);













  
  // Cycles a single entry's tone to the next option and saves it via PUT
  // const handleToneChange = async (id, currentTone) => {
  //   const tones = ["premium", "health-focused", "casual"];
  //   const nextIndex = (tones.indexOf(currentTone) + 1) % tones.length;
  //   const newTone = tones[nextIndex];

  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(`http://localhost:5000/api/history/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ tone: newTone }),
  //     });

  //     if (!response.ok) throw new Error("Update failed");

  //     // Update just this one entry in local state, instead of re-fetching everything
  //     setHistory((prev) =>
  //       prev.map((entry) => (entry.id === id ? { ...entry, tone: newTone } : entry))
  //     );
  //     toast.success(`Tone updated to "${newTone}"`);
  //   } catch (error) {
  //     toast.error("Could not update tone.");
  //     console.error(error);
  //   }
  // };
  const handleToneChange = async (id, currentTone) => {
    const tones = ["premium", "health-focused", "casual"];
    const nextIndex = (tones.indexOf(currentTone) + 1) % tones.length;
    const newTone = tones[nextIndex];

    try {
      const response = await authFetch(`http://localhost:5000/api/history/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tone: newTone }),
      });

      if (!response.ok) throw new Error("Update failed");

      setHistory((prev) =>
        prev.map((entry) => (entry.id === id ? { ...entry, tone: newTone } : entry))
      );
      toast.success(`Tone updated to "${newTone}"`);
    } catch (error) {
      if (error.isSessionExpired) {
        toast.error("Your session has expired. Please log in again.");
        window.location.href = "/login";
        return;
      }
      toast.error("Could not update tone.");
      console.error(error);
    }
  };















  // Deletes an entry after the user confirms via the Dialog
  // const handleDelete = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(`http://localhost:5000/api/history/${id}`, {
  //       method: "DELETE",
  //       headers: { "Authorization": `Bearer ${token}` },
  //     });

  //     if (!response.ok) throw new Error("Delete failed");

  //     // Remove it from local state — no need to re-fetch the whole list
  //     setHistory((prev) => prev.filter((entry) => entry.id !== id));
  //     toast.success("Entry deleted");
  //   } catch (error) {
  //     toast.error("Could not delete entry.");
  //     console.error(error);
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      const response = await authFetch(`http://localhost:5000/api/history/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      setHistory((prev) => prev.filter((entry) => entry.id !== id));
      toast.success("Entry deleted");
    } catch (error) {
      if (error.isSessionExpired) {
        toast.error("Your session has expired. Please log in again.");
        window.location.href = "/login";
        return;
      }
      toast.error("Could not delete entry.");
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-grow py-16 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Your Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              All the product descriptions you've generated.
            </p>

            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            )}

            {!isLoading && history.length === 0 && (
              <div className="text-center py-16 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                <p className="text-gray-500 dark:text-gray-400">
                  No descriptions yet — generate your first one!
                </p>
              </div>
            )}

            {!isLoading && history.length > 0 && (
              <div className="space-y-4">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
                  >
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">
                      {entry.productName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      {entry.generatedText}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 mb-3">
                      Tone: {entry.tone} • {new Date(entry.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToneChange(entry.id, entry.tone)}
                      >
                        Cycle Tone
                      </Button>

                      {/* Delete needs confirmation — Dialog handles that */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete this entry?</DialogTitle>
                            <DialogDescription>
                              This will permanently remove "{entry.productName}" from your history. This can't be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(entry.id)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}