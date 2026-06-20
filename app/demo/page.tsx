"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function DemoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already-exists" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    classType: "1-on-1",
    preferredDate: "",
    message: "",
  });
  
  // Verification states
  const [verificationStep, setVerificationStep] = useState<"form" | "verify" | "verified">("form");
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [sendingCode, setSendingCode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendVerificationCode = async () => {
    if (!formData.email || !formData.email.includes("@")) {
      setErrorMsg("Enter a valid email first");
      return;
    }
    
    setSendingCode(true);
    try {
      const res = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      
      if (res.ok) {
        setVerificationStep("verify");
        setErrorMsg("");
      } else {
        setErrorMsg("Failed to send verification code");
      }
    } catch {
      setErrorMsg("Network error");
    } finally {
      setSendingCode(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode) {
      setVerifyError("Enter the code");
      return;
    }
    
    try {
      const res = await fetch(`/api/send-verification?email=${encodeURIComponent(formData.email)}&code=${verificationCode}`);
      const data = await res.json();
      
      if (data.valid) {
        setVerificationStep("verified");
        setVerifyError("");
      } else {
        setVerifyError("Invalid code. Try again.");
      }
    } catch {
      setVerifyError("Verification failed");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationStep !== "verified") {
      setErrorMsg("Please verify your email first");
      return;
    }
    
    setStatus("loading");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: `Server returned ${res.status}` };
      }

      if (res.status === 409) {
        setStatus("already-exists");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.message || `Error ${res.status}`);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error");
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
              <Button onClick={() => { setStatus("idle"); setVerificationStep("form"); setFormData({ name: "", email: "", phone: "", age: "", classType: "1-on-1", preferredDate: "", message: "" }); }} variant="outline">Submit Another</Button>
            </div>
          ) : status === "already-exists" ? (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Already Requested</h3>
              <p className="text-white/60">You have already requested a demo with this email.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {status === "error" && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                  {errorMsg}
                </div>
              )}
              
              {/* Email with verification */}
              <div>
                <label className="block text-sm text-white/80 mb-1">Email *</label>
                <div className="flex gap-2">
                  <Input 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="your@email.com" 
                    required 
                    disabled={verificationStep === "verified"}
                    className="flex-1"
                  />
                  {verificationStep === "form" && (
                    <Button type="button" onClick={sendVerificationCode} disabled={sendingCode}>
                      {sendingCode ? "Sending..." : "Verify"}
                    </Button>
                  )}
                  {verificationStep === "verified" && (
                    <span className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" /> Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Verification code input */}
              {verificationStep === "verify" && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <p className="text-amber-400 text-sm mb-2">Enter the 6-digit code sent to {formData.email}</p>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                      className="flex-1"
                    />
                    <Button type="button" onClick={verifyCode}>Verify Code</Button>
                  </div>
                  {verifyError && <p className="text-red-400 text-sm mt-2">{verifyError}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm text-white/80 mb-1">Full Name *</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
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
                <label className="block text-sm text-white/80 mb-1">Class Type</label>
                <Select name="classType" value={formData.classType} onChange={handleChange}>
                  <option value="1-on-1">1-on-1 Personal Training</option>
                  <option value="group">Group Classes</option>
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
              
              <Button type="submit" className="w-full" disabled={status === "loading" || verificationStep !== "verified"}>
                {status === "loading" ? "Submitting..." : "Request Free Demo"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
