"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface LiquidGlassButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function LiquidGlassButton({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: LiquidGlassButtonProps) {
  const baseClasses =
    "relative inline-flex min-w-[160px] items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-lg transition disabled:cursor-not-allowed disabled:shadow-none";

  const variantClasses = {
    primary:
      "bg-baseBlue shadow-[0_16px_40px_rgba(37,99,235,0.7)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.9)] disabled:bg-slate-600",
    secondary:
      "bg-slate-700 shadow-[0_16px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] disabled:bg-slate-600",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.7),_transparent_55%)] opacity-80 mix-blend-screen" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

