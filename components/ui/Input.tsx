"use client";
import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white",
          "placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a623]",
          "transition-all duration-200 focus:bg-white/10",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export { Input };
