"use client";

import { useBouquet } from "@/context/BouquetContext";

const MAX_LENGTH = 180;

const SUGGESTIONS = [
  "You make every day more beautiful 🌸",
  "With all my love, forever and always",
  "You are my sunshine on a rainy day",
  "Every flower reminds me of you",
];

export default function Step4Message() {
  const { state, dispatch } = useBouquet();
  const remaining = MAX_LENGTH - state.message.length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-rose-800 mb-1">
          Add a Personal Message
        </h2>
        <p className="text-rose-400 text-sm">
          Write something heartfelt — it will appear on the bouquet card
        </p>
      </div>

      <div className="relative">
        <textarea
          value={state.message}
          onChange={(e) => {
            if (e.target.value.length <= MAX_LENGTH) {
              dispatch({ type: "SET_MESSAGE", payload: e.target.value });
            }
          }}
          placeholder="Write your romantic message here..."
          rows={5}
          className="romantic-input font-dancing text-lg resize-none"
          style={{ lineHeight: "1.7" }}
        />
        <span
          className={`absolute bottom-3 right-3 text-xs ${
            remaining < 20 ? "text-rose-500" : "text-rose-300"
          }`}
        >
          {remaining} left
        </span>
      </div>

      <div>
        <p className="text-xs text-rose-400 mb-2 font-medium">
          Need inspiration?
        </p>
        <div className="flex flex-col gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => dispatch({ type: "SET_MESSAGE", payload: s })}
              className="text-left text-sm text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg px-3 py-2 transition-colors border border-transparent hover:border-rose-100"
            >
              &ldquo;{s}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
