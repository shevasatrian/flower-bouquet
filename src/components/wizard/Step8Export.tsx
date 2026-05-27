"use client";

import { useBouquet } from "@/context/BouquetContext";
import RomanticButton from "@/components/ui/RomanticButton";

interface Props {
  onExportPNG: () => void;
  onExportGIF: () => void;
  exportingPNG: boolean;
  exportingGIF: boolean;
  gifProgress: number;
}

export default function Step8Export({
  onExportPNG,
  onExportGIF,
  exportingPNG,
  exportingGIF,
  gifProgress,
}: Props) {
  const { state } = useBouquet();
  const flowerCount = state.flowers.reduce((s, f) => s + f.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="font-playfair text-2xl font-bold text-rose-800 mb-2">
          Your Bouquet Is Ready!
        </h2>
        {state.recipientName && (
          <p className="text-rose-500 font-dancing text-xl">
            A beautiful gift for {state.recipientName}
          </p>
        )}
        <p className="text-rose-400 text-sm mt-2">
          {flowerCount} stem{flowerCount !== 1 ? "s" : ""} arranged with love
        </p>
      </div>

      <div className="space-y-3">
        <RomanticButton
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onExportPNG}
          disabled={exportingPNG || exportingGIF}
        >
          {exportingPNG ? (
            <>
              <span className="animate-spin">⏳</span>
              Saving PNG...
            </>
          ) : (
            <>
              🖼️ Download as PNG
            </>
          )}
        </RomanticButton>

        <RomanticButton
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={onExportGIF}
          disabled={exportingPNG || exportingGIF}
        >
          {exportingGIF ? (
            <>
              <span className="animate-spin">✨</span>
              Creating animation... {gifProgress}%
            </>
          ) : (
            <>
              🎬 Download Animated GIF
            </>
          )}
        </RomanticButton>

        {exportingGIF && (
          <div className="w-full bg-rose-100 rounded-full h-2">
            <div
              className="bg-rose-500 h-2 rounded-full transition-all duration-200"
              style={{ width: `${gifProgress}%` }}
            />
          </div>
        )}
      </div>

      <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 text-center">
        <p className="text-xs text-rose-500 font-medium mb-1">Your bouquet summary</p>
        <div className="text-xs text-rose-400 space-y-0.5">
          <p>
            Size: <span className="text-rose-600 font-medium capitalize">{state.size}</span>
          </p>
          <p>
            Flowers:{" "}
            <span className="text-rose-600 font-medium">
              {state.flowers.length > 0
                ? state.flowers.map((f) => `${f.quantity}× ${f.id}`).join(", ")
                : "None selected"}
            </span>
          </p>
          <p>
            Container:{" "}
            <span className="text-rose-600 font-medium capitalize">
              {state.container}
            </span>
          </p>
          <p>
            Theme:{" "}
            <span className="text-rose-600 font-medium capitalize">
              {state.theme}
            </span>
          </p>
        </div>
      </div>

      <p className="text-rose-300 text-xs text-center italic">
        PNG is high-resolution (1200×1200px). GIF includes a falling petals animation.
      </p>
    </div>
  );
}
