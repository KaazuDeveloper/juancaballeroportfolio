"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Gamepad2, X } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { ComanderoScreen, DashboardScreen, ErpScreen, Laptop, Phone, Screen, TpvScreen } from "./Devices";
import { Reveal, ease } from "./ui";

const byIcon = (icon: Project["icon"]) => projects.find((p) => p.icon === icon)!;

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const show = (p: Project, el: HTMLElement) => {
    opener.current = el;
    setOpen(p);
  };
  const close = () => {
    setOpen(null);
    opener.current?.focus();
  };

  const tpv = byIcon("store");
  const small = [byIcon("building"), byIcon("activity"), byIcon("gamepad")];

  return (
    <section id="proyectos" className="scroll-mt-20 bg-mist px-3 py-20 md:px-5 md:py-28">
      <Reveal className="mx-auto max-w-[980px] px-2 text-center">
        <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-[-0.035em]">
          Proyectos.
        </h2>
        <p className="mx-auto mt-3 max-w-[620px] text-pretty text-[19px] leading-[1.45] text-ink-2 md:text-[21px]">
          Son proyectos de empresa, así que el código no es público. Esto es lo que hacen y con qué
          están construidos.
        </p>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-[1240px] gap-3 md:mt-16">
        <Reveal>
          <Tile project={tpv} onOpen={(e) => show(tpv, e.currentTarget)} dark>
            <div className="relative mx-auto mt-10 w-[94%] max-w-[760px]">
              <Laptop>
                <TpvScreen />
              </Laptop>
              <div className="absolute bottom-[-2%] right-[-3%] w-[24%] md:right-[-6%] md:w-[21%]">
                <Phone>
                  <ComanderoScreen />
                </Phone>
              </div>
            </div>
          </Tile>
        </Reveal>

        <div className="grid gap-3 md:grid-cols-3">
          {small.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <Tile project={p} onOpen={(e) => show(p, e.currentTarget)} compact>
                <div className="mt-8 px-6">
                  {p.icon === "building" && (
                    <Screen>
                      <ErpScreen />
                    </Screen>
                  )}
                  {p.icon === "activity" && (
                    <Screen>
                      <DashboardScreen />
                    </Screen>
                  )}
                  {p.icon === "gamepad" && (
                    <div className="flex aspect-[960/600] items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff375f] via-[#af52de] to-[#5856d6]">
                      <Gamepad2 className="size-[38%] text-white" strokeWidth={1.4} />
                    </div>
                  )}
                </div>
              </Tile>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <Modal project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}

function Tile({
  project: p,
  onOpen,
  dark,
  compact,
  children,
}: {
  project: Project;
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
  dark?: boolean;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[28px] text-center ${
        dark ? "bg-night text-white" : "bg-paper"
      } ${compact ? "pb-8 pt-10" : "pb-0 pt-12 md:pt-14"}`}
    >
      <div className="px-6">
        <p className={`text-[14px] font-semibold ${dark ? "text-[#a1a1a6]" : "text-ink-2"}`}>
          {p.kind} · {p.year}
        </p>
        <h3
          className={`mt-1 font-display font-semibold tracking-[-0.03em] ${
            compact ? "text-[28px]" : "text-[clamp(2.25rem,5vw,3.5rem)]"
          }`}
        >
          {p.title}
        </h3>
        <p
          className={`mx-auto mt-2 max-w-[560px] text-pretty leading-[1.4] ${
            compact ? "text-[17px]" : "text-[19px] md:text-[21px]"
          } ${dark ? "text-[#a1a1a6]" : "text-ink-2"}`}
        >
          {p.summary}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className={`mt-4 inline-flex items-center gap-0.5 text-[17px] hover:underline ${
            dark ? "text-[#2997ff]" : "text-link"
          }`}
        >
          Más información
          <ChevronRight className="size-4 translate-y-px" strokeWidth={2.2} />
        </button>
      </div>
      <div className={compact ? "mt-auto" : ""}>{children}</div>
    </article>
  );
}

function Modal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-8">
      <motion.div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.45, ease }}
        className="relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-[28px] bg-paper px-6 pb-12 pt-16 md:max-w-[720px] md:rounded-[28px] md:px-14 md:pb-14"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-[#e8e8ed] text-ink-2 transition-colors hover:bg-[#dcdce1] hover:text-ink"
        >
          <X className="size-4" strokeWidth={2.6} />
        </button>

        <p className="text-[14px] font-semibold text-ink-2">
          {p.kind} · {p.year}
        </p>
        <h3
          id="modal-title"
          className="mt-1 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
        >
          {p.title}
        </h3>
        <p className="mt-4 text-pretty text-[21px] leading-[1.4]">{p.summary}</p>

        <div className="mt-10 border-t border-line pt-8">
          <p className="text-[17px] font-semibold">Qué hice</p>
          <ul className="mt-4 space-y-3">
            {p.details.map((d) => (
              <li key={d} className="flex gap-3 text-[17px] leading-[1.45] text-ink-2">
                <Check className="mt-[3px] size-[18px] shrink-0 text-action" strokeWidth={2.6} />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <p className="text-[17px] font-semibold">Tecnologías</p>
            <p className="mt-2 text-[17px] leading-[1.45] text-ink-2">{p.stack.join(", ")}</p>
          </div>
          <div>
            <p className="text-[17px] font-semibold">Dónde</p>
            <p className="mt-2 text-[17px] leading-[1.45] text-ink-2">{p.context}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
