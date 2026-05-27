"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function RomanticButton({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-rose-500 text-white hover:bg-rose-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-rose-200",
    secondary:
      "bg-white border-2 border-rose-200 text-rose-600 hover:bg-rose-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost:
      "text-rose-500 hover:bg-rose-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  return (
    <button
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
