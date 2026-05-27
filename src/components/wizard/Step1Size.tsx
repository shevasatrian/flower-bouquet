"use client";

import { useBouquet } from "@/context/BouquetContext";
import { BouquetSize } from "@/types/bouquet";

const SIZES: {
  id: BouquetSize;
  label: string;
  emoji: string;
  desc: string;
  range: string;
}[] = [
  {
    id: "small",
    label: "Petite",
    emoji: "🌸",
    desc: "Delicate and intimate",
    range: "3–5 stems",
  },
  {
    id: "medium",
    label: "Classic",
    emoji: "💐",
    desc: "Perfect and balanced",
    range: "6–12 stems",
  },
  {
    id: "large",
    label: "Grand",
    emoji: "🌹",
    desc: "Luxurious and impressive",
    range: "13–20 stems",
  },
];

export default function Step1Size() {
  const { state, dispatch } = useBouquet();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-rose-800 mb-1">
          Choose Your Bouquet Size
        </h2>
        <p className="text-rose-400 text-sm">
          How grand should your romantic gesture be?
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {SIZES.map((s) => (
          <button
            key={s.id}
            onClick={() => dispatch({ type: "SET_SIZE", payload: s.id })}
            className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              state.size === s.id
                ? "border-rose-500 bg-rose-50 shadow-lg shadow-rose-100 scale-105"
                : "border-rose-100 bg-white hover:border-rose-300 hover:shadow-sm hover:scale-102"
            }`}
          >
            <span className="text-5xl mb-3">{s.emoji}</span>
            <p
              className={`font-playfair font-bold text-base ${
                state.size === s.id ? "text-rose-700" : "text-rose-800"
              }`}
            >
              {s.label}
            </p>
            <p className="text-xs text-rose-400 mt-1 text-center">
              {s.desc}
            </p>
            <p className="text-xs text-rose-300 mt-1 font-medium">{s.range}</p>
            {state.size === s.id && (
              <span className="mt-2 text-xs text-rose-500 font-semibold">
                ✓ Selected
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="text-rose-300 text-xs text-center italic">
        You can always add more flowers in the next step
      </p>
    </div>
  );
}
