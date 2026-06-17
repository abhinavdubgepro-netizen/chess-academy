import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const classes = sqliteTable("classes", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  level: text("level", { enum: ["beginner", "intermediate", "advanced"] }).notNull(),
  duration: text("duration").notNull(),
  price: real("price").notNull(),
  instructor: text("instructor").notNull(),
  schedule: text("schedule").notNull(),
  maxStudents: integer("max_students").default(12),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});

export const demoRequests = sqliteTable("demo_requests", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  age: integer("age"),
  chessLevel: text("chess_level", { enum: ["beginner", "intermediate", "advanced"] }).default("beginner"),
  preferredDate: text("preferred_date"),
  message: text("message"),
  status: text("status", { enum: ["pending", "approved", "completed", "cancelled"] }).default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const contacts = sqliteTable("contacts", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});
