"use client";

import { motion } from "framer-motion";
import { Award, Trophy, GraduationCap } from "lucide-react";

export default function AboutCoach() {
  return (
    <section className="py-24 bg-[#16213e]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-48 h-48 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-[#f5a623]/30 to-[#e94560]/30 flex items-center justify-center">
              <span className="text-6xl font-bold text-white">RS</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet Your <span className="text-[#f5a623]">Coach</span>
            </h2>
            <h3 className="text-xl text-white/80 mb-4">Rahul Sharma</h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Passionate chess coach with 8+ years of teaching experience. 
              State-level player turned full-time coach. Trained over 500 students 
              across all age groups. Believes in making chess fun and accessible 
              for everyone.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Trophy, label: "State Player" },
                { icon: Award, label: "8+ Years Exp" },
                { icon: GraduationCap, label: "500+ Students" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="w-6 h-6 text-[#f5a623] mx-auto mb-2" />
                  <span className="text-sm text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
