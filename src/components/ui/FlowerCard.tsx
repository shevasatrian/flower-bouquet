"use client";

import { FlowerDef } from "@/lib/flowers";

interface Props {
  flower: FlowerDef;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxTotal: number;
  currentTotal: number;
}

export default function FlowerCard({
  flower,
  quantity,
  onQuantityChange,
  maxTotal,
  currentTotal,
}: Props) {
  const isSelected = quantity > 0;
  const canAdd = currentTotal < maxTotal;

  return (
    <div
      className={`relative rounded-2xl p-3 border-2 transition-all duration-200 cursor-pointer select-none ${
        isSelected
          ? "border-rose-400 bg-rose-50 shadow-md shadow-rose-100"
          : "border-rose-100 bg-white hover:border-rose-300 hover:shadow-sm"
      }`}
      onClick={() => {
        if (quantity === 0 && canAdd) onQuantityChange(1);
      }}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-bold shadow">
          {quantity}
        </div>
      )}

      <div className="text-center mb-1">
        <span className="text-3xl" role="img" aria-label={flower.label}>
          {flower.emoji}
        </span>
      </div>

      <p className="text-xs font-semibold text-center text-rose-800 mb-0.5">
        {flower.label}
      </p>
      <p className="text-[10px] text-center text-rose-400 mb-2 leading-tight">
        {flower.description}
      </p>

      {isSelected && (
        <div
          className="flex items-center justify-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 font-bold text-sm flex items-center justify-center hover:bg-rose-300 transition-colors"
            onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
          >
            −
          </button>
          <span className="text-sm font-semibold text-rose-700 min-w-4 text-center">
            {quantity}
          </span>
          <button
            className={`w-6 h-6 rounded-full font-bold text-sm flex items-center justify-center transition-colors ${
              canAdd
                ? "bg-rose-500 text-white hover:bg-rose-600"
                : "bg-rose-100 text-rose-300 cursor-not-allowed"
            }`}
            onClick={() => canAdd && onQuantityChange(quantity + 1)}
            disabled={!canAdd}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
