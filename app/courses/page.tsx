"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { courses } from "@/lib/courses";
import { Lock, CheckCircle, BookOpen, Clock, BarChart } from "lucide-react";

export default function CoursesPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const buyCourse = async (courseId: string, price: number) => {
    setLoading(courseId);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, price }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Chess Courses</h1>
          <p className="text-white/60">Master the game with our structured programs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span className="text-sm text-amber-400 font-medium capitalize">
                  {course.level}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
              <p className="text-white/60 text-sm mb-4">{course.description}</p>

              <div className="flex gap-4 text-sm text-white/50 mb-6">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart className="w-4 h-4" />
                  {course.lessons} lessons
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">₹{course.price}</span>
                <Button
                  onClick={() => buyCourse(course.id, course.price)}
                  disabled={loading === course.id}
                >
                  {loading === course.id ? "Loading..." : "Buy Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
