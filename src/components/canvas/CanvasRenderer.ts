import { BouquetState } from "@/types/bouquet";
import { THEMES } from "@/lib/themes";
import { FLOWERS } from "@/lib/flowers";

const imageCache = new Map<string, HTMLImageElement>();

function loadImage(src: string): Promise<HTMLImageElement | null> {
  if (imageCache.has(src)) return Promise.resolve(imageCache.get(src)!);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

const CX = 300;
const NECK_Y = 372; // the waist where stems gather / ribbon ties

interface SizeCfg {
  clusterRX: number;
  clusterRY: number;
  flowerSize: number;
  vesselScale: number;
}

const SIZE_CONFIG: Record<BouquetState["size"], SizeCfg> = {
  small: { clusterRX: 78, clusterRY: 66, flowerSize: 60, vesselScale: 0.84 },
  medium: { clusterRX: 98, clusterRY: 84, flowerSize: 68, vesselScale: 0.98 },
  large: { clusterRX: 118, clusterRY: 100, flowerSize: 78, vesselScale: 1.12 },
};

interface Layout {
  cfg: SizeCfg;
  clusterCenterY: number;
  totalStems: number;
}

function buildLayout(state: BouquetState): Layout {
  const cfg = SIZE_CONFIG[state.size];
  const totalStems = state.flowers.reduce((s, f) => s + f.quantity, 0);
  const clusterCenterY = NECK_Y - cfg.clusterRY * 0.82 - 22;
  return { cfg, clusterCenterY, totalStems };
}

function expandFlowers(flowers: BouquetState["flowers"]): string[] {
  const out: string[] = [];
  for (const f of flowers) for (let i = 0; i < f.quantity; i++) out.push(f.id);
  return out;
}

function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// ---------------------------------------------------------------------------
// Background
// ---------------------------------------------------------------------------

function drawBackground(
  ctx: CanvasRenderingContext2D,
  themeId: string,
  w: number,
  h: number
) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const [c1, c2] = theme.gradientColors;
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  const isNight = themeId === "night-sky";
  ctx.save();
  for (let i = 0; i < 16; i++) {
    const x = (i * 113 + 40) % w;
    const y = (i * 79 + 60) % h;
    const r = isNight ? 1.4 + (i % 3) : 18 + ((i * 17) % 45);
    const alpha = isNight ? 0.45 + (i % 3) * 0.18 : 0.05 + (i % 3) * 0.02;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }
  ctx.restore();

  // Warm glow behind the bouquet adds atmospheric depth (light themes)
  if (!isNight) {
    const glow = ctx.createRadialGradient(CX, NECK_Y - 70, 20, CX, NECK_Y - 70, 280);
    glow.addColorStop(0, "rgba(255,255,250,0.40)");
    glow.addColorStop(1, "rgba(255,255,250,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }

  // Soft ground shadow under the bouquet
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(CX, NECK_Y + 132, 72, 17, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(60,20,40,0.12)";
  ctx.filter = "blur(3px)";
  ctx.fill();
  ctx.restore();

  // Vignette focuses the eye and deepens the corners
  const vg = ctx.createRadialGradient(w / 2, h / 2, h * 0.32, w / 2, h / 2, h * 0.74);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, isNight ? "rgba(0,0,0,0.28)" : "rgba(40,15,30,0.14)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
}

// ---------------------------------------------------------------------------
// Wrapping (kraft-style flared paper)
// ---------------------------------------------------------------------------

function drawWrapBase(
  ctx: CanvasRenderingContext2D,
  color: string,
  layout: Layout
) {
  const { cfg } = layout;
  const topHalf = cfg.clusterRX * 0.5;
  const midHalf = topHalf * 0.62;
  const botHalf = topHalf * 1.02;
  const topY = NECK_Y - 2;
  const botY = NECK_Y + 122;

  const g = ctx.createLinearGradient(CX - topHalf, 0, CX + topHalf, 0);
  g.addColorStop(0, adjustColor(color, -34));
  g.addColorStop(0.5, adjustColor(color, 30));
  g.addColorStop(1, adjustColor(color, -34));

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(CX - topHalf, topY);
  ctx.bezierCurveTo(CX - midHalf, topY + 54, CX - botHalf, botY - 42, CX - botHalf, botY);
  ctx.quadraticCurveTo(CX, botY + 12, CX + botHalf, botY);
  ctx.bezierCurveTo(CX + botHalf, botY - 42, CX + midHalf, topY + 54, CX + topHalf, topY);
  ctx.closePath();
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = adjustColor(color, -46);
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // satin sheen
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(CX - topHalf * 0.35, topY + 10);
  ctx.bezierCurveTo(CX - midHalf * 0.5, topY + 54, CX - botHalf * 0.5, botY - 34, CX - botHalf * 0.42, botY - 8);
  ctx.stroke();

  // creases
  ctx.strokeStyle = "rgba(0,0,0,0.10)";
  ctx.lineWidth = 1;
  for (const f of [-0.5, 0.05, 0.55]) {
    ctx.beginPath();
    ctx.moveTo(CX + topHalf * f, topY + 4);
    ctx.lineTo(CX + botHalf * f, botY - 6);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWrapTips(
  ctx: CanvasRenderingContext2D,
  color: string,
  layout: Layout,
  scale: number
) {
  const { cfg, clusterCenterY } = layout;
  const n = 6;
  const baseY = NECK_Y + 4;
  const reachX = (cfg.clusterRX + 18) * scale;
  const reachY = (cfg.clusterRY + 16) * scale;
  // Broad, overlapping paper sheets form a continuous backdrop (not thin spikes).
  const bw = cfg.clusterRX * 0.62;
  const light = adjustColor(color, 30);
  const mid = adjustColor(color, 4);
  const dark = adjustColor(color, -34);

  ctx.save();
  for (let k = 0; k < n; k++) {
    const t = k / (n - 1);
    const ang = Math.PI - t * Math.PI; // sweep across the top
    const tipX = CX + Math.cos(ang) * reachX;
    const tipY = clusterCenterY - Math.sin(ang) * reachY;
    const bx = CX + (t - 0.5) * cfg.clusterRX * 0.5;

    const g = ctx.createLinearGradient(bx, baseY, tipX, tipY);
    g.addColorStop(0, dark);
    g.addColorStop(0.6, mid);
    g.addColorStop(1, light);
    ctx.fillStyle = g;
    ctx.strokeStyle = adjustColor(color, -42);
    ctx.lineWidth = 0.8;

    // A broad paper petal: wide curved base near the neck, tapering to a soft tip.
    const mx = (bx + tipX) / 2;
    const my = (baseY + tipY) / 2;
    const perpX = -(tipY - baseY);
    const perpY = tipX - bx;
    const plen = Math.hypot(perpX, perpY) || 1;
    const nx = (perpX / plen) * bw * 0.5;
    const ny = (perpY / plen) * bw * 0.5;

    ctx.beginPath();
    ctx.moveTo(bx - nx, baseY - ny);
    ctx.quadraticCurveTo(mx - nx * 1.1, my - ny * 1.1, tipX, tipY);
    ctx.quadraticCurveTo(mx + nx * 1.1, my + ny * 1.1, bx + nx, baseY + ny);
    ctx.quadraticCurveTo(CX, baseY + 10, bx - nx, baseY - ny);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // center crease
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, baseY);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();
  }
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Container vessel (vase / basket / box)
// ---------------------------------------------------------------------------

async function drawContainer(
  ctx: CanvasRenderingContext2D,
  type: string,
  layout: Layout
) {
  if (type === "hand-tied") return;
  const { cfg } = layout;
  const vw = 122 * cfg.vesselScale;
  const vh = 122 * cfg.vesselScale;
  const x = CX - vw / 2;
  const y = NECK_Y - 34;
  const img = await loadImage(`/containers/${type}.svg`);
  if (img) ctx.drawImage(img, x, y, vw, vh);
}

// ---------------------------------------------------------------------------
// Greenery & filler
// ---------------------------------------------------------------------------

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  len: number,
  w: number,
  rot: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  const g = ctx.createLinearGradient(0, -len, 0, len);
  g.addColorStop(0, "#74bd60");
  g.addColorStop(1, "#2f6b27");
  ctx.fillStyle = g;
  ctx.strokeStyle = "#2a5e22";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -len);
  ctx.bezierCurveTo(w, -len * 0.4, w, len * 0.45, 0, len);
  ctx.bezierCurveTo(-w, len * 0.45, -w, -len * 0.4, 0, -len);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, -len * 0.78);
  ctx.lineTo(0, len * 0.78);
  ctx.stroke();
  ctx.restore();
}

function drawGreenery(ctx: CanvasRenderingContext2D, layout: Layout) {
  const { cfg, clusterCenterY, totalStems } = layout;
  if (totalStems === 0) return;
  const n = Math.min(11, 6 + Math.floor(totalStems / 3));
  ctx.save();
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const ang = Math.PI * 0.9 + t * Math.PI * 1.2; // arc around top + sides
    const rx = cfg.clusterRX * (0.96 + rand(i * 2.1) * 0.14);
    const ry = cfg.clusterRY * (0.92 + rand(i * 3.7) * 0.14);
    const lx = CX + Math.cos(ang) * rx;
    const ly = clusterCenterY + Math.sin(ang) * ry * 0.86;
    const dx = lx - CX;
    const dy = ly - clusterCenterY;
    const rot = Math.atan2(dy, dx) + Math.PI / 2 + (rand(i) - 0.5) * 0.4;
    const len = 22 + rand(i * 3.1) * 12;
    const w = 8 + rand(i * 5.7) * 4;
    drawLeaf(ctx, lx, ly, len, w, rot);
  }
  ctx.restore();
}

function drawFiller(
  ctx: CanvasRenderingContext2D,
  layout: Layout,
  seed: number,
  clusters: number
) {
  const { cfg, clusterCenterY, totalStems } = layout;
  if (totalStems === 0) return;
  ctx.save();
  for (let i = 0; i < clusters; i++) {
    const a = rand(seed + i * 1.7) * Math.PI * 2;
    const rr = 0.5 + rand(seed + i * 2.3) * 0.55;
    const fx = CX + Math.cos(a) * cfg.clusterRX * rr;
    const fy = clusterCenterY + Math.sin(a) * cfg.clusterRY * rr * 0.9;
    for (let d = 0; d < 3; d++) {
      const ox = (rand(seed + i * 3.1 + d) - 0.5) * 9;
      const oy = (rand(seed + i * 5.3 + d) - 0.5) * 9;
      ctx.beginPath();
      ctx.arc(fx + ox, fy + oy, 1.7, 0, Math.PI * 2);
      ctx.fillStyle = "#fffdf7";
      ctx.fill();
      ctx.strokeStyle = "rgba(180,170,150,0.4)";
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }
  }
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Flowers (phyllotaxis-packed cluster)
// ---------------------------------------------------------------------------

async function drawFlowers(
  ctx: CanvasRenderingContext2D,
  flowers: BouquetState["flowers"],
  layout: Layout
) {
  const ids = expandFlowers(flowers);
  const n = ids.length;
  if (n === 0) return;
  const { cfg, clusterCenterY } = layout;

  const uniqueIds = Array.from(new Set(ids));
  const loaded = await Promise.all(
    uniqueIds.map(async (id) => {
      const def = FLOWERS.find((f) => f.id === id);
      const img = def ? await loadImage(def.svgPath) : null;
      return [id, img] as const;
    })
  );
  const imgMap = new Map(loaded);

  const golden = Math.PI * (3 - Math.sqrt(5));
  const density = n <= 6 ? 1.14 : n <= 12 ? 1.02 : 0.92;
  const fs = cfg.flowerSize * density;

  const placed: {
    x: number;
    y: number;
    id: string;
    rot: number;
    scale: number;
  }[] = [];

  for (let i = 0; i < n; i++) {
    const frac = n === 1 ? 0 : i / (n - 1);
    const r = Math.sqrt(frac);
    const theta = i * golden;
    const jx = (rand(i * 1.3) - 0.5) * fs * 0.16;
    const jy = (rand(i * 2.7) - 0.5) * fs * 0.16;
    const px = CX + Math.cos(theta) * r * cfg.clusterRX + jx;
    const py = clusterCenterY + Math.sin(theta) * r * cfg.clusterRY * 0.94 + jy;
    const rot = (rand(i * 4.1) - 0.5) * 0.5;
    const scale = 0.9 + (1 - r) * 0.2;
    placed.push({ x: px, y: py, id: ids[i], rot, scale });
  }

  // Back-to-front: lower on screen (larger y) drawn last so it sits in front.
  placed.sort((a, b) => a.y - b.y);
  const total = placed.length;

  // Render the blooms onto an offscreen layer so the dome lighting can be
  // masked to the flower pixels (source-atop) — no "glass bubble" rim artifact.
  const off = document.createElement("canvas");
  off.width = ctx.canvas.width;
  off.height = ctx.canvas.height;
  const octx = off.getContext("2d");
  if (!octx) return;

  placed.forEach((p, idx) => {
    const img = imgMap.get(p.id);
    if (!img) return;
    const depth = total <= 1 ? 1 : idx / (total - 1); // 0 = back, 1 = front
    const size = fs * p.scale;

    octx.save();
    octx.translate(p.x, p.y);
    octx.rotate(p.rot);

    // Directional drop shadow (down-right); front blooms cast more → they lift.
    octx.shadowColor = `rgba(48,16,32,${0.16 + depth * 0.24})`;
    octx.shadowBlur = 6 + depth * 7;
    octx.shadowOffsetX = 2 + depth * 2;
    octx.shadowOffsetY = 4 + depth * 5;

    // Depth-of-field + aerial perspective: back blooms a touch softer, fronts
    // bright and vivid. Floor kept high so colours stay fresh, not muddy.
    const bright = 0.94 + depth * 0.28;
    const sat = 1.02 + depth * 0.16;
    const blur = depth < 0.2 ? 0.5 : 0;
    octx.filter = `brightness(${bright.toFixed(3)}) saturate(${sat.toFixed(3)})${
      blur ? ` blur(${blur}px)` : ""
    }`;
    octx.drawImage(img, -size / 2, -size / 2, size, size);

    // Specular sheen on the upper-left (light source) of each bloom.
    octx.filter = "none";
    octx.shadowColor = "transparent";
    const hx = -size * 0.17;
    const hy = -size * 0.21;
    const hg = octx.createRadialGradient(hx, hy, size * 0.03, hx, hy, size * 0.48);
    hg.addColorStop(0, `rgba(255,255,250,${0.34 + depth * 0.36})`);
    hg.addColorStop(0.5, `rgba(255,255,250,${0.11 + depth * 0.13})`);
    hg.addColorStop(1, "rgba(255,255,250,0)");
    octx.fillStyle = hg;
    octx.beginPath();
    octx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
    octx.fill();
    octx.restore();
  });

  // Spherical dome lighting, masked to the bloom pixels via source-atop.
  const rx = cfg.clusterRX * 1.06;
  const ry = cfg.clusterRY * 1.06;
  octx.save();
  octx.globalCompositeOperation = "source-atop";

  const shade = octx.createRadialGradient(
    CX - rx * 0.26,
    clusterCenterY - ry * 0.32,
    rx * 0.12,
    CX,
    clusterCenterY + ry * 0.14,
    rx * 1.05
  );
  shade.addColorStop(0, "rgba(45,18,30,0)");
  shade.addColorStop(0.72, "rgba(45,18,30,0)");
  shade.addColorStop(1, "rgba(45,18,30,0.3)");
  octx.fillStyle = shade;
  octx.fillRect(0, 0, off.width, off.height);

  const light = octx.createRadialGradient(
    CX - rx * 0.34,
    clusterCenterY - ry * 0.46,
    8,
    CX - rx * 0.34,
    clusterCenterY - ry * 0.46,
    rx * 1.1
  );
  light.addColorStop(0, "rgba(255,255,242,0.58)");
  light.addColorStop(0.5, "rgba(255,255,242,0.18)");
  light.addColorStop(1, "rgba(255,255,242,0)");
  octx.fillStyle = light;
  octx.fillRect(0, 0, off.width, off.height);
  octx.restore();

  ctx.drawImage(off, 0, 0);
}

// ---------------------------------------------------------------------------
// Ribbon
// ---------------------------------------------------------------------------

function drawRibbon(
  ctx: CanvasRenderingContext2D,
  ribbonColor: string,
  type: string,
  layout: Layout
) {
  const ribbonY = type === "hand-tied" ? NECK_Y + 18 : NECK_Y - 8;
  const halfBand = layout.cfg.clusterRX * 0.36 + 12;

  ctx.save();
  ctx.fillStyle = ribbonColor;
  roundRect(ctx, CX - halfBand, ribbonY - 6, halfBand * 2, 13, 5);
  ctx.fill();
  ctx.strokeStyle = adjustColor(ribbonColor, -24);
  ctx.lineWidth = 1;
  ctx.stroke();
  // band sheen
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(CX - halfBand + 3, ribbonY - 3);
  ctx.lineTo(CX + halfBand - 3, ribbonY - 3);
  ctx.stroke();

  const bx = CX;
  const by = ribbonY;
  const lobe = 20;

  // tails
  ctx.fillStyle = adjustColor(ribbonColor, -8);
  ctx.beginPath();
  ctx.moveTo(bx - 4, by);
  ctx.quadraticCurveTo(bx - 12, by + 22, bx - 19, by + 32);
  ctx.lineTo(bx - 9, by + 32);
  ctx.quadraticCurveTo(bx - 4, by + 16, bx, by + 5);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(bx + 4, by);
  ctx.quadraticCurveTo(bx + 12, by + 22, bx + 19, by + 32);
  ctx.lineTo(bx + 9, by + 32);
  ctx.quadraticCurveTo(bx + 4, by + 16, bx, by + 5);
  ctx.fill();

  // bow lobes
  for (const dir of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.bezierCurveTo(
      bx + dir * lobe,
      by - lobe * 0.95,
      bx + dir * (lobe + 9),
      by - lobe * 0.2,
      bx + dir * (lobe - 4),
      by
    );
    ctx.bezierCurveTo(
      bx + dir * (lobe + 9),
      by + lobe * 0.2,
      bx + dir * lobe,
      by + lobe * 0.95,
      bx,
      by
    );
    ctx.fillStyle = ribbonColor;
    ctx.fill();
    ctx.strokeStyle = adjustColor(ribbonColor, -24);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(bx, by, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = adjustColor(ribbonColor, -16);
  ctx.fill();
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Message card & recipient name
// ---------------------------------------------------------------------------

function drawMessageCard(ctx: CanvasRenderingContext2D, message: string) {
  if (!message.trim()) return;
  const cardX = 424;
  const cardY = 452;
  const cardW = 150;
  const cardH = 92;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.22)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = "rgba(255,253,250,0.96)";
  roundRect(ctx, cardX, cardY, cardW, cardH, 10);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(232,73,106,0.3)";
  ctx.lineWidth = 1;
  roundRect(ctx, cardX, cardY, cardW, cardH, 10);
  ctx.stroke();

  ctx.fillStyle = "#e8496a";
  drawHeart(ctx, cardX + 15, cardY + 14, 7);

  ctx.fillStyle = "#5d2234";
  ctx.font = `italic 13px "Dancing Script", cursive`;
  wrapText(ctx, message, cardX + 12, cardY + 32, cardW - 22, 17);
  ctx.restore();
}

function drawRecipientName(
  ctx: CanvasRenderingContext2D,
  name: string,
  themeId: string
) {
  if (!name.trim()) return;
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = `600 24px "Playfair Display", serif`;
  ctx.fillStyle = theme.nameColor;
  if (themeId === "night-sky") {
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 6;
  }
  ctx.fillText(`For ${name}`, CX, 44);
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function adjustColor(hex: string, amount: number): string {
  if (!hex.startsWith("#") || hex.length < 7) return hex;
  const r = Math.max(0, Math.min(255, parseInt(hex.slice(1, 3), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.slice(3, 5), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.slice(5, 7), 16) + amount));
  return `rgb(${r},${g},${b})`;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number
) {
  ctx.beginPath();
  ctx.moveTo(cx, cy + size * 0.3);
  ctx.bezierCurveTo(cx, cy, cx - size, cy, cx - size, cy + size * 0.5);
  ctx.bezierCurveTo(cx - size, cy + size, cx, cy + size * 1.3, cx, cy + size * 1.5);
  ctx.bezierCurveTo(cx, cy + size * 1.3, cx + size, cy + size, cx + size, cy + size * 0.5);
  ctx.bezierCurveTo(cx + size, cy, cx, cy, cx, cy + size * 0.3);
  ctx.fill();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let lineCount = 0;
  const maxLines = 4;
  for (const word of words) {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth && line !== "") {
      if (lineCount < maxLines) ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
      line = word + " ";
      lineCount++;
    } else {
      line = testLine;
    }
  }
  if (lineCount < maxLines && line.trim())
    ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

export async function renderBouquet(
  ctx: CanvasRenderingContext2D,
  state: BouquetState
) {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  const layout = buildLayout(state);
  const isHandTied = state.container === "hand-tied";

  drawBackground(ctx, state.theme, width, height);

  if (isHandTied) {
    drawWrapBase(ctx, state.wrappingColor, layout);
    drawWrapTips(ctx, state.wrappingColor, layout, 1);
  } else {
    drawWrapTips(ctx, state.wrappingColor, layout, 0.5);
    await drawContainer(ctx, state.container, layout);
  }

  if (layout.totalStems > 0) {
    // Contact shadow where the blooms nestle into the wrap (ambient occlusion).
    ctx.save();
    ctx.filter = "blur(5px)";
    ctx.fillStyle = "rgba(38,14,26,0.32)";
    ctx.beginPath();
    ctx.ellipse(
      CX,
      layout.clusterCenterY + layout.cfg.clusterRY * 0.72,
      layout.cfg.clusterRX * 0.72,
      layout.cfg.clusterRY * 0.4,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();

    drawGreenery(ctx, layout);
    drawFiller(ctx, layout, 7, Math.max(6, layout.totalStems));
    await drawFlowers(ctx, state.flowers, layout);
    drawFiller(ctx, layout, 41, Math.ceil(layout.totalStems / 2));
  }

  drawRibbon(ctx, state.ribbonColor, state.container, layout);
  drawMessageCard(ctx, state.message);
  drawRecipientName(ctx, state.recipientName, state.theme);
}
