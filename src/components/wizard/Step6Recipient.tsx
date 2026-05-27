"use client";

import { useBouquet } from "@/context/BouquetContext";

export default function Step6Recipient() {
  const { state, dispatch } = useBouquet();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-rose-800 mb-1">
          Who Is This For?
        </h2>
        <p className="text-rose-400 text-sm">
          Their name will appear at the top of your bouquet
        </p>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-semibold text-rose-700 mb-2 block">
            Recipient&apos;s Name
          </span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400 text-lg select-none">
              ♡
            </span>
            <input
              type="text"
              value={state.recipientName}
              onChange={(e) =>
                dispatch({ type: "SET_RECIPIENT", payload: e.target.value })
              }
              placeholder="e.g. Emma, My Love, Mum..."
              maxLength={40}
              className="romantic-input pl-9 font-playfair text-lg"
              autoFocus
            />
          </div>
        </label>

        {state.recipientName && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center">
            <p className="text-rose-400 text-xs mb-1">Preview</p>
            <p className="font-playfair text-xl font-bold text-rose-700">
              For {state.recipientName}
            </p>
          </div>
        )}
      </div>

      <p className="text-rose-300 text-xs text-center italic">
        This step is optional — leave blank if you prefer
      </p>
    </div>
  );
}
