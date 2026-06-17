import { db } from "./index";
import { classes } from "./schema";

const classData = [
  { title: "Beginner Chess", slug: "beginner-chess", description: "Perfect for kids and adults starting their chess journey. Learn piece movement, basic rules, opening principles, and simple tactics in a fun, interactive way.", level: "beginner" as const, duration: "8 Weeks", price: 2000, instructor: "Rahul Sharma", schedule: "Mon & Wed, 5:00 PM - 6:00 PM" },
  { title: "Intermediate Chess", slug: "intermediate-chess", description: "For players who know the basics. Dive into opening theory, middle game strategy, tactical patterns, and positional play to take your game to the next level.", level: "intermediate" as const, duration: "10 Weeks", price: 3000, instructor: "Rahul Sharma", schedule: "Tue & Thu, 6:00 PM - 7:30 PM" },
  { title: "Advanced Chess", slug: "advanced-chess", description: "Complex endgames, advanced tactics, deep calculation, and tournament preparation. For serious players aiming for competitive chess.", level: "advanced" as const, duration: "12 Weeks", price: 4500, instructor: "Rahul Sharma", schedule: "Sat & Sun, 10:00 AM - 12:00 PM" },
];

async function seed() {
  for (const cls of classData) {
    await db.insert(classes).values(cls).onConflictDoNothing();
  }
  console.log("Database seeded!");
}
seed().catch(console.error);
