"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";

/* Renders children at a fixed design size and scales them to the container width. */
function Fit({ width, height, children }: { width: number; height: number; children: ReactNode }) {
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

export function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div className="rounded-t-[4.5%_7%] bg-[#0d0d0f] p-[1.8%] pb-[2.4%] shadow-[0_0_0_1px_#3a3a3c_inset]">
        <div className="overflow-hidden rounded-[0.6%] bg-white">
          <Fit width={960} height={600}>
            {children}
          </Fit>
        </div>
      </div>
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

const products = [
  { name: "Café con leche", price: "1,40", color: "#a2845e" },
  { name: "Caña", price: "1,80", color: "#f5b014" },
  { name: "Tinto de verano", price: "2,50", color: "#c0392b" },
  { name: "Agua", price: "1,20", color: "#5ac8fa" },
  { name: "Tostada", price: "2,50", color: "#e08e45" },
  { name: "Salmorejo", price: "4,50", color: "#ff6b4a" },
  { name: "Flamenquín", price: "8,00", color: "#d4a017" },
  { name: "Berenjenas", price: "6,50", color: "#8e44ad" },
  { name: "Refresco", price: "2,20", color: "#ff375f" },
  { name: "Croquetas", price: "7,00", color: "#c08a3e" },
  { name: "Ensalada", price: "6,00", color: "#34c759" },
  { name: "Tarta", price: "4,00", color: "#af52de" },
];

const ticket = [
  { qty: 2, name: "Caña", total: "3,60" },
  { qty: 1, name: "Salmorejo", total: "4,50" },
  { qty: 1, name: "Flamenquín", total: "8,00" },
];

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

const order = [
  { name: "Caña", note: "Bebidas", qty: 2, price: "1,80" },
  { name: "Salmorejo", note: "Raciones", qty: 1, price: "4,50" },
  { name: "Flamenquín", note: "Raciones", qty: 1, price: "8,00" },
  { name: "Café con leche", note: "Cafés", qty: 0, price: "1,40" },
  { name: "Tarta de queso", note: "Postres", qty: 0, price: "4,00" },
];

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
