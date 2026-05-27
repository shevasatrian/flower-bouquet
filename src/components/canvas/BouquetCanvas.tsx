"use client";

import dynamic from "next/dynamic";
import { BouquetState } from "@/types/bouquet";

const BouquetCanvasInner = dynamic(() => import("./BouquetCanvasInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square rounded-xl bg-petal flex items-center justify-center">
      <div className="text-rose-400 text-sm font-dancing text-xl animate-pulse">
        Loading your bouquet...
      </div>
    </div>
  ),
});

interface Props {
  state: BouquetState;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

export default function BouquetCanvas({ state, canvasRef }: Props) {
  return <BouquetCanvasInner state={state} canvasRef={canvasRef} />;
}
