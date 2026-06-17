"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function DemoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already-exists">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    chessLevel: "beginner",
    preferredDate: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.status === 409) {
        setStatus("already-exists");
      } else if (res.ok) {
        setStatus("success");
      } else {
        setStatus("idle");
        alert(result.message || "Something went wrong");
      }
    } catch {
      setStatus("idle");
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Book Free Demo</h1>
          <p className="text-white/60">One demo class per email address</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          {status === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Request Submitted!</h3>
              <p className="text-white/60 mb-6">We will contact you within 24 hours.</p>
              <Button onClick={() => { setStatus("idle"); setFormData({ name: "", email: "", phone: "", age: "", chessLevel: "beginner", preferredDate: "", message: "" }); }} variant="outline">Submit Another</Button>
            </div>
          ) : status === "already-exists" ? (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Already Requested</h3>
              <p className="text-white/60">You have already requested a demo with this email.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Full Name *</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Email *</label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/80 mb-1">Phone</label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91..." />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1">Age</label>
                  <Input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="25" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Chess Level</label>
                <Select name="chessLevel" value={formData.chessLevel} onChange={handleChange}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Preferred Date</label>
                <Input name="preferredDate" type="date" value={formData.preferredDate} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Message</label>
                <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Any questions..." />
              </div>
              <Button type="submit" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Request Free Demo"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}