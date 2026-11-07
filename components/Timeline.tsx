"use client";

import { motion } from "framer-motion";
import { timeline, type TimelineKind } from "@/lib/content";
import { Reveal, ease } from "./ui";

const START = 2022;
const END = 2027;
const years = Array.from({ length: END - START }, (_, i) => START + i);

const kinds: Record<TimelineKind, { label: string; color: string }> = {
  trabajo: { label: "Trabajo", color: "#0071e3" },
  formacion: { label: "Formación", color: "#1d9a4a" },
  juegos: { label: "Game jams", color: "#8e44ec" },
};

const pos = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return ((y + (m - 1) / 12 - START) / (END - START)) * 100;
};

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink-2">
      {Object.values(kinds).map((k) => (
        <span key={k.label} className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ background: k.color }} />
          {k.label}
        </span>
      ))}
    </div>
  );
}

function Gantt() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-[280px_1fr] gap-x-8">
        <div />
        <div className="relative flex h-8 text-[13px] font-medium tabular-nums text-ink-3">
          {years.map((y) => (
            <span key={y} className="flex-1 border-l border-line pl-2">
              {y}
            </span>
          ))}
        </div>
      </div>

      <ul>
        {timeline.map((t, i) => {
          const left = pos(t.from);
          const right = t.to ? pos(t.to) : 100;
          const color = kinds[t.kind].color;
          return (
            <li key={t.org} className="grid grid-cols-[280px_1fr] items-center gap-x-8 border-t border-line py-5">
              <div>
                <p className="text-[17px] font-semibold leading-tight">{t.org}</p>
                <p className="mt-0.5 text-[14px] leading-snug text-ink-2">{t.role}</p>
              </div>
              <div className="relative h-11">
                <div className="absolute inset-0 flex">
                  {years.map((y) => (
                    <span key={y} className="flex-1 border-l border-line/60" />
                  ))}
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 1, ease, delay: 0.1 + i * 0.1 }}
                  className="absolute inset-y-1.5 flex origin-left items-center overflow-hidden rounded-full px-3.5 text-[13px] font-medium text-white"
                  style={{
                    left: `${left}%`,
                    width: `${right - left}%`,
                    background: t.to
                      ? color
                      : `linear-gradient(90deg, ${color} 60%, color-mix(in srgb, ${color} 15%, transparent))`,
                  }}
                >
                  <span className="truncate">{right - left > 23 ? `${t.period} · ${t.place}` : ""}</span>
                </motion.div>
                {right - left <= 23 && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pl-3 text-[13px] text-ink-2"
                    style={{ left: `${right}%` }}
                  >
                    {t.period} · {t.place}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Vertical() {
  return (
    <ol className="relative mt-8 border-l-2 border-line pl-6">
      {timeline.map((t) => {
        const color = kinds[t.kind].color;
        return (
          <li key={t.org} className="relative pb-9 last:pb-0">
            <span
              className="absolute -left-[33px] top-1 size-4 rounded-full border-[3px] border-paper"
              style={{ background: color }}
            />
            <p className="text-[14px] font-semibold tabular-nums" style={{ color }}>
              {t.period}
            </p>
            <p className="mt-1 text-[19px] font-semibold leading-tight">{t.org}</p>
            <p className="text-[15px] text-ink-2">
              {t.role} · {t.place}
            </p>
            <p className="mt-1.5 text-[15px] leading-snug text-ink-3">{t.note}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function Timeline() {
  return (
    <Reveal>
      <div className="flex flex-col gap-4 border-b border-line pb-4 md:flex-row md:items-end md:justify-between">
        <h3 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Trayectoria</h3>
        <Legend />
      </div>
      <div className="hidden lg:block">
        <Gantt />
      </div>
      <div className="lg:hidden">
        <Vertical />
      </div>
    </Reveal>
  );
}
