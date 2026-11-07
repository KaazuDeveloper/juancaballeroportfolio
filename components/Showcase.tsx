"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ComanderoScreen, Laptop, Phone, TpvScreen } from "./Devices";
import { ease } from "./ui";

const Studio = dynamic(() => import("./three/Studio"), { ssr: false });

/* `until` = scroll progress where each caption hands over. Must match the timeline in three/Studio.tsx. */
const captions = [
  {
    until: 0.19,
    title: "Primero, escucho.",
    body: "Entiendo cómo trabaja cada negocio antes de escribir una sola línea.",
  },
  { until: 0.45, title: "Después, lo programo.", body: "C# y .NET, Angular o Flutter, con los datos en MySQL." },
  { until: 0.62, title: "Lo pruebo.", body: "Pruebas automatizadas para que los fallos no lleguen a nadie." },
  { until: 0.86, title: "Y lo entrego.", body: "Publicado, funcionando y con soporte después." },
  { until: Infinity, title: "De la idea al producto final.", body: "Así trabajo con cada cliente." },
];

const captionAt = (p: number) => captions.findIndex((c) => p < c.until);

function Fallback() {
  return (
    <div className="flex h-full items-center justify-center px-5">
      <div className="relative w-full max-w-[760px]">
        <Laptop>
          <TpvScreen />
        </Laptop>
        <div className="absolute bottom-[-4%] left-[-4%] w-[24%]">
          <Phone>
            <ComanderoScreen />
          </Phone>
        </div>
      </div>
    </div>
  );
}

export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "200px 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothP = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.25 });
  const still = useMotionValue(1);
  const p = reduce ? still : smoothP;

  // Only one caption is ever on screen: switching on the raw scroll position avoids two half-faded
  // captions overlapping when scrolling quickly up and down.
  const [active, setActive] = useState(reduce ? captions.length - 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const i = captionAt(v);
    if (i !== active) setActive(i);
  });
  const c = captions[active];

  return (
    <section
      ref={ref}
      id="showcase"
      aria-label="Cómo trabajo: escuchar, programar, probar y entregar"
      className={`relative bg-mist ${reduce ? "h-svh" : "h-[650vh]"}`}
    >
      {/* Captions get their own band; the 3D canvas lives below it and never overlaps the text. */}
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="shrink-0 pt-20 md:pt-24">
          <div className="relative mx-auto h-[8.5rem] max-w-[900px] md:h-[7.5rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
                className="absolute inset-x-0 top-0 px-5 text-center"
              >
                <h2 className="text-balance font-display text-[clamp(1.75rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                  {c.title}
                </h2>
                <p className="mx-auto mt-2 max-w-[640px] text-[17px] text-ink-2 md:text-[21px]">{c.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <Studio progress={p} active={inView} fallback={<Fallback />} />
        </div>

        <p className="shrink-0 py-3 text-center text-[12px] text-ink-3">
          Escena ilustrativa.
        </p>
      </div>
    </section>
  );
}
