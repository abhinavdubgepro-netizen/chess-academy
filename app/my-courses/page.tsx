"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { courses } from "@/lib/courses";
import { PlayCircle, Lock, RefreshCw } from "lucide-react";

export default function MyCoursesPage() {
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoreEmail, setRestoreEmail] = useState("");
  const [restoreMsg, setRestoreMsg] = useState("");

  useEffect(() => {
    const loadPurchases = async () => {
      const email = localStorage.getItem("user_email");
      
      if (email) {
        const serverPurchases: string[] = [];
        for (const course of courses) {
          try {
            const res = await fetch(`/api/purchases?email=${encodeURIComponent(email)}&courseId=${course.id}`);
            const data = await res.json();
            if (data.purchased) {
              serverPurchases.push(course.id);
              localStorage.setItem(`course_${course.id}`, "true");
            }
          } catch {
            // Skip if API fails
          }
        }
        setPurchasedCourses(serverPurchases);
      } else {
        const local: string[] = [];
        courses.forEach((c) => {
          if (localStorage.getItem(`course_${c.id}`) === "true") {
            local.push(c.id);
          }
        });
        setPurchasedCourses(local);
      }
      setLoading(false);
    };

    loadPurchases();
  }, []);

  const restorePurchases = async () => {
    if (!restoreEmail || !restoreEmail.includes("@")) {
      setRestoreMsg("Enter a valid email");
      return;
    }

    const serverPurchases: string[] = [];
    for (const course of courses) {
      try {
        const res = await fetch(`/api/purchases?email=${encodeURIComponent(restoreEmail)}&courseId=${course.id}`);
        const data = await res.json();
        if (data.purchased) {
          serverPurchases.push(course.id);
          localStorage.setItem(`course_${course.id}`, "true");
        }
      } catch {
        // Skip if API fails
      }
    }

    localStorage.setItem("user_email", restoreEmail);
    setPurchasedCourses(serverPurchases);

    if (serverPurchases.length > 0) {
      setRestoreMsg(`Restored ${serverPurchases.length} course(s)!`);
    } else {
      setRestoreMsg("No purchases found for this email");
    }
    setRestoreEmail("");
  };

  const myCourses = courses.filter((c) => purchasedCourses.includes(c.id));

  if (loading) {
    return <div className="min-h-screen pt-24 text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Courses</h1>

        {/* Restore Section */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
          <h3 className="text-white font-medium mb-2 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Restore Purchases
          </h3>
          <p className="text-white/50 text-sm mb-3">
            Enter your email to restore all your purchases on any device
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={restoreEmail}
              onChange={(e) => { setRestoreEmail(e.target.value); setRestoreMsg(""); }}
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/30"
            />
            <button
              onClick={restorePurchases}
              className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition"
            >
              Restore
            </button>
          </div>
          {restoreMsg && (
            <p className={`text-sm mt-2 ${restoreMsg.includes("Restored") ? "text-green-400" : "text-red-400"}`}>
              {restoreMsg}
            </p>
          )}
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <Lock className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 mb-4">No courses available yet</p>
            <p className="text-white/40 text-sm">We're preparing amazing chess courses for you!</p>
          </div>
        ) : myCourses.length === 0 ? (
          <div className="text-center py-12">
            <Lock className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 mb-4">No courses yet</p>
            <Link href="/courses" className="text-amber-400 hover:underline">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {myCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4 hover:bg-white/10 transition"
              >
                <PlayCircle className="w-10 h-10 text-green-400" />
                <div>
                  <h3 className="text-white font-medium">{course.title}</h3>
                  <p className="text-white/50 text-sm">{course.lessons} lessons</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
