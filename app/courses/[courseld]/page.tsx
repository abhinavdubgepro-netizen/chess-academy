"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { courses } from "@/lib/courses";
import { Lock, CheckCircle, ArrowLeft, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

export default function CourseContentPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    const purchased = localStorage.getItem(`course_${courseId}`);
    setHasAccess(purchased === "true");
    setLoading(false);
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen pt-24 text-center text-white">
        <h1 className="text-2xl">Course not found</h1>
        <Link href="/courses" className="text-amber-400 hover:underline mt-4 inline-block">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen pt-24 text-center text-white">Loading...</div>;
  }

  // LOCK SCREEN — not purchased
  if (!hasAccess) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Lock className="w-20 h-20 text-white/30 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-white/60 mb-4">{course.description}</p>
          <div className="flex justify-center gap-4 text-sm text-white/50 mb-6">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.lessons} lessons
            </span>
          </div>
          <div className="text-4xl font-bold text-white mb-6">₹{course.price}</div>
          <Link
            href="/courses"
            className="inline-block px-6 py-3 rounded-lg bg-[#e94560] text-white hover:bg-[#e94560]/90 transition"
          >
            Buy Now to Unlock
          </Link>
        </div>
      </div>
    );
  }

  // UNLOCKED — show "Coming Soon" since no lessons yet
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/my-courses" className="text-white/60 hover:text-white flex items-center gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" />
          My Courses
        </Link>

        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-green-400 mb-8">Purchased — Full Access</p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">Content Coming Soon</h2>
            <p className="text-white/60 mb-4">
              This course is being prepared. You'll get access to all lessons once they're uploaded.
            </p>
            <p className="text-white/40 text-sm">
              Course code: <code className="text-amber-400">{course.code}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
