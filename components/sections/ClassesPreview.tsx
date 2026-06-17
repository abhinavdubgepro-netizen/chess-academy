"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Clock, Users, ArrowRight, CheckCircle } from "lucide-react";

const classes = [
  { title: "Beginner Chess", level: "Beginner", duration: "8 Weeks", price: "₹2,000", desc: "Learn piece movement, basic rules, opening principles, and simple tactics.", color: "from-green-500/20 to-emerald-500/20", levelColor: "bg-green-500/10 text-green-400" },
  { title: "Intermediate Chess", level: "Intermediate", duration: "10 Weeks", price: "₹3,000", desc: "Opening theory, middle game strategy, tactical patterns, and positional play.", color: "from-blue-500/20 to-cyan-500/20", levelColor: "bg-blue-500/10 text-blue-400" },
  { title: "Advanced Chess", level: "Advanced", duration: "12 Weeks", price: "₹4,500", desc: "Complex endgames, advanced tactics, deep calculation, and tournament prep.", color: "from-purple-500/20 to-pink-500/20", levelColor: "bg-purple-500/10 text-purple-400" },
];

export default function ClassesPreview() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our <span className="text-[#f5a623]">Classes</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Choose a course that matches your current skill level
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classes.map((cls, index) => (
            <motion.div
              key={cls.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass rounded-xl overflow-hidden hover:border-[#f5a623]/30 transition-all"
            >
              <div className={`h-2 bg-gradient-to-r ${cls.color}`} />
              <div className="p-6">
                <span className={`px-3 py-1 rounded-full text-xs ${cls.levelColor}`}>
                  {cls.level}
                </span>
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">{cls.title}</h3>
                <p className="text-white/60 text-sm mb-4">{cls.desc}</p>
                <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {cls.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Max 12</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-2xl font-bold text-[#f5a623]">{cls.price}</span>
                  <Link href="/classes">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Details <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/classes">
            <Button variant="outline" size="lg">View All Classes</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
