import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Clock, Users, CheckCircle } from "lucide-react";

const classes = [
  {
    id: 1,
    title: "1-on-1 Personal Training",
    slug: "1-on-1",
    description: "Personalized one-on-one chess coaching tailored to your skill level and goals. Get individual attention, custom lesson plans, and rapid improvement with dedicated coach time.",
    type: "1-on-1",
    duration: "Flexible",
    price: 1500,
    schedule: "Book as per your convenience",
    maxStudents: 1,
  },
  {
    id: 2,
    title: "Group Classes",
    slug: "group",
    description: "Learn chess in a fun, interactive group environment. Small batches ensure personal attention while you benefit from peer learning and friendly competition.",
    type: "group",
    duration: "8 Weeks",
    price: 2000,
    schedule: "Mon & Wed, 5:00 PM - 6:00 PM",
    maxStudents: 12,
  },
];

export default function ClassesPage() {
  const typeColors: Record<string, string> = {
    "1-on-1": "border-amber-500/30",
    group: "border-green-500/30",
  };

  const typeBg: Record<string, string> = {
    "1-on-1": "bg-amber-500/10 text-amber-400",
    group: "bg-green-500/10 text-green-400",
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Our <span className="text-[#f5a623]">Classes</span>
          </h1>
          <p className="text-white/60">Choose a class format that suits you best</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className={`rounded-xl border ${typeColors[cls.type]} bg-white/5 p-6 hover:border-[#f5a623]/30 transition-all hover:-translate-y-1`}
            >
              <span className={`px-3 py-1 rounded-full text-xs capitalize ${typeBg[cls.type]}`}>
                {cls.type}
              </span>
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">{cls.title}</h3>
              <p className="text-white/60 text-sm mb-4">{cls.description}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Clock className="w-4 h-4" /> {cls.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Users className="w-4 h-4" /> Max {cls.maxStudents} student{cls.maxStudents > 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <CheckCircle className="w-4 h-4" /> {cls.schedule}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-2xl font-bold text-[#f5a623]">₹{cls.price}<span className="text-sm text-white/40 font-normal">/month</span></span>
                <Link href="/demo">
                  <Button variant="outline" size="sm">Book Demo</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
