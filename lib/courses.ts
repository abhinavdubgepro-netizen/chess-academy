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

export const courses: Course[] = [];
