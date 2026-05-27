"use client";

import { ThemeDef } from "@/lib/themes";

interface Props {
  theme: ThemeDef;
  selected: boolean;
  onSelect: () => void;
}

export default function ThemeCard({ theme, selected, onSelect }: Props) {
  const [c1, c2] = theme.gradientColors;

  return (
    <button
      onClick={onSelect}
      className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
        selected
          ? "border-rose-500 shadow-lg scale-105"
          : "border-rose-100 hover:border-rose-300 hover:scale-102"
      }`}
      aria-pressed={selected}
    >
      <div
        className="h-20 w-full"
        style={{
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
        }}
      />
      <div className="px-3 py-2 bg-white">
        <p
          className={`text-sm font-semibold text-center ${
            selected ? "text-rose-600" : "text-rose-800"
          }`}
        >
          {theme.label}
        </p>
        <p className="text-[10px] text-rose-400 text-center leading-tight mt-0.5">
          {theme.description}
        </p>
      </div>
    </button>
  );
}
