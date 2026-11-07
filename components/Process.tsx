import { Code2, LifeBuoy, MessagesSquare, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "./ui";

const steps: { Icon: LucideIcon; color: string; title: string; body: string }[] = [
  {
    Icon: MessagesSquare,
    color: "#0071e3",
    title: "Entender el negocio.",
    body: "Antes de escribir código, entiendo cómo trabaja cada cliente: qué hace a diario y qué necesita que el software resuelva.",
  },
  {
    Icon: Code2,
    color: "#8e44ec",
    title: "Construir de punta a punta.",
    body: ".NET y MySQL por detrás; Angular, Windows Forms o Flutter por delante. Una sola persona para toda la pieza.",
  },
  {
    Icon: ShieldCheck,
    color: "#1d9a4a",
    title: "Probar antes que el cliente.",
    body: "Pruebas automatizadas con Selenium y monitorización con el stack ELK para encontrar los fallos antes de que lleguen a nadie.",
  },
  {
    Icon: LifeBuoy,
    color: "#f56300",
    title: "Mantenerlo vivo.",
    body: "El trabajo no acaba en la entrega: mantenimiento, nuevas funciones y soporte para que siga funcionando cada día.",
  },
];

export function Process() {
  return (
    <section className="bg-paper px-5 py-24 md:py-36">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="text-center">
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-[-0.035em]">
            Cómo trabajo.
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-pretty text-[19px] leading-[1.45] text-ink-2 md:text-[21px]">
            De la primera conversación al soporte del día a día.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {steps.map(({ Icon, color, title, body }, i) => (
            <li key={title} className="list-none">
              <Reveal delay={i * 0.08}>
                <Icon className="size-10" style={{ color }} strokeWidth={1.6} aria-hidden />
                <p className="mt-5 text-[13px] font-semibold tabular-nums text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-[21px] font-semibold leading-[1.2] tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="mt-2 text-pretty text-[17px] leading-[1.45] text-ink-2">{body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
