"use client";

import { useBouquet } from "@/context/BouquetContext";
import { WRAPPING_COLORS, RIBBON_COLORS } from "@/lib/ribbonColors";
import ColorSwatch from "@/components/ui/ColorSwatch";

export default function Step7Wrapping() {
  const { state, dispatch } = useBouquet();

  return (
    <div className="space-y-7">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-rose-800 mb-1">
          Wrapping & Ribbon
        </h2>
        <p className="text-rose-400 text-sm">
          The finishing touches that make it perfect
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-rose-700 mb-3">
            Wrapping Paper
          </p>
          <div className="flex flex-wrap gap-3">
            {WRAPPING_COLORS.map((c) => (
              <div key={c.value} className="flex flex-col items-center gap-1">
                <ColorSwatch
                  color={c.value}
                  label={c.label}
                  selected={state.wrappingColor === c.value}
                  onSelect={() =>
                    dispatch({
                      type: "SET_WRAPPING_COLOR",
                      payload: c.value,
                    })
                  }
                />
                <span className="text-[10px] text-rose-400">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm font-semibold text-rose-700 mb-3">Ribbon</p>
          <div className="flex flex-wrap gap-3">
            {RIBBON_COLORS.map((c) => (
              <div key={c.value} className="flex flex-col items-center gap-1">
                <ColorSwatch
                  color={c.value}
                  label={c.label}
                  selected={state.ribbonColor === c.value}
                  onSelect={() =>
                    dispatch({ type: "SET_RIBBON_COLOR", payload: c.value })
                  }
                />
                <span className="text-[10px] text-rose-400">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-rose-50 rounded-xl p-4 flex items-center gap-4 border border-rose-100">
        <div
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex-shrink-0"
          style={{ backgroundColor: state.wrappingColor }}
        />
        <div className="text-xs text-rose-600">
          <span className="font-semibold">Wrapping: </span>
          {WRAPPING_COLORS.find((c) => c.value === state.wrappingColor)?.label}
        </div>
        <div
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex-shrink-0 ml-auto"
          style={{ backgroundColor: state.ribbonColor }}
        />
        <div className="text-xs text-rose-600">
          <span className="font-semibold">Ribbon: </span>
          {RIBBON_COLORS.find((c) => c.value === state.ribbonColor)?.label}
        </div>
      </div>
    </div>
  );
}
