"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { profile } from "@/lib/content";

const links = [
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

export function Nav() {
  const active = useActiveSection();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="pointer-events-auto flex h-12 items-center gap-1 rounded-full max-[374px]:gap-0.5 border border-black/[0.06] bg-white/85 pl-1.5 pr-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md"
      >
        <a href="#top" aria-label="Inicio" className="flex items-center gap-2.5 sm:pr-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-ink text-[13px] font-semibold tracking-[-0.02em] text-white">
            JC
          </span>
          <span className="hidden text-[14px] font-semibold tracking-[-0.01em] md:block">
            {profile.name}
          </span>
        </a>

        <span aria-hidden className="mx-1 hidden h-5 w-px bg-line sm:block" />

        <ul className="flex items-center">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    className="absolute inset-0 rounded-full bg-mist"
                  />
                )}
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] transition-colors max-[374px]:px-[7px] max-[374px]:text-[12px] sm:px-3.5 sm:text-[14px] ${
                    isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={profile.cv}
          download
          className="ml-0.5 inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-3 text-[13px] max-[374px]:px-2.5 font-medium text-white transition-opacity hover:opacity-85 sm:ml-1 sm:px-4 sm:text-[14px]"
        >
          <Download className="size-3.5 max-[374px]:hidden" strokeWidth={2.4} />
          CV
        </a>
      </motion.nav>
    </header>
  );
}
