"use client";

import { Fragment, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, type MotionStyle } from "framer-motion";
import { ChartColumn, Check, ChevronRight, FileText, Filter, Minus, MousePointer2, Plus, Search } from "lucide-react";
import { TESTS, order, products, ticket } from "@/lib/demo";
import { Playfair_Display } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"], weight: "400", display: "swap" });

/* Renders children at a fixed design size and scales them to the container width. */
export function Fit({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}

export function Laptop({ children, lid }: { children: ReactNode; lid?: MotionStyle }) {
  return (
    <div className="w-full [perspective:2400px]">
      <motion.div
        style={{ transformOrigin: "50% 100%", ...lid }}
        className="rounded-t-[4.5%_7%] bg-[#0d0d0f] p-[1.8%] pb-[2.4%] shadow-[0_0_0_1px_#3a3a3c_inset] [backface-visibility:hidden]"
      >
        <div className="overflow-hidden rounded-[0.6%] bg-white">
          <Fit width={960} height={600}>
            {children}
          </Fit>
        </div>
      </motion.div>
      <div className="relative mx-[-6%] h-[clamp(8px,2.2vw,18px)] rounded-b-[40%_100%] bg-gradient-to-b from-[#e3e4e6] via-[#c9cacc] to-[#a1a2a5]">
        <div className="absolute left-1/2 top-0 h-[45%] w-[14%] -translate-x-1/2 rounded-b-[10px] bg-[#b4b5b8]" />
      </div>
    </div>
  );
}

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full rounded-[16%/7.4%] bg-[#1d1d1f] p-[3.2%] shadow-[0_0_0_1.5px_#48484a_inset,0_30px_60px_-20px_rgba(0,0,0,0.35)]">
      <div className="relative overflow-hidden rounded-[13%/6%] bg-white">
        <Fit width={390} height={844}>
          {children}
        </Fit>
        <div className="absolute left-1/2 top-[1.6%] h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

export function TpvScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f2f3f5] font-sans text-[#1d1d1f]">
      <div className="flex h-11 items-center justify-between bg-[#1f2a37] px-5 text-[14px] text-white">
        <span className="font-semibold">TPV · Hostelería</span>
        <span className="opacity-70">Mesa 4 · Terraza</span>
        <span className="tabular-nums opacity-70">21:42</span>
      </div>
      <div className="flex min-h-0 flex-1 gap-4 p-4">
        <div className="flex flex-1 flex-col">
          <div className="mb-3 flex gap-2 text-[13px] font-medium">
            {["Bebidas", "Cafés", "Raciones", "Postres"].map((c, i) => (
              <span
                key={c}
                className={`rounded-md px-4 py-2 ${i === 2 ? "bg-[#0071e3] text-white" : "bg-white text-[#3a3a3c]"}`}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-4 gap-2.5">
            {products.map((p) => (
              <div key={p.name} className="flex flex-col justify-between rounded-lg bg-white p-3 shadow-sm">
                <span className="h-1.5 w-8 rounded-full" style={{ background: p.color }} />
                <div>
                  <p className="text-[14px] font-semibold leading-tight">{p.name}</p>
                  <p className="mt-0.5 text-[13px] tabular-nums text-[#6e6e73]">{p.price} €</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-[260px] flex-col rounded-lg bg-white p-4 shadow-sm">
          <p className="text-[15px] font-semibold">Ticket</p>
          <div className="mt-3 flex-1 space-y-2.5 text-[14px]">
            {ticket.map((t) => (
              <div key={t.name} className="flex justify-between">
                <span>
                  <span className="text-[#6e6e73]">{t.qty}×</span> {t.name}
                </span>
                <span className="tabular-nums">{t.total}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#e5e5ea] pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] text-[#6e6e73]">Total</span>
              <span className="text-[26px] font-semibold tabular-nums tracking-tight">16,10 €</span>
            </div>
            <div className="mt-3 flex h-12 items-center justify-center rounded-lg bg-[#34c759] text-[16px] font-semibold text-white">
              Cobrar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComanderoScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f2f2f7] font-sans text-[#1d1d1f]">
      <div className="px-5 pb-3 pt-[64px]">
        <p className="text-[15px] text-[#6e6e73]">Terraza · 3 comensales</p>
        <p className="text-[34px] font-bold tracking-tight">Mesa 4</p>
        <div className="mt-3 flex rounded-[9px] bg-[#e3e3e8] p-[2px] text-[13px] font-medium">
          {["Todo", "Bebidas", "Raciones", "Postres"].map((c, i) => (
            <span
              key={c}
              className={`flex-1 rounded-[7px] py-1.5 text-center ${i === 0 ? "bg-white shadow-sm" : ""}`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-4 overflow-hidden rounded-[14px] bg-white">
        {order.map((o, i) => (
          <div
            key={o.name}
            className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-[#e5e5ea]" : ""}`}
          >
            <div className="flex-1">
              <p className="text-[16px] font-medium">{o.name}</p>
              <p className="text-[13px] text-[#8e8e93]">
                {o.note} · {o.price} €
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#f2f2f7] text-[#0071e3]">
                <Minus className="size-3.5" strokeWidth={3} />
              </span>
              <span className="w-3 text-center text-[16px] font-semibold tabular-nums">{o.qty}</span>
              <span className="flex size-7 items-center justify-center rounded-full bg-[#0071e3] text-white">
                <Plus className="size-3.5" strokeWidth={3} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto px-4 pb-9">
        <div className="flex h-[52px] items-center justify-between rounded-[14px] bg-[#0071e3] px-5 text-white">
          <span className="text-[16px] font-semibold">Enviar a cocina</span>
          <span className="text-[16px] font-semibold tabular-nums">16,10 €</span>
        </div>
      </div>
    </div>
  );
}

const bars = [38, 52, 45, 70, 62, 88, 74, 96, 80, 66, 92, 84];

export function DashboardScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0f1117] p-5 font-sans text-white">
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-semibold">Monitorización · Últimas 24 h</span>
        <span className="rounded bg-white/10 px-2 py-1 text-white/70">Kibana</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          ["Eventos", "1,2 M"],
          ["Errores", "0,3 %"],
          ["Latencia", "84 ms"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-white/5 p-3">
            <p className="text-[12px] text-white/50">{k}</p>
            <p className="mt-1 text-[22px] font-semibold tabular-nums">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-1 items-end gap-2 rounded-lg bg-white/5 p-4">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[3px] bg-gradient-to-t from-[#0071e3] to-[#5ac8fa]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

const elkSteps = [
  { Icon: FileText, name: "Logs", note: "Apps y servidores", color: "#a1a1a6" },
  { Icon: Filter, name: "Logstash", note: "Recoge y transforma", color: "#ff9f0a" },
  { Icon: Search, name: "Elasticsearch", note: "Indexa y busca", color: "#30d158" },
  { Icon: ChartColumn, name: "Kibana", note: "Visualiza", color: "#5ac8fa" },
];

const logLines = [
  ["12:04:31", "INFO", "Pedido creado", "text-white/55"],
  ["12:04:33", "WARN", "Latencia alta en la API", "text-[#ff9f0a]"],
  ["12:04:36", "ERROR", "Tiempo de espera agotado", "text-[#ff453a]"],
];

/* Original illustration of the ELK data flow. Use at 720×450, or 720×300 with `compact`. */
export function ElkPipelineScreen({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex h-full flex-col bg-[#0f1117] font-sans text-white ${compact ? "p-6" : "p-8"}`}>
      <div className="flex items-center justify-between text-[17px]">
        <span className="font-semibold">Flujo de datos</span>
        <span className="rounded-md bg-white/10 px-2.5 py-1 text-[14px] text-white/70">Stack ELK</span>
      </div>
      <div className={`flex items-center ${compact ? "mt-5" : "mt-7"}`}>
        {elkSteps.map(({ Icon, name, note, color }, i) => (
          <Fragment key={name}>
            <div className="flex h-[176px] w-[138px] shrink-0 flex-col items-center justify-center rounded-2xl bg-white/[0.06] px-2 text-center">
              <span
                className="flex size-14 items-center justify-center rounded-full"
                style={{ background: `${color}26`, color }}
              >
                <Icon className="size-7" strokeWidth={1.8} />
              </span>
              <p className="mt-3 text-[18px] font-semibold tracking-[-0.01em]">{name}</p>
              <p className="mt-1 text-[13px] leading-[1.25] text-white/55">{note}</p>
            </div>
            {i < elkSteps.length - 1 && (
              <div className="flex flex-1 items-center justify-center text-white/35">
                <ChevronRight className="size-6" strokeWidth={2.2} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      {!compact && (
        <div className="mt-auto rounded-xl bg-white/[0.06] px-4 py-3 font-mono text-[14px] leading-[1.7]">
          {logLines.map(([time, level, msg, tone]) => (
            <p key={time} className="flex gap-4">
              <span className="text-white/40">{time}</span>
              <span className={`w-[52px] font-semibold ${tone}`}>{level}</span>
              <span className="text-white/75">{msg}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/* Original illustration of a Selenium run: a browser driven by the tests. Use at 720×450. */
export function SeleniumScreen() {
  const shown = TESTS.slice(0, 6);
  return (
    <div className="flex h-full flex-col bg-white font-sans text-[#1d1d1f]">
      <div className="flex h-[48px] shrink-0 items-center gap-2 border-b border-black/10 bg-[#f5f5f7] px-4">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="size-3 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-center text-[14px] text-[#6e6e73] ring-1 ring-black/5">
          Navegador controlado por Selenium
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="relative w-[320px] shrink-0 p-6">
          <p className="text-[22px] font-semibold tracking-[-0.02em]">Nuevo pedido</p>
          <p className="mt-4 text-[13px] text-[#6e6e73]">Cliente</p>
          <div className="mt-1 rounded-lg px-3 py-2 text-[16px] ring-1 ring-black/15">Cliente 1</div>
          <p className="mt-3 text-[13px] text-[#6e6e73]">Producto</p>
          <div className="mt-1 rounded-lg px-3 py-2 text-[16px] ring-2 ring-[#0071e3]">Producto A</div>
          <div className="mt-5 inline-flex rounded-full bg-[#0071e3] px-6 py-2 text-[16px] font-medium text-white">
            Guardar
          </div>
          <MousePointer2
            className="absolute left-[100px] top-[262px] size-8 fill-[#1d1d1f] text-white"
            strokeWidth={1.4}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col border-l border-black/10 bg-[#fafafa] p-5">
          <p className="text-[17px] font-semibold">Pruebas</p>
          <ul className="mt-3 space-y-[9px] text-[15px]">
            {shown.map((t, i) => (
              <li key={t} className="flex items-center gap-2.5">
                {i < shown.length - 1 ? (
                  <span className="flex size-[20px] shrink-0 items-center justify-center rounded-full bg-[#34c759] text-white">
                    <Check className="size-3.5" strokeWidth={3.2} />
                  </span>
                ) : (
                  <span className="size-[20px] shrink-0 rounded-full border-[3px] border-[#0071e3] border-t-transparent" />
                )}
                <span className="truncate">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-auto text-[14px] text-[#6e6e73]">5 correctas · 1 en curso</p>
        </div>
      </div>
    </div>
  );
}

/* The La Caja Caballero home page and shop, drawn at device size with the real product photos. */
export function TiendaScreen() {
  return (
    <div className="flex h-full flex-col bg-black font-sans text-[#f5f5f7]">
      <div className="flex h-[38px] shrink-0 items-center justify-between bg-[#161617] px-8 text-[12px]">
        <span className="font-semibold">La Caja Caballero</span>
        <span className="flex gap-6 text-[#d2d2d7]">
          <span>Tienda</span>
          <span>Personaliza</span>
          <span>Tutoriales</span>
          <span>Nosotros</span>
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between pl-[225px] pr-6">
        <div>
          <p className="text-[15px] font-semibold text-[#ff9a55]">Hechos a mano en Córdoba</p>
          <p className="mt-2 text-[62px] font-semibold leading-none tracking-[-0.045em]">
            Tu cajón.
            <br />
            Tu sonido.
          </p>
          <p className="mt-5 max-w-[320px] text-[17px] leading-[1.35] text-[#a1a1a6]">
            Listos para tocar, o diseñados por ti de la madera a la última pincelada.
          </p>
          <span className="mt-6 inline-flex rounded-full bg-white px-6 py-2.5 text-[15px] text-[#1d1d1f]">
            Diseña el tuyo
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/proyectos/caja/hero.png" alt="" className="h-[430px] w-[370px] object-contain" />
      </div>
    </div>
  );
}

const tiendaProductos = [
  ["Cajón Clásico", "129,99 €", "clasico.png"],
  ["Cajón Estudio", "189,50 €", "estudio.jpg"],
  ["Cajón Marea", "239,00 €", "marea.jpg"],
  ["Cajón Ébano", "289,00 €", "ebano.jpg"],
];

export function TiendaMovilScreen() {
  return (
    <div className="h-full bg-white px-5 pt-16 font-sans text-[#1d1d1f]">
      <p className="text-[42px] font-semibold tracking-[-0.04em]">La tienda.</p>
      <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5">
        {tiendaProductos.map(([nombre, precio, foto]) => (
          <div key={nombre}>
            <div className="flex aspect-square items-center justify-center rounded-[18px] bg-[#f5f5f7] p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/proyectos/caja/${foto}`} alt="" className="h-full w-full object-contain mix-blend-multiply" />
            </div>
            <p className="mt-2.5 text-[17px] font-semibold">{nombre}</p>
            <p className="text-[15px] text-[#6e6e73]">{precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const invoices = [
  ["F-0412", "Cliente 1", "1.240,00"],
  ["F-0413", "Cliente 2", "312,50"],
  ["F-0414", "Cliente 3", "2.085,90"],
  ["F-0415", "Cliente 4", "4.410,00"],
  ["F-0416", "Cliente 5", "198,30"],
];

export function ErpScreen() {
  return (
    <div className="flex h-full bg-white font-sans text-[#1d1d1f]">
      <div className="w-[170px] bg-[#f5f5f7] p-4 text-[13px]">
        <p className="mb-3 text-[14px] font-semibold">ERP</p>
        {["Clientes", "Facturas", "Albaranes", "Almacén", "Informes"].map((s, i) => (
          <p
            key={s}
            className={`rounded-md px-2.5 py-1.5 ${i === 1 ? "bg-[#0071e3] text-white" : "text-[#3a3a3c]"}`}
          >
            {s}
          </p>
        ))}
      </div>
      <div className="flex-1 p-5">
        <p className="text-[20px] font-semibold">Facturas</p>
        <div className="mt-3 overflow-hidden rounded-lg border border-[#e5e5ea] text-[13px]">
          <div className="grid grid-cols-[1fr_1.6fr_1fr] bg-[#f5f5f7] px-3 py-2 font-medium text-[#6e6e73]">
            <span>Nº</span>
            <span>Cliente</span>
            <span className="text-right">Importe</span>
          </div>
          {invoices.map(([n, c, a]) => (
            <div key={n} className="grid grid-cols-[1fr_1.6fr_1fr] border-t border-[#e5e5ea] px-3 py-2.5">
              <span className="tabular-nums text-[#6e6e73]">{n}</span>
              <span>{c}</span>
              <span className="text-right tabular-nums">{a} €</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Screen({ children, width = 960, height = 600 }: { children: ReactNode; width?: number; height?: number }) {
  return (
    <div className="overflow-hidden rounded-[14px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] ring-1 ring-black/5">
      <Fit width={width} height={height}>
        {children}
      </Fit>
    </div>
  );
}

const hiloLibres = new Set([13, 14, 15, 22, 28, 29]);
const hiloOcupados = new Set([21, 25]);

export function HiloRojoScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-[#262626] font-sans text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/proyectos/hilo-rojo/portada.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-black/65" />
      <div className="relative flex h-[44px] items-center justify-between px-8 text-[12px]">
        <span className={`${serif.className} text-[17px]`}>
          El hilo <span className="text-[#ff5a43]">rojo</span>
        </span>
        <span className="flex items-center gap-5 text-white/85">
          <span>Trabajos</span>
          <span>Cómo trabajamos</span>
          <span>Fechas</span>
          <span>Nosotros</span>
          <span className="rounded-full bg-white px-3.5 py-1.5 text-[#1d1d1f]">Pedir tarifas</span>
        </span>
      </div>
      <div className="absolute inset-x-8 bottom-9 flex items-end justify-between">
        <p className={`${serif.className} text-[76px] leading-none tracking-[-0.02em]`}>
          El hilo <span className="text-[#ff5a43]">rojo</span>
        </p>
        <p className="mb-2 max-w-[250px] text-[14px] leading-[1.35]">
          Fotografía y vídeo documental de bodas en Córdoba y Badajoz. Luz, acción, emoción, mucho amor y un toque canalla.
        </p>
      </div>
      <svg viewBox="0 0 960 600" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        <path
          d="M222 588 C250 592 290 585 318 589 C360 595 380 560 400 600"
          stroke="#e0442f"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function HiloRojoMovilScreen() {
  return (
    <div className="relative h-full bg-white pt-14 font-sans text-[#232323]">
      <div className="flex items-center justify-between px-5 text-[14px]">
        <span className={`${serif.className} text-[19px]`}>
          El hilo <span className="text-[#c93623]">rojo</span>
        </span>
        <span>Menú</span>
      </div>
      <div className="px-5 pt-10">
        <p className={`${serif.className} text-[38px] leading-[1.05]`}>Fechas disponibles</p>
        <p className="mt-3 text-[15px] leading-[1.4] text-[#6b6b70]">
          Elige un día libre y os enviamos nuestras tarifas. Los días en rojo ya están ocupados.
        </p>
        <p className="mt-7 text-[17px] font-semibold">Noviembre de 2026</p>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[14px]">
          {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
            <span key={d} className="py-1 text-[12px] text-[#6b6b70]">{d}</span>
          ))}
          {Array.from({ length: 6 }, (_, i) => <span key={`h${i}`} />)}
          {Array.from({ length: 30 }, (_, i) => {
            const dia = i + 1;
            const libre = hiloLibres.has(dia);
            const ocupado = hiloOcupados.has(dia);
            return (
              <span
                key={dia}
                className={`flex aspect-square items-center justify-center rounded-full ${
                  libre ? "bg-[#232323] text-white" : ocupado ? "bg-[#c93623] text-white line-through" : dia < 10 ? "text-[#c7c7cc]" : ""
                }`}
              >
                {dia}
              </span>
            );
          })}
        </div>
        <div className="mt-4 flex gap-5 text-[13px] text-[#6b6b70]">
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-[#232323]" />Libre</span>
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-[#c93623]" />Ocupado</span>
        </div>
      </div>
      <svg viewBox="0 0 390 844" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        <path d="M372 0 C366 120 380 210 370 330 C362 430 378 520 368 640 C362 720 376 790 370 844" stroke="#e0442f" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
