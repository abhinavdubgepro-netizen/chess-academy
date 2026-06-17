"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    setErrorMsg("");
    
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || "", // Use actual phone if schema includes it
          subject: data.subject,
          message: data.message,
          type: "contact"
        }),
      });

      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        const errorData = await res.json().catch(() => ({ message: "Failed to send message" }));
        setStatus("error");
        setErrorMsg(errorData.message || "Failed to send message");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Contact <span className="text-[#f5a623]">Us</span>
          </h1>
          <p className="text-white/60">Have questions? We would love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }} 
            className="space-y-4"
          >
            {[
              { icon: Mail, label: "Email", value: "hello@chessacademy.com", id: "email-info" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210", id: "phone-info" },
              { icon: MapPin, label: "Location", value: "Online Classes (India)", id: "location-info" },
            ].map((item) => (
              <div 
                key={item.id}  // ✅ Fixed: Added unique key prop
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#f5a623]/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#f5a623]" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm text-white/60">{item.label}</div>
                  <div className="text-white font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }} 
            className="lg:col-span-2 glass rounded-xl p-8"
          >
            {status === "success" ? (
              <motion.div 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60">We will get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Error Banner */}
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm" role="alert">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm text-white/80 mb-1">
                      Name <span aria-label="required">*</span>
                    </label>
                    <Input 
                      id="name"  // ✅ Fixed: Linked label to input
                      {...register("name")}
                      placeholder="Your name"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm text-white/80 mb-1">
                      Email <span aria-label="required">*</span>
                    </label>
                    <Input 
                      id="email"  // ✅ Fixed: Linked label to input
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm text-white/80 mb-1">
                    Subject <span aria-label="required">*</span>
                  </label>
                  <Input 
                    id="subject"  // ✅ Fixed: Linked label to input
                    {...register("subject")}
                    placeholder="How can we help?"
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-red-400 text-xs mt-1" role="alert">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm text-white/80 mb-1">
                    Message <span aria-label="required">*</span>
                  </label>
                  <Textarea 
                    id="message"  // ✅ Fixed: Linked label to input
                    {...register("message")}
                    placeholder="Your message..."
                    rows={5}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
