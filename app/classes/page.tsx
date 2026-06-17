import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Clock, Users, CheckCircle } from "lucide-react";

const classes = [
  {
    id: 1,
    title: "Beginner Chess",
    slug: "beginner-chess",
    description: "Perfect for kids and adults starting their chess journey. Learn piece movement, basic rules, opening principles, and simple tactics in a fun, interactive way.",
    level: "beginner",
    duration: "8 Weeks",
    price: 2000,
    schedule: "Mon & Wed, 5:00 PM - 6:00 PM",
    maxStudents: 12,
  },
  {
    id: 2,
    title: "Intermediate Chess",
    slug: "intermediate-chess",
    description: "For players who know the basics. Dive into opening theory, middle game strategy, tactical patterns, and positional play to take your game to the next level.",
    level: "intermediate",
    duration: "10 Weeks",
    price: 3000,
    schedule: "Tue & Thu, 6:00 PM - 7:30 PM",
    maxStudents: 12,
  },
  {
    id: 3,
    title: "Advanced Chess",
    slug: "advanced-chess",
    description: "Complex endgames, advanced tactics, deep calculation, and tournament preparation. For serious players aiming for competitive chess.",
    level: "advanced",
    duration: "12 Weeks",
    price: 4500,
    schedule: "Sat & Sun, 10:00 AM - 12:00 PM",
    maxStudents: 10,
  },
];

export default function ClassesPage() {
  const levelColors: Record<string, string> = {
    beginner: "border-green-500/30",
    intermediate: "border-blue-500/30",
    advanced: "border-purple-500/30",
  };

  const levelBg: Record<string, string> = {
    beginner: "bg-green-500/10 text-green-400",
    intermediate: "bg-blue-500/10 text-blue-400",
    advanced: "bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Our <span className="text-[#f5a623]">Classes</span>
          </h1>
          <p className="text-white/60">Choose a course that matches your skill level</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className={`rounded-xl border ${levelColors[cls.level]} bg-white/5 p-6 hover:border-[#f5a623]/30 transition-all hover:-translate-y-1`}
            >
              <span className={`px-3 py-1 rounded-full text-xs capitalize ${levelBg[cls.level]}`}>
                {cls.level}
              </span>
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">{cls.title}</h3>
              <p className="text-white/60 text-sm mb-4">{cls.description}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Clock className="w-4 h-4" /> {cls.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Users className="w-4 h-4" /> Max {cls.maxStudents} students
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <CheckCircle className="w-4 h-4" /> {cls.schedule}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-2xl font-bold text-[#f5a623]">₹{cls.price}</span>
                <Link href="/demo">
                  <Button variant="outline" size="sm">Enquire</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}