"use client";

import { useState, useCallback, type RefObject } from "react";
import { BouquetState } from "@/types/bouquet";

export function useExport(canvasRef: RefObject<HTMLCanvasElement>) {
  const [exportingPNG, setExportingPNG] = useState(false);
  const [exportingGIF, setExportingGIF] = useState(false);
  const [gifProgress, setGifProgress] = useState(0);

  const exportPNG = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setExportingPNG(true);
    try {
      const { exportCanvasPNG } = await import("@/components/export/ExportPNG");
      await exportCanvasPNG(canvas, "my-bouquet.png");
    } finally {
      setExportingPNG(false);
    }
  }, [canvasRef]);

  const exportGIF = useCallback(
    async (state: BouquetState) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      setExportingGIF(true);
      setGifProgress(0);
      try {
        const { exportAnimatedGIF } = await import(
          "@/components/export/ExportGIF"
        );
        await exportAnimatedGIF(canvas, state, (pct) => setGifProgress(pct));
      } finally {
        setExportingGIF(false);
        setGifProgress(0);
      }
    },
    [canvasRef]
  );

  return { exportPNG, exportGIF, exportingPNG, exportingGIF, gifProgress };
}
