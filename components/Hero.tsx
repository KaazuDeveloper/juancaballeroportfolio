"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { profile } from "@/lib/content";
import { ComanderoScreen, Laptop, Phone, TpvScreen } from "./Devices";
import { PillButton, ease } from "./ui";

const up = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export function Hero() {
  return (
    <section id="top" className="overflow-hidden bg-paper px-5 pt-28 text-center md:pt-36">
      <motion.p {...up(0)} className="text-[17px] font-semibold text-[#bf4800] md:text-[19px]">
        {profile.role}
      </motion.p>
      <motion.h1
        {...up(0.08)}
        className="mt-2 font-display text-[clamp(3rem,8.5vw,5.75rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
      >
        Juan Caballero.
      </motion.h1>
      <motion.p
        {...up(0.16)}
        className="mx-auto mt-4 max-w-[760px] text-balance font-display text-[clamp(1.3rem,2.7vw,1.85rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink-2"
      >
        Software que se usa cada día en negocios de{" "}
        <span className="text-ink">toda la provincia de Córdoba.</span>
      </motion.p>
      <motion.div {...up(0.24)} className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
        <PillButton href="#proyectos">Ver proyectos</PillButton>
        <PillButton href={profile.cv} variant="outline" download>
          <Download className="size-4" strokeWidth={2.2} />
          Descargar CV
        </PillButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease, delay: 0.35 }}
        className="relative mx-auto mt-14 max-w-[960px] md:mt-20"
      >
        <div className="mx-auto w-[88%] md:w-[84%]">
          <Laptop>
            <TpvScreen />
          </Laptop>
        </div>
        <div className="absolute bottom-[-2%] left-[1%] w-[24%] md:left-[3%] md:w-[20%]">
          <Phone>
            <ComanderoScreen />
          </Phone>
        </div>
      </motion.div>
      <p className="mx-auto max-w-[960px] pb-16 pt-8 text-[12px] text-ink-3 md:pb-24">
        Recreaciones ilustrativas del TPV y del comandero en los que trabajo.
      </p>
    </section>
  );
}
