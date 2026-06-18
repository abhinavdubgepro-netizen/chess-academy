export interface Course {
  id: string;
  title: string;
  description: string;
  price: number; // in INR
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: number;
  image: string;
}

export const courses: Course[] = [
  {
    id: "chess-beginner",
    title: "Chess Fundamentals",
    description: "Learn piece movement, basic tactics, and opening principles. Perfect for complete beginners.",
    price: 1,
    level: "beginner",
    duration: "4 weeks",
    lessons: 12,
    image: "/courses/beginner.jpg",
  },
  {
    id: "chess-intermediate",
    title: "Tactical Mastery",
    description: "Master pins, forks, skewers, and advanced middle-game strategies.",
    price: 999,
    level: "intermediate",
    duration: "6 weeks",
    lessons: 18,
    image: "/courses/intermediate.jpg",
  },
  {
    id: "chess-advanced",
    title: "Grandmaster Strategies",
    description: "Deep endgame theory, complex openings, and tournament preparation.",
    price: 1999,
    level: "advanced",
    duration: "8 weeks",
    lessons: 24,
    image: "/courses/advanced.jpg",
  },
];
