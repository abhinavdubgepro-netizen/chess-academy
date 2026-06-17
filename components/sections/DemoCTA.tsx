"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Gift, Check } from "lucide-react";

const benefits = [
  "45-minute interactive session",
  "Skill assessment included",
  "Personalized learning plan",
  "No payment required",
];

export default function DemoCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#e94560]/10 to-[#f5a623]/10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f5a623]/20 mb-6"
          >
            <Gift className="w-8 h-8 text-[#f5a623]" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your <span className="text-[#f5a623]">Free</span> Demo
          </h2>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Experience our teaching style before you commit. 
            One demo class per email address.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10"
          >
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-white/80">
                <Check className="w-5 h-5 text-[#f5a623] flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </motion.div>

          <Link href="/demo">
            <Button size="lg" className="gap-2">
              Book Free Demo <Gift className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
