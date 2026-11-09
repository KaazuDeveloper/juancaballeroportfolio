import { Reveal } from "./ui";

const stats = [
  { value: "4", label: "plataformas", note: "Windows, web, Android e iOS" },
  { value: "3", label: "empresas", note: "Españolas e italianas" },
  { value: "2", label: "países", note: "España e Italia" },
  { value: "3", label: "idiomas", note: "Español, inglés e italiano" },
];

export function Highlights() {
  return (
    <>
      <section className="bg-paper px-5 py-20 md:py-28">
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
    </>
  );
}
