"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { courses } from "@/lib/courses";
import { Lock, PlayCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CourseContentPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    // Check if user has purchased this course
    const purchased = localStorage.getItem(`course_${courseId}`);
    setHasAccess(purchased === "true");
    setLoading(false);
  }, [courseId]);

  if (!course) {
    return <div className="pt-24 text-center text-white">Course not found</div>;
  }

  if (loading) {
    return <div className="pt-24 text-center text-white">Loading...</div>;
  }

  // If not purchased, show lock screen
  if (!hasAccess) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Lock className="w-20 h-20 text-white/30 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-white/60 mb-6">
            Purchase this course to unlock all {course.lessons} lessons
          </p>
          <div className="text-4xl font-bold text-white mb-6">₹{course.price}</div>
          <Button
            onClick={() => {
              window.location.href = "/courses";
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    );
  }

  // If purchased, show course content
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-green-400 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Purchased — Full Access
          </p>
        </div>

        <div className="space-y-4">
          {Array.from({ length: course.lessons }, (_, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4 hover:bg-white/10 transition cursor-pointer"
            >
              <PlayCircle className="w-10 h-10 text-amber-400" />
              <div>
                <h3 className="text-white font-medium">Lesson {i + 1}</h3>
                <p className="text-white/50 text-sm">Click to watch</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
