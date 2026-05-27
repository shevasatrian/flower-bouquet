"use client";

import { useEffect, useRef, RefObject } from "react";
import { BouquetState } from "@/types/bouquet";
import { renderBouquet } from "./CanvasRenderer";

interface Props {
  state: BouquetState;
  canvasRef?: RefObject<HTMLCanvasElement>;
}

export default function BouquetCanvasInner({ state, canvasRef: externalRef }: Props) {
  const internalRef = useRef<HTMLCanvasElement>(null);
  const ref = (externalRef ?? internalRef) as RefObject<HTMLCanvasElement>;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderBouquet(ctx, state);
    return () => {};
  }, [state, ref]);

  return (
    <canvas
      ref={ref}
      width={600}
      height={600}
      style={{ width: "100%", height: "auto", display: "block" }}
      className="rounded-xl"
    />
  );
}
