"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { courses } from "@/lib/courses";
import { BookOpen, Clock, BarChart, X, Copy, CheckCircle } from "lucide-react";

// Simple code you set — change this anytime
const VERIFICATION_CODE = "CHESS2026";

export default function CoursesPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [paymentModal, setPaymentModal] = useState<{
    show: boolean;
    courseId: string;
    title: string;
    price: number;
    upiId: string;
    upiLink: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const buyCourse = async (courseId: string, price: number, title: string) => {
    setLoading(courseId);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, price }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to create checkout");
        return;
      }

      setPaymentModal({
        show: true,
        courseId,
        title,
        price: data.price,
        upiId: data.upiId,
        upiLink: data.upiLink,
      });
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  const copyUpiId = () => {
    if (paymentModal) {
      navigator.clipboard.writeText(paymentModal.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const markAsPaid = () => {
    if (verifyCode !== VERIFICATION_CODE) {
      setVerifyError("Wrong code. Pay first, then ask for the code.");
      return;
    }

    if (paymentModal) {
      localStorage.setItem(`course_${paymentModal.courseId}`, "true");
      setPaymentModal(null);
      setVerifyCode("");
      setVerifyError("");
      alert("Course unlocked! Go to 'My Courses' to access it.");
    }
  };

  const closeModal = () => {
    setPaymentModal(null);
    setVerifyCode("");
    setVerifyError("");
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
                  onClick={() => buyCourse(course.id, course.price, course.title)}
                  disabled={loading === course.id}
                >
                  {loading === course.id ? "Loading..." : "Buy Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {paymentModal?.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-6 max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-2">Complete Payment</h2>
            <p className="text-white/60 text-sm mb-6">
              Pay ₹{paymentModal.price} for <strong className="text-white">{paymentModal.title}</strong>
            </p>

            {/* UPI ID */}
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-sm text-white/60 mb-2">Pay via UPI to:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-black/30 rounded px-3 py-2 text-amber-400 text-sm font-mono">
                  {paymentModal.upiId}
                </code>
                <button
                  onClick={copyUpiId}
                  className="p-2 hover:bg-white/10 rounded transition"
                >
                  {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white/60" />}
                </button>
              </div>
            </div>

            {/* Mobile UPI Link */}
            <a
              href={paymentModal.upiLink}
              className="block w-full text-center bg-[#e94560] text-white py-3 rounded-lg mb-4 hover:bg-[#e94560]/90 transition"
            >
              Open UPI App (Mobile Only)
            </a>

            {/* Verification Code */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-white/60 text-sm mb-3">
                After paying, enter the code I give you:
              </p>
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => {
                  setVerifyCode(e.target.value);
                  setVerifyError("");
                }}
                placeholder="Enter verification code"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/30 mb-2"
              />
              {verifyError && (
                <p className="text-red-400 text-sm mb-3">{verifyError}</p>
              )}
              <Button onClick={markAsPaid} className="w-full">
                Verify & Unlock Course
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
