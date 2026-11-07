"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { profile } from "@/lib/content";
import { PillButton, ease } from "./ui";

const up = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease, delay },
});

const TECH = [".NET 8", "ASP.NET", "C#", "Angular", "Flutter", "MySQL", "Windows Forms", "Telerik", "PHP", "Node.js", "Selenium", "Kibana", "Unity3D"];

function TechStrip() {
  const row = TECH.map((t) => (
    <span key={t} className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
      <span>{t}</span>
      <span className="size-1 rounded-full bg-ink-3/60" />
    </span>
  ));
  return (
    <motion.div
      {...up(0.45)}
      className="relative mt-16 w-full max-w-[1100px] overflow-hidden text-[15px] font-medium text-ink-3 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] md:[mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)] md:mt-20 md:text-[17px]"
    >
      <div className="marquee flex w-max">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden>
          {row}
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-paper px-5 pb-24 pt-28 text-center"
    >
      <div className="relative flex w-full flex-col items-center">
        <motion.p {...up(0)} className="text-[19px] font-semibold text-[#bf4800] md:text-[24px]">
          {profile.role}
        </motion.p>
        <motion.h1
          {...up(0.1)}
          className="mt-3 font-display text-[clamp(4.2rem,12.5vw,10.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
        >
          Juan Caballero.
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mx-auto mt-6 max-w-[900px] text-balance font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink-2"
        >
          Software que se usa cada día en negocios de{" "}
          <span className="text-ink">toda la provincia de Córdoba.</span>
        </motion.p>
        <motion.div {...up(0.26)} className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <PillButton href="#proyectos">Ver proyectos</PillButton>
          <PillButton href={profile.cv} variant="outline" download>
            <Download className="size-4" strokeWidth={2.2} />
            Descargar CV
          </PillButton>
        </motion.div>
        <TechStrip />
      </div>

      <motion.a
        href="#showcase"
        aria-label="Bajar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-3 transition-colors hover:text-ink"
      >
        <motion.span
          className="block"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-7" strokeWidth={1.8} />
        </motion.span>
      </motion.a>
    </section>
  );
}
