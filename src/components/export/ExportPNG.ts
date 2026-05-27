export async function exportCanvasPNG(
  canvas: HTMLCanvasElement,
  filename = "my-bouquet.png"
) {
  const offscreen = document.createElement("canvas");
  offscreen.width = canvas.width * 2;
  offscreen.height = canvas.height * 2;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return;
  ctx.scale(2, 2);
  ctx.drawImage(canvas, 0, 0);

  const dataURL = offscreen.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataURL;
  link.click();
}
