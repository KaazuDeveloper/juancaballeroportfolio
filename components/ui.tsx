"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export const ease = [0.25, 0.1, 0.25, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function TextLink({
  href,
  children,
  dark,
  ...rest
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-0.5 text-[17px] hover:underline ${
        dark ? "text-[#2997ff]" : "text-link"
      }`}
      {...rest}
    >
      {children}
      <ChevronRight className="size-4 translate-y-px" strokeWidth={2.2} />
    </a>
  );
}

export function PillButton({
  href,
  children,
  variant = "filled",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: "filled" | "outline";
  target?: string;
  rel?: string;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-[22px] text-[17px] transition-colors ${
        variant === "filled"
          ? "bg-action text-white hover:bg-[#0077ed]"
          : "border border-action text-action hover:bg-action hover:text-white"
      }`}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[17px] font-semibold tracking-[-0.01em] md:text-[21px] ${className ?? "text-ink-2"}`}>
      {children}
    </p>
  );
}
