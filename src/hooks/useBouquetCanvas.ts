"use client";

import { useRef, type RefObject } from "react";

export function useBouquetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null) as RefObject<HTMLCanvasElement>;
  return canvasRef;
}
