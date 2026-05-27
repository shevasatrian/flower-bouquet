"use client";

import { ContainerDef } from "@/lib/containers";

interface Props {
  container: ContainerDef;
  selected: boolean;
  onSelect: () => void;
}

export default function ContainerCard({ container, selected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 w-full focus:outline-none focus:ring-2 focus:ring-rose-400 ${
        selected
          ? "border-rose-500 bg-rose-50 shadow-md shadow-rose-100"
          : "border-rose-100 bg-white hover:border-rose-300 hover:shadow-sm"
      }`}
      aria-pressed={selected}
    >
      <span className="text-4xl mb-2" role="img" aria-label={container.label}>
        {container.emoji}
      </span>
      <p
        className={`text-sm font-semibold ${
          selected ? "text-rose-700" : "text-rose-800"
        }`}
      >
        {container.label}
      </p>
      <p className="text-xs text-rose-400 mt-0.5 text-center leading-tight">
        {container.description}
      </p>
      {selected && (
        <span className="mt-2 text-xs text-rose-500 font-medium">✓ Selected</span>
      )}
    </button>
  );
}
