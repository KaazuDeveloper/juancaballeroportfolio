"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowUpRight, Building2, Camera, Check, ChevronLeft, ChevronRight, Dices, Gamepad2, ShoppingBag, Smartphone, Store, X } from "lucide-react";
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
  TrasLaPantallaMovilScreen,
  TrasLaPantallaScreen,
} from "./Devices";
import { Reveal, ease } from "./ui";

const byIcon = (icon: Project["icon"]) => projects.find((p) => p.icon === icon)!;

/* Iconos y colores de las tarjetas pequeñas. */
const ICONOS: Record<Project["icon"], typeof Store> = {
  phone: Smartphone,
  store: Store,
  shop: ShoppingBag,
  building: Building2,
  activity: Activity,
  gamepad: Gamepad2,
  camera: Camera,
  dice: Dices,
};
const TINTES: Record<Project["tint"], string> = {
  blue: "bg-[#0071e3]/10 text-[#0071e3]",
  green: "bg-[#1d9b5a]/10 text-[#1d9b5a]",
  orange: "bg-[#e8710a]/10 text-[#e8710a]",
  red: "bg-[#d23a27]/10 text-[#d23a27]",
  purple: "bg-[#8e44d6]/10 text-[#8e44d6]",
  pink: "bg-[#d6336c]/10 text-[#d6336c]",
  indigo: "bg-[#4f46e5]/10 text-[#4f46e5]",
  teal: "bg-[#0f9b9b]/10 text-[#0f9b9b]",
};

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

  /* Los que se pueden enseñar, con su ilustración en portátil y móvil, van en el carrusel. */
  const destacados: { project: Project; dark?: boolean; escena: ReactNode }[] = [
    {
      project: byIcon("dice"),
      dark: true,
      escena: (
        <Dispositivos movilDerecha movil={<TrasLaPantallaMovilScreen />}>
          <TrasLaPantallaScreen />
        </Dispositivos>
      ),
    },
    {
      project: byIcon("shop"),
      escena: (
        <Dispositivos movil={<TiendaMovilScreen />}>
          <TiendaScreen />
        </Dispositivos>
      ),
    },
    {
      project: byIcon("camera"),
      dark: true,
      escena: (
        <Dispositivos movilDerecha movil={<HiloRojoMovilScreen />}>
          <HiloRojoScreen />
        </Dispositivos>
      ),
    },
  ];
  /* Los de empresa, sin capturas reales, y los juegos van debajo en cuadrados. */
  const resto = projects.filter((p) => !destacados.some((d) => d.project === p));

  return (
    <section id="proyectos" className="scroll-mt-20 overflow-hidden bg-mist px-3 py-20 md:px-5 md:py-28">
      <Reveal className="mx-auto max-w-[980px] px-2 text-center">
        <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-[-0.035em]">
          Proyectos.
        </h2>
        <p className="mx-auto mt-3 max-w-[620px] text-pretty text-[19px] leading-[1.45] text-ink-2 md:text-[21px]">
          La mayoría son proyectos de empresa, así que su código no es público. Esto es lo que hacen y
          con qué están construidos.
        </p>
      </Reveal>

      <Carrusel>
        {destacados.map((d) => (
          <Tile key={d.project.title} project={d.project} onOpen={(e) => show(d.project, e.currentTarget)} dark={d.dark}>
            {d.escena}
          </Tile>
        ))}
      </Carrusel>

      {/* El resto, en cuadrados compactos */}
      <div className="mx-auto mt-20 max-w-[1240px] md:mt-24">
        <Reveal className="mb-6 px-2 text-center md:mb-8">
          <h3 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.03em]">Más proyectos.</h3>
          <p className="mt-1.5 text-[17px] text-ink-2 md:text-[19px]">Software de empresa, datos y videojuegos.</p>
        </Reveal>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {resto.map((p, i) => {
            const I = ICONOS[p.icon];
            return (
              <Reveal key={p.title} delay={i * 0.06} className="h-full">
                <li className="h-full">
                  <button
                    type="button"
                    onClick={(e) => show(p, e.currentTarget)}
                    className="group flex h-full w-full flex-col items-start rounded-[22px] bg-paper p-4 text-left transition-all duration-300 sm:p-6 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] lg:aspect-square"
                  >
                    <span className={`flex size-11 items-center justify-center rounded-[12px] ${TINTES[p.tint]}`}>
                      <I className="size-[22px]" strokeWidth={1.9} />
                    </span>
                    <span className="mt-4 text-[12px] font-semibold leading-[1.3] text-ink-2 sm:mt-5 sm:text-[13px]">
                      {p.kind} · {p.year}
                    </span>
                    <h4 className="mt-1 font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[21px]">{p.title}</h4>
                    <span className="mt-2 line-clamp-3 hidden text-[15px] leading-[1.4] text-ink-2 sm:block">{p.summary}</span>
                    <span className="mt-auto inline-flex items-center gap-0.5 pt-3 text-[14px] text-link group-hover:underline sm:pt-4 sm:text-[15px]">
                      Más información
                      <ChevronRight className="size-4 translate-y-px" strokeWidth={2.2} />
                    </span>
                  </button>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>{open && <Modal project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}

/* Portátil con un móvil encima, a un lado. */
function Dispositivos({ children, movil, movilDerecha }: { children: ReactNode; movil: ReactNode; movilDerecha?: boolean }) {
  return (
    <div className="relative mx-auto mt-8 w-[86%] max-w-[660px] lg:mt-0 lg:w-[86%]">
      <Laptop>{children}</Laptop>
      <div className={`absolute bottom-[-2%] w-[24%] md:w-[21%] ${movilDerecha ? "right-[-3%] md:right-[-6%]" : "left-[-3%] md:left-[-6%]"}`}>
        <Phone>{movil}</Phone>
      </div>
    </div>
  );
}

/* Carrusel con desplazamiento nativo (se arrastra con el dedo), flechas y puntos. */
function Carrusel({ children }: { children: ReactNode[] }) {
  const pista = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);
  const total = children.length;

  const ir = (i: number) => {
    const el = pista.current;
    const hijo = el?.children[i] as HTMLElement | undefined;
    if (!el || !hijo) return;
    setActual(i);
    const r = hijo.getBoundingClientRect();
    const p = el.getBoundingClientRect();
    el.scrollBy({ left: r.left + r.width / 2 - (p.left + p.width / 2), behavior: "smooth" });
  };

  const alDesplazar = () => {
    const el = pista.current;
    if (!el) return;
    const p = el.getBoundingClientRect();
    const centro = p.left + p.width / 2;
    let mejor = 0;
    let distancia = Infinity;
    [...el.children].forEach((h, i) => {
      const r = h.getBoundingClientRect();
      const c = r.left + r.width / 2;
      if (Math.abs(c - centro) < distancia) {
        distancia = Math.abs(c - centro);
        mejor = i;
      }
    });
    setActual(mejor);
  };

  return (
    <div className="-mx-3 mt-10 md:-mx-5 md:mt-12">
      <div
        ref={pista}
        onScroll={alDesplazar}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[6vw] pb-2 [scrollbar-width:none] md:px-[max(40px,calc((100vw-1120px)/2))] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((hijo, i) => (
          <div key={i} className="w-[88vw] max-w-[1120px] shrink-0 snap-center md:w-[min(1120px,84vw)]" aria-roledescription="diapositiva" aria-label={`${i + 1} de ${total}`}>
            {hijo}
          </div>
        ))}
      </div>
      {total > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => ir(Math.max(0, actual - 1))}
            disabled={actual === 0}
            aria-label="Proyecto anterior"
            className="flex size-10 items-center justify-center rounded-full bg-[#e8e8ed] text-ink transition-colors hover:bg-[#dcdce1] disabled:opacity-35"
          >
            <ChevronLeft className="size-5" strokeWidth={2.2} />
          </button>
          <div className="flex gap-2">
            {children.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => ir(i)}
                aria-label={`Ir al proyecto ${i + 1}`}
                aria-current={i === actual}
                className={`h-2 rounded-full transition-all duration-300 ${i === actual ? "w-6 bg-ink" : "w-2 bg-[#c7c7cc] hover:bg-ink-3"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => ir(Math.min(total - 1, actual + 1))}
            disabled={actual === total - 1}
            aria-label="Proyecto siguiente"
            className="flex size-10 items-center justify-center rounded-full bg-[#e8e8ed] text-ink transition-colors hover:bg-[#dcdce1] disabled:opacity-35"
          >
            <ChevronRight className="size-5" strokeWidth={2.2} />
          </button>
        </div>
      )}
    </div>
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
      className={`relative isolate flex h-full flex-col overflow-hidden rounded-[28px] text-center lg:flex-row lg:items-center lg:text-left ${
        dark ? "bg-night text-white" : "bg-paper"
      } ${compact ? "pb-8 pt-10" : "pb-0 pt-10 md:pt-12 lg:py-12"}`}
    >
      <div className="relative px-6 lg:w-[42%] lg:shrink-0 lg:pl-14 lg:pr-2">
        {p.badge && (
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#e0442f]/15 px-3 py-1 text-[13px] font-semibold text-[#ff6b55]">
            <span className="size-1.5 rounded-full bg-[#ff6b55]" />
            {p.badge}
          </p>
        )}
        <p className={`text-[14px] font-semibold ${dark ? "text-[#a1a1a6]" : "text-ink-2"}`}>
          {p.kind} · {p.year}
        </p>
        <h4
          className={`mt-1 font-display font-semibold tracking-[-0.03em] ${
            compact ? "text-[28px]" : "text-[clamp(2rem,4vw,2.875rem)]"
          }`}
        >
          {p.title}
        </h4>
        <p
          className={`mx-auto mt-2 max-w-[520px] text-pretty lg:mx-0 leading-[1.4] ${
            compact ? "text-[17px]" : "text-[17px] md:text-[19px]"
          } ${dark ? "text-[#a1a1a6]" : "text-ink-2"}`}
        >
          {p.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 lg:justify-start">
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
        {p.stats && (
          <dl className="mx-auto mt-7 grid max-w-[600px] lg:mx-0 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
            {p.stats.map((st) => (
              <div key={st.label} className="flex flex-col-reverse justify-end">
                <dt className={`mt-1 text-[13px] leading-[1.3] ${dark ? "text-[#a1a1a6]" : "text-ink-2"}`}>{st.label}</dt>
                <dd className="font-display text-[clamp(1.6rem,3vw,2.125rem)] font-semibold leading-none tracking-[-0.03em]">{st.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className={`relative ${compact ? "mt-auto" : "lg:flex-1 lg:pr-12"}`}>{children}</div>
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

        {(p.icon === "store" || p.icon === "building") && (
          <div className="mt-8 border-t border-line pt-8">
            <p className="text-[17px] font-semibold">Cómo es</p>
            <div className="relative mt-5 pb-[8%]">
              <Screen>{p.icon === "store" ? <TpvScreen /> : <ErpScreen />}</Screen>
              {p.icon === "store" && (
                <div className="absolute bottom-0 right-[-2%] w-[22%]">
                  <Phone>
                    <ComanderoScreen />
                  </Phone>
                </div>
              )}
            </div>
            <p className="mt-6 text-[13px] text-ink-3">Ilustración propia; no muestra datos reales de la empresa.</p>
          </div>
        )}

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
