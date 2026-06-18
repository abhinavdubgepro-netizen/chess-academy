export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: number;
  image: string;
  code: string;
  lessonsList: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "pdf";
  content: string;
  duration: string;
  isPreview?: boolean;
}

export const courses: Course[] = [
  {
    id: "chess-beginner",
    title: "Chess Fundamentals",
    description: "Learn piece movement, basic tactics, and opening principles.",
    price: 499,
    level: "beginner",
    duration: "4 weeks",
    lessons: 0, // ← 0 for now
    image: "/courses/beginner.jpg",
    code: "BEGIN499",
    lessonsList: [], // ← empty array
  },
  {
    id: "chess-intermediate",
    title: "Tactical Mastery",
    description: "Master pins, forks, skewers, and advanced middle-game strategies.",
    price: 999,
    level: "intermediate",
    duration: "6 weeks",
    lessons: 0,
    image: "/courses/intermediate.jpg",
    code: "TACTICS999",
    lessonsList: [],
  },
  {
    id: "chess-advanced",
    title: "Grandmaster Strategies",
    description: "Deep endgame theory, complex openings, and tournament preparation.",
    price: 1999,
    level: "advanced",
    duration: "8 weeks",
    lessons: 0,
    image: "/courses/advanced.jpg",
    code: "GM1999",
    lessonsList: [],
  },
];
