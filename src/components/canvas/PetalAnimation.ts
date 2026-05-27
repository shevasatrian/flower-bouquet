import { BouquetState } from "@/types/bouquet";
import { FLOWERS } from "@/lib/flowers";

export interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  alpha: number;
  size: number;
  wobble: number;
  wobbleSpeed: number;
}

export function initPetals(state: BouquetState, count = 22): Petal[] {
  const colors: string[] = [];
  for (const flower of state.flowers) {
    const def = FLOWERS.find((f) => f.id === flower.id);
    if (def) {
      for (let i = 0; i < flower.quantity; i++) {
        colors.push(def.primaryColor);
        colors.push(def.secondaryColor);
      }
    }
  }
  if (colors.length === 0) {
    colors.push("#ff8fab", "#ffc2d4", "#e8496a", "#fce7f3");
  }

  return Array.from({ length: count }, (_, i) => ({
    x: (i * 73 + 30) % 600,
    y: (i * 47 - 20) % 600,
    vx: (((i * 31) % 10) - 5) * 0.4,
    vy: 1.2 + ((i * 17) % 10) * 0.3,
    rotation: (i * 53) % 360,
    rotationSpeed: (((i * 37) % 20) - 10) * 0.5,
    color: colors[i % colors.length],
    alpha: 0.7 + ((i * 11) % 30) * 0.01,
    size: 6 + ((i * 19) % 10),
    wobble: 0,
    wobbleSpeed: 0.05 + ((i * 7) % 10) * 0.01,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function advancePetals(petals: Petal[], _frame?: number) {
  for (const p of petals) {
    p.wobble += p.wobbleSpeed;
    p.x += p.vx + Math.sin(p.wobble) * 0.8;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.alpha -= 0.003;

    if (p.y > 620 || p.alpha <= 0) {
      p.y = -10;
      p.x = Math.random() * 600;
      p.alpha = 0.6 + Math.random() * 0.3;
    }
    if (p.x < -20) p.x = 620;
    if (p.x > 620) p.x = -20;
  }
}

export function drawPetals(
  ctx: CanvasRenderingContext2D,
  petals: Petal[]
) {
  ctx.save();
  for (const p of petals) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);

    // Draw petal as an ellipse
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    ctx.restore();
  }
  ctx.restore();
}
