"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Calendar, Target, Award, HeartHandshake } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Structured Curriculum", desc: "Step-by-step lessons from basics to advanced strategies" },
  { icon: Users, title: "Small Batches", desc: "Maximum 12 students per class for personal attention" },
  { icon: Calendar, title: "Flexible Timing", desc: "Weekday and weekend batches to fit your schedule" },
  { icon: Target, title: "Goal Oriented", desc: "Track your progress with regular assessments" },
  { icon: Award, title: "Tournament Prep", desc: "Special training for competitive chess players" },
  { icon: HeartHandshake, title: "1-on-1 Support", desc: "Doubt clearing sessions and personalized feedback" },
];

export default function WhatWeOffer() {
  return (
    <section className="py-24 bg-[#16213e]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            What We <span className="text-[#f5a623]">Offer</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Everything you need to become a better chess player
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="glass rounded-xl p-6 hover:border-[#f5a623]/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#f5a623]/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#f5a623]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
