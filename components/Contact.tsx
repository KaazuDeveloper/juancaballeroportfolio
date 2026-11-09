"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { profile } from "@/lib/content";
import { PillButton, Reveal } from "./ui";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const link = "inline-flex items-center gap-1.5 text-[17px] text-[#2997ff] hover:underline";

  return (
    <>
      <section id="contacto" className="scroll-mt-20 bg-night px-5 py-28 text-center text-white md:py-40">
        <Reveal>
          <h2 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            ¿Hablamos?
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-pretty text-[19px] leading-[1.45] text-[#a1a1a6] md:text-[21px]">
            Si tienes un proyecto, un puesto o quieres comentar algo, escríbeme.
          </p>
          <div className="mt-9 flex justify-center">
            <PillButton href={`mailto:${profile.email}`}>
              <Mail className="size-[18px] sm:hidden" strokeWidth={2} />
              <span className="hidden sm:inline">Escribir a</span> {profile.email}
            </PillButton>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <button type="button" onClick={copy} className={link}>
              {copied ? <Check className="size-4" strokeWidth={2.4} /> : <Copy className="size-4" />}
              {copied ? "Email copiado" : "Copiar email"}
            </button>
            <a href={profile.cv} download className={link}>
              <Download className="size-4" />
              Descargar CV
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={link}>
              LinkedIn
              <ArrowUpRight className="size-4" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={link}>
              GitHub
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="bg-mist px-5 py-6 text-[12px] text-ink-2">
        <div className="mx-auto flex max-w-[980px] flex-col justify-between gap-1 sm:flex-row">
          <span>
            Copyright © {profile.year} {profile.name}.
          </span>
          <a href={profile.repo} target="_blank" rel="noreferrer" className="hover:underline">
            Código de esta web
          </a>
        </div>
      </footer>
    </>
  );
}
