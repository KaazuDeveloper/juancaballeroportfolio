import { CHAT, CODE, CODE_FILES, DEPLOY_STEPS, TESTS } from "@/lib/demo";

const SANS = '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, system-ui, sans-serif';
const MONO = 'ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace';

export const CODE_CHARS = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0), 0);
export const PRETYPED_CHARS = CODE.slice(0, 4).reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0), 0);

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

/* 1280×800 code editor; `chars` = how many characters of CODE are typed so far. */
export function drawCode(ctx: CanvasRenderingContext2D, chars: number) {
  const W = 1280;
  const H = 800;
  ctx.fillStyle = "#1e1e1e";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#2d2d2d";
  ctx.fillRect(0, 0, W, 48);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(26 + i * 26, 24, 8, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
  ctx.font = `500 17px ${SANS}`;
  ctx.fillStyle = "#9d9d9d";
  ctx.textAlign = "center";
  ctx.fillText("PedidosController.cs — App.API", W / 2, 30);
  ctx.textAlign = "left";

  ctx.fillStyle = "#252526";
  ctx.fillRect(0, 48, 210, H - 48);
  ctx.font = `16px ${SANS}`;
  CODE_FILES.forEach((f, i) => {
    const y = 76 + i * 34;
    if (f.active) {
      ctx.fillStyle = "#37373d";
      ctx.fillRect(0, y - 22, 210, 32);
    }
    ctx.fillStyle = f.active ? "#ffffff" : "#9d9d9d";
    ctx.fillText(f.name, 16 + f.depth * 14, y);
  });

  ctx.font = `21px ${MONO}`;
  const charW = ctx.measureText("M").width;
  const lineH = 44;
  let remaining = chars;
  let caret: [number, number] | null = null;
  CODE.forEach((line, i) => {
    const y = 96 + i * lineH;
    ctx.fillStyle = "#6e7681";
    ctx.textAlign = "right";
    ctx.fillText(String(i + 1), 262, y);
    ctx.textAlign = "left";
    let col = 0;
    for (const [text, color] of line) {
      if (remaining <= 0) break;
      const shown = text.slice(0, remaining);
      ctx.fillStyle = color;
      ctx.fillText(shown, 290 + col * charW, y);
      col += shown.length;
      remaining -= shown.length;
      caret = [290 + col * charW, y];
    }
    if (line.length === 0 && remaining > 0) caret = [290, y];
  });
  if (caret && chars < CODE_CHARS) {
    ctx.fillStyle = "#aeafad";
    ctx.fillRect(caret[0] + 1, caret[1] - 19, 3, 25);
  }

  // Status bar: "typing" while writing, a green "build succeeded" once the code is complete.
  const done = chars >= CODE_CHARS;
  ctx.fillStyle = done ? "#16825d" : "#007acc";
  ctx.fillRect(0, H - 38, W, 38);
  ctx.font = `500 17px ${SANS}`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(done ? "✓  Compilación correcta · 0 errores" : "●  Escribiendo…", 18, H - 13);
  ctx.textAlign = "right";
  ctx.fillText("C# · .NET · MySQL", W - 18, H - 13);
  ctx.textAlign = "left";
}

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > max && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function check(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - r * 0.42, y + r * 0.02);
  ctx.lineTo(x - r * 0.1, y + r * 0.34);
  ctx.lineTo(x + r * 0.46, y - r * 0.3);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = r * 0.22;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

/* 780×1688 iPhone messages screen; `count` = how many CHAT messages are visible. */
export function drawChat(ctx: CanvasRenderingContext2D, count: number) {
  const W = 780;
  const H = 1688;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  ctx.font = `600 32px ${SANS}`;
  ctx.fillStyle = "#1d1d1f";
  ctx.fillText("9:41", 70, 74);
  rr(ctx, W / 2 - 125, 28, 250, 74, 37, "#000000");

  // Contact header
  ctx.fillStyle = "#f6f6f8";
  ctx.fillRect(0, 120, W, 210);
  const grad = ctx.createLinearGradient(0, 140, 0, 250);
  grad.addColorStop(0, "#a7abb5");
  grad.addColorStop(1, "#858a95");
  ctx.beginPath();
  ctx.arc(W / 2, 200, 56, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.font = `600 40px ${SANS}`;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("CL", W / 2, 214);
  ctx.font = `500 26px ${SANS}`;
  ctx.fillStyle = "#1d1d1f";
  ctx.fillText("Cliente", W / 2, 300);
  ctx.textAlign = "left";
  ctx.fillStyle = "#e5e5ea";
  ctx.fillRect(0, 329, W, 2);

  // Bubbles
  ctx.font = `31px ${SANS}`;
  const lineH = 40;
  const maxW = 520;
  let y = 372;
  CHAT.slice(0, count).forEach((m) => {
    const lines = wrap(ctx, m.text, maxW);
    const w = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 48;
    const h = lines.length * lineH + 30;
    const mine = m.from === "me";
    const x = mine ? W - 36 - w : 36;
    rr(ctx, x, y, w, h, 34, mine ? "#0a84ff" : "#e9e9eb");
    ctx.fillStyle = mine ? "#ffffff" : "#1d1d1f";
    lines.forEach((l, i) => ctx.fillText(l, x + 24, y + 46 + i * lineH));
    y += h + 18;
  });

  // Input bar
  rr(ctx, 36, H - 150, W - 72, 76, 38, "#ffffff");
  ctx.strokeStyle = "#d1d1d6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(36, H - 150, W - 72, 76, 38);
  ctx.stroke();
  ctx.font = `30px ${SANS}`;
  ctx.fillStyle = "#b0b0b5";
  ctx.fillText("Mensaje", 70, H - 101);
}

/* 1280×800 automated test run; `done` = how many TESTS have passed. */
export function drawTests(ctx: CanvasRenderingContext2D, done: number) {
  const W = 1280;
  const H = 800;
  ctx.fillStyle = "#f5f5f7";
  ctx.fillRect(0, 0, W, H);
  ctx.font = `600 34px ${SANS}`;
  ctx.fillStyle = "#1d1d1f";
  ctx.fillText("Pruebas automatizadas", 64, 92);
  ctx.font = `20px ${SANS}`;
  ctx.fillStyle = "#6e6e73";
  ctx.fillText("Selenium · .NET · entorno de pruebas", 64, 128);

  rr(ctx, 48, 160, W - 96, TESTS.length * 62 + 20, 20, "#ffffff");
  TESTS.forEach((name, i) => {
    const y = 200 + i * 62;
    if (i < done) check(ctx, 96, y, 15, "#34c759");
    else {
      ctx.beginPath();
      ctx.arc(96, y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = i === done ? "#0071e3" : "#d1d1d6";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.font = `22px ${SANS}`;
    ctx.fillStyle = i <= done ? "#1d1d1f" : "#aeaeb2";
    ctx.fillText(name, 130, y + 8);
    if (i < done) {
      ctx.textAlign = "right";
      ctx.fillStyle = "#86868b";
      ctx.fillText(`${(0.4 + ((i * 37) % 9) / 10).toFixed(1)} s`, W - 90, y + 8);
      ctx.textAlign = "left";
    }
    if (i > 0) {
      ctx.fillStyle = "#ececf0";
      ctx.fillRect(130, y - 31, W - 230, 2);
    }
  });

  const all = done >= TESTS.length;
  rr(ctx, 48, H - 104, W - 96, 64, 16, all ? "#34c759" : "#e8e8ed");
  ctx.font = `600 24px ${SANS}`;
  ctx.fillStyle = all ? "#ffffff" : "#1d1d1f";
  ctx.fillText(all ? `✓  ${TESTS.length} de ${TESTS.length} pruebas superadas` : `Ejecutando… ${Math.min(done, TESTS.length)} de ${TESTS.length}`, 80, H - 63);
}

/* 1280×800 release screen; `pct` 0–1 is the deployment progress. */
export function drawDeploy(ctx: CanvasRenderingContext2D, pct: number) {
  const W = 1280;
  const H = 800;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  const live = pct >= 1;
  ctx.textAlign = "center";

  if (live) {
    check(ctx, W / 2, 250, 70, "#34c759");
    ctx.font = `600 52px ${SANS}`;
    ctx.fillStyle = "#1d1d1f";
    ctx.fillText("Publicado", W / 2, 400);
    ctx.font = `26px ${SANS}`;
    ctx.fillStyle = "#6e6e73";
    ctx.fillText("Versión 1.0 · en producción", W / 2, 448);
  } else {
    ctx.font = `600 40px ${SANS}`;
    ctx.fillStyle = "#1d1d1f";
    ctx.fillText("Publicando la versión 1.0", W / 2, 200);
    rr(ctx, 240, 250, W - 480, 16, 8, "#e8e8ed");
    rr(ctx, 240, 250, Math.max(16, (W - 480) * pct), 16, 8, "#0071e3");
    ctx.font = `22px ${SANS}`;
    ctx.fillStyle = "#6e6e73";
    ctx.fillText(`${Math.round(pct * 100)} %`, W / 2, 310);
  }
  ctx.textAlign = "left";

  DEPLOY_STEPS.forEach((step, i) => {
    const y = 540 + i * 52;
    const ok = pct >= (i + 1) / DEPLOY_STEPS.length;
    const x = W / 2 - 170;
    if (ok) check(ctx, x, y, 13, "#34c759");
    else {
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = "#d1d1d6";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.font = `22px ${SANS}`;
    ctx.fillStyle = ok ? "#1d1d1f" : "#aeaeb2";
    ctx.fillText(step, x + 30, y + 8);
  });
}
