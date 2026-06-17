"use client";
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a623]",
          "disabled:opacity-50 disabled:pointer-events-none",
          variant === "primary" && "bg-[#e94560] text-white hover:bg-[#e94560]/90 hover:scale-105",
          variant === "outline" && "border-2 border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623]/10 hover:scale-105",
          variant === "ghost" && "text-[#f5a623] hover:bg-[#f5a623]/10",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-5 py-2.5 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button };
