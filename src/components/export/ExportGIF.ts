import { BouquetState } from "@/types/bouquet";
import { initPetals, advancePetals, drawPetals } from "@/components/canvas/PetalAnimation";

export async function exportAnimatedGIF(
  staticCanvas: HTMLCanvasElement,
  state: BouquetState,
  onProgress: (pct: number) => void
): Promise<void> {
  // Dynamically load gif.js to keep it out of the main bundle
  const GIF = (await import("gif.js")).default;

  const gif = new GIF({
    workers: 2,
    quality: 8,
    width: 600,
    height: 600,
    workerScript: "/gif.worker.js",
    repeat: 0,
    background: "#ffffff",
  });

  const TOTAL_FRAMES = 36;
  const FRAME_DELAY = 85;

  const petals = initPetals(state);

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const offscreen = document.createElement("canvas");
    offscreen.width = 600;
    offscreen.height = 600;
    const ctx = offscreen.getContext("2d")!;

    ctx.drawImage(staticCanvas, 0, 0);
    drawPetals(ctx, petals);
    advancePetals(petals, i);

    gif.addFrame(offscreen, { delay: FRAME_DELAY, copy: true });
    onProgress(Math.round((i / TOTAL_FRAMES) * 75));
  }

  return new Promise((resolve, reject) => {
    gif.on("progress", (p: number) => onProgress(75 + Math.round(p * 25)));
    gif.on("finished", (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "my-bouquet-animated.gif";
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      resolve();
    });
    gif.on("error", reject);
    gif.render();
  });
}
