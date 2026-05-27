"use client";

interface Props {
  color: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function ColorSwatch({ color, label, selected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      title={label}
      className={`w-10 h-10 rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 ${
        selected
          ? "ring-[3px] ring-rose-500 ring-offset-2 scale-110"
          : "hover:scale-110 hover:ring-2 hover:ring-rose-300 hover:ring-offset-1"
      }`}
      style={{ backgroundColor: color, border: "1.5px solid rgba(0,0,0,0.1)" }}
      aria-pressed={selected}
    />
  );
}
