"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { courses } from "@/lib/courses";
import { PlayCircle, Lock } from "lucide-react";

export default function MyCoursesPage() {
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);

  useEffect(() => {
    // Get all purchased courses from localStorage
    const purchased: string[] = [];
    courses.forEach((course) => {
      if (localStorage.getItem(`course_${course.id}`) === "true") {
        purchased.push(course.id);
      }
    });
    setPurchasedCourses(purchased);
  }, []);

  const myCourses = courses.filter((c) => purchasedCourses.includes(c.id));

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Courses</h1>

        {myCourses.length === 0 ? (
          <div className="text-center py-12">
            <Lock className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 mb-4">You haven't purchased any courses yet</p>
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
