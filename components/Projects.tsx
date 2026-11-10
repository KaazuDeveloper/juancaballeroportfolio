"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight, X } from "lucide-react";
import { profile, projects, type Game, type Project } from "@/lib/content";
import {
  ComanderoScreen,
  DashboardScreen,
  ElkPipelineScreen,
  ErpScreen,
  HiloRojoMovilScreen,
  HiloRojoScreen,
  Laptop,
  Phone,
  Screen,
  SeleniumScreen,
  TiendaMovilScreen,
  TiendaScreen,
  TpvScreen,
} from "./Devices";
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

  const hilo = byIcon("camera");
  const tienda = byIcon("shop");
  /* El TPV va en pequeño: es de la empresa actual y no se muestran capturas reales. */
  const small = [byIcon("store"), byIcon("building"), byIcon("gamepad"), byIcon("activity")];

  return (
    <section id="proyectos" className="scroll-mt-20 bg-mist px-3 py-20 md:px-5 md:py-28">
      <Reveal className="mx-auto max-w-[980px] px-2 text-center">
        <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-[-0.035em]">
          Proyectos.
        </h2>
        <p className="mx-auto mt-3 max-w-[620px] text-pretty text-[19px] leading-[1.45] text-ink-2 md:text-[21px]">
          La mayoría son proyectos de empresa, así que su código no es público. Esto es lo que hacen y
          con qué están construidos.
        </p>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-[1240px] gap-3 md:mt-16">
        <Reveal>
          <Tile project={hilo} onOpen={(e) => show(hilo, e.currentTarget)} dark>
            <div className="relative mx-auto mt-10 w-[94%] max-w-[760px]">
              <Laptop>
                <HiloRojoScreen />
              </Laptop>
              <div className="absolute bottom-[-2%] right-[-3%] w-[24%] md:right-[-6%] md:w-[21%]">
                <Phone>
                  <HiloRojoMovilScreen />
                </Phone>
              </div>
            </div>
          </Tile>
        </Reveal>

        <Reveal>
          <Tile project={tienda} onOpen={(e) => show(tienda, e.currentTarget)}>
            <div className="relative mx-auto mt-10 w-[94%] max-w-[760px]">
              <Laptop>
                <TiendaScreen />
              </Laptop>
              <div className="absolute bottom-[-2%] left-[-3%] w-[24%] md:left-[-6%] md:w-[21%]">
                <Phone>
                  <TiendaMovilScreen />
                </Phone>
              </div>
            </div>
          </Tile>
        </Reveal>

        <div className="grid gap-3 md:grid-cols-2">
          {small.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <Tile project={p} onOpen={(e) => show(p, e.currentTarget)} compact>
                <div className="mt-8 px-6">
                  {p.icon === "store" && (
                    <div className="relative pb-[8%]">
                      <Screen>
                        <TpvScreen />
                      </Screen>
                      <div className="absolute bottom-0 right-[-2%] w-[22%]">
                        <Phone>
                          <ComanderoScreen />
                        </Phone>
                      </div>
                    </div>
                  )}
                  {p.icon === "building" && (
                    <Screen>
                      <ErpScreen />
                    </Screen>
                  )}
                  {p.icon === "activity" && (
                    <div className="relative pb-[32%]">
                      <Screen width={720} height={300}>
                        <ElkPipelineScreen compact />
                      </Screen>
                      <div className="absolute bottom-0 right-[-3%] w-[58%]">
                        <Screen width={720} height={450}>
                          <SeleniumScreen />
                        </Screen>
                      </div>
                    </div>
                  )}
                  {p.games && (
                    <div className="grid grid-cols-2 gap-3">
                      {p.games.map((g) => (
                        <GameCard key={g.title} game={g} />
                      ))}
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

const elkFigures = [
  {
    screen: (
      <Screen width={720} height={450}>
        <ElkPipelineScreen />
      </Screen>
    ),
    caption: "Logstash recoge y transforma los datos, y Elasticsearch los indexa para poder buscar en ellos.",
  },
  {
    screen: (
      <Screen>
        <DashboardScreen />
      </Screen>
    ),
    caption: "Kibana convierte esos datos en paneles para ver de un vistazo qué está pasando.",
  },
  {
    screen: (
      <Screen width={720} height={450}>
        <SeleniumScreen />
      </Screen>
    ),
    caption: "Selenium controla el navegador y repite lo que haría un usuario para detectar fallos.",
  },
];

function ElkFigures() {
  return (
    <div className="mt-8 border-t border-line pt-8">
      <p className="text-[17px] font-semibold">Cómo funciona</p>
      <div className="mt-5 space-y-7">
        {elkFigures.map((f) => (
          <figure key={f.caption}>
            {f.screen}
            <figcaption className="mt-3 text-[15px] leading-[1.4] text-ink-2">{f.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-[13px] text-ink-3">Ilustraciones propias; no muestran datos reales.</p>
    </div>
  );
}

function GameCover({ game: g, className }: { game: Game; className: string }) {
  return (
    // Plain <img>: small thumbnails served by itch.io's own CDN.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={g.cover} alt={`Portada de ${g.title}`} width={315} height={250} loading="lazy" className={className} />
  );
}

function GameCard({ game: g }: { game: Game }) {
  return (
    <a href={g.url} target="_blank" rel="noreferrer" className="group block text-left">
      <span className="block overflow-hidden rounded-[14px] bg-mist">
        <GameCover
          game={g}
          className="aspect-[315/250] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </span>
      <span className="mt-2.5 block text-[15px] font-semibold leading-[1.25] tracking-[-0.01em] group-hover:underline">
        {g.title}
      </span>
      <span className="mt-0.5 block text-[13px] leading-[1.3] text-ink-2">{g.jam}</span>
    </a>
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
        {p.badge && (
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#e0442f]/15 px-3 py-1 text-[13px] font-semibold text-[#ff6b55]">
            <span className="size-1.5 rounded-full bg-[#ff6b55]" />
            {p.badge}
          </p>
        )}
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
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <button
            type="button"
            onClick={onOpen}
            className={`inline-flex items-center gap-0.5 text-[17px] hover:underline ${
              dark ? "text-[#2997ff]" : "text-link"
            }`}
          >
            Más información
            <ChevronRight className="size-4 translate-y-px" strokeWidth={2.2} />
          </button>
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 text-[17px] text-link hover:underline"
            >
              Ver la web
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 text-[17px] text-link hover:underline"
            >
              Ver el código
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </a>
          )}
        </div>
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
          {p.badge && <span className="text-[#d23a27]">{p.badge} · </span>}
          {p.kind} · {p.year}
        </p>
        <h3
          id="modal-title"
          className="mt-1 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
        >
          {p.title}
        </h3>
        <p className="mt-4 text-pretty text-[21px] leading-[1.4]">{p.summary}</p>
        {(p.url || p.repo) && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 text-[17px] text-link hover:underline"
              >
                Ver la web
                <ArrowUpRight className="size-4" strokeWidth={2.2} />
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 text-[17px] text-link hover:underline"
              >
                Ver el código
                <ArrowUpRight className="size-4" strokeWidth={2.2} />
              </a>
            )}
          </div>
        )}

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

        {p.icon === "activity" && <ElkFigures />}

        {p.games && (
          <div className="mt-8 border-t border-line pt-8">
            <p className="text-[17px] font-semibold">Algunos juegos</p>
            <ul className="mt-4 space-y-5">
              {p.games.map((g) => (
                <li key={g.title}>
                  <a href={g.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
                    <GameCover game={g} className="aspect-[315/250] w-[92px] shrink-0 rounded-[12px] object-cover" />
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 text-[17px] font-semibold leading-[1.25] group-hover:underline">
                        {g.title}
                        <ArrowUpRight className="size-4 shrink-0 text-ink-3" />
                      </span>
                      <span className="mt-1 block text-[15px] leading-[1.35] text-ink-2">{g.blurb}</span>
                      <span className="mt-1 block text-[13px] text-ink-3">{g.jam}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profile.itch}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-0.5 text-[17px] text-link hover:underline"
            >
              Ver todos en itch.io
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        )}

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
