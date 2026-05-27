"use client";

import { useBouquet } from "@/context/BouquetContext";
import { FLOWERS, MAX_STEMS } from "@/lib/flowers";
import FlowerCard from "@/components/ui/FlowerCard";

export default function Step2Flowers() {
  const { state, dispatch } = useBouquet();

  const maxStems = MAX_STEMS[state.size];
  const currentTotal = state.flowers.reduce((s, f) => s + f.quantity, 0);
  const remaining = maxStems - currentTotal;

  function getQuantity(id: string) {
    return state.flowers.find((f) => f.id === id)?.quantity ?? 0;
  }

  function handleChange(id: string, quantity: number) {
    dispatch({ type: "UPDATE_FLOWER_QUANTITY", payload: { id, quantity } });
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-rose-800 mb-1">
          Choose Your Flowers
        </h2>
        <p className="text-rose-400 text-sm">
          Mix and match to create the perfect arrangement
        </p>
      </div>

      <div className="flex items-center justify-between bg-rose-50 rounded-xl px-4 py-3 border border-rose-100">
        <div>
          <span className="text-sm font-semibold text-rose-700">
            {currentTotal} stem{currentTotal !== 1 ? "s" : ""} selected
          </span>
          <span className="text-sm text-rose-400 ml-2">
            of {maxStems} max ({state.size})
          </span>
        </div>
        <div
          className={`text-sm font-medium ${
            remaining === 0 ? "text-rose-600" : "text-rose-400"
          }`}
        >
          {remaining === 0 ? "Bouquet full 🌸" : `${remaining} more allowed`}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {FLOWERS.map((flower) => (
          <FlowerCard
            key={flower.id}
            flower={flower}
            quantity={getQuantity(flower.id)}
            onQuantityChange={(q) => handleChange(flower.id, q)}
            maxTotal={maxStems}
            currentTotal={currentTotal}
          />
        ))}
      </div>

      {currentTotal === 0 && (
        <p className="text-rose-300 text-xs text-center italic">
          Tap a flower to add it to your bouquet
        </p>
      )}
    </div>
  );
}
