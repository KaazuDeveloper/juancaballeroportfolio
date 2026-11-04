import { education, experience, stack } from "@/lib/content";
import { Reveal } from "./ui";

export function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-20 bg-paper px-5 py-24 md:py-36">
      <div className="mx-auto max-w-[980px]">
        <Reveal>
          <p className="text-[17px] font-semibold text-ink-2 md:text-[19px]">Sobre mí</p>
          <h2 className="mt-2 max-w-[860px] text-balance font-display text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            Lo que más me gusta de mi trabajo es que no se queda en una demo.{" "}
            <span className="text-ink-3">Lo usan negocios reales, todos los días.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 text-[19px] leading-[1.5] text-ink-2 md:mt-16 md:grid-cols-2 md:gap-14">
          <Reveal>
            <p className="text-pretty">
              <span className="font-semibold text-ink">En el trabajo.</span> He pasado por empresas
              de Córdoba y por una de Italia, en proyectos de escritorio, web y móvil: aplicaciones en
              .NET, interfaces en Angular, apps en Flutter, servicios web y bases de datos con SQL
              Server. Me muevo con soltura por todo el stack y aprendo lo que cada proyecto necesite.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-pretty">
              <span className="font-semibold text-ink">Fuera del trabajo.</span> Videojuegos y juegos
              de mesa. Desde 2022 participo en la Málaga Game Jam, donde hacemos un juego completo en
              un fin de semana. Es la mejor escuela que conozco para trabajar en equipo y tomar
              decisiones rápido.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <h3 className="border-b border-line pb-4 font-display text-[28px] font-semibold tracking-[-0.02em]">
            Trayectoria
          </h3>
          <ul>
            {experience.map((e) => (
              <li
                key={e.company + e.period}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-0.5 border-b border-line py-5 md:grid-cols-[10rem_1fr_1fr_7rem] md:items-baseline"
              >
                <span className="order-2 text-[15px] tabular-nums text-ink-2 md:order-none md:text-[17px]">
                  {e.period}
                </span>
                <span className="order-1 text-[19px] font-semibold md:order-none">{e.company}</span>
                <span className="order-3 col-span-2 text-[17px] text-ink-2 md:col-span-1">{e.role}</span>
                <span className="order-4 col-span-2 text-[15px] text-ink-3 md:col-span-1 md:text-right">
                  {e.place}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] text-ink-2">{education}</p>
        </Reveal>

        <Reveal className="mt-20 md:mt-28">
          <h3 className="border-b border-line pb-4 font-display text-[28px] font-semibold tracking-[-0.02em]">
            Herramientas
          </h3>
          <div className="grid gap-x-8 gap-y-10 pt-8 sm:grid-cols-2 md:grid-cols-4">
            {stack.map((g) => (
              <div key={g.group}>
                <p className="text-[17px] font-semibold">{g.group}</p>
                <ul className="mt-3 space-y-1.5 text-[17px] text-ink-2">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
