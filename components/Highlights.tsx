import { Reveal } from "./ui";

const stats = [
  { value: "4", label: "plataformas", note: "Windows, web, Android e iOS" },
  { value: "3", label: "empresas", note: "En Córdoba y en Italia" },
  { value: "2", label: "países", note: "España e Italia" },
  { value: "3", label: "idiomas", note: "Español, inglés e italiano" },
];

export function Highlights() {
  return (
    <>
      <section className="bg-mist px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <Reveal>
            <h2 className="text-center font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              De la base de datos
              <br />a la pantalla.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center">
                <p className="font-display text-[clamp(3.5rem,7vw,5rem)] font-semibold leading-none tracking-[-0.04em]">
                  {s.value}
                </p>
                <p className="mt-2 text-[19px] font-semibold">{s.label}</p>
                <p className="mt-1 text-[15px] text-ink-2">{s.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-24 text-center md:py-36">
        <Reveal>
          <p className="text-[17px] font-semibold text-ink-2 md:text-[19px]">Clientes</p>
          <h2 className="mt-2 font-display text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Córdoba
            <br />
            <span className="text-gradient">y provincia.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-pretty text-[19px] leading-[1.45] text-ink-2 md:text-[21px]">
            Mis clientes no están solo en la capital: trabajo con negocios y empresas de distintos
            puntos de la provincia, y el software tiene que responder igual de bien en todos ellos.
          </p>
        </Reveal>
      </section>
    </>
  );
}
