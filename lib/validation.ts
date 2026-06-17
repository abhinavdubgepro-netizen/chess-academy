import { z } from "zod";

export const demoRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  age: z.coerce.number().min(5).max(100).optional(),
  chessLevel: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  preferredDate: z.string().optional(),
  message: z.string().max(500).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(), // ✅ ADD THIS LINE
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
