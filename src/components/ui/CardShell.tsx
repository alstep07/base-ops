"use client";

import { ReactNode } from "react";

interface CardShellProps {
  children: ReactNode;
  className?: string;
}

export function CardShell({ children, className = "" }: CardShellProps) {
  return (
    <section
      className={`relative mt-6 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/5 bg-slate-900/60 text-sm text-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.85)] sm:mt-8 ${className}`}
    >
      {/* liquid glass gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),_transparent_55%)] opacity-80" />
      {/* glass blur layer */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl backdrop-blur-xl" />
      {/* content */}
      <div className="relative z-10 p-6 sm:p-7">{children}</div>
    </section>
  );
}

