"use client";
import { cn } from "@/lib/utils";
import { forwardRef, type TextareaHTMLAttributes } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[100px] w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white",
          "placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a623]",
          "transition-all duration-200 focus:bg-white/10",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
export { Textarea };
