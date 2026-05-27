"use client";

import { useBouquet } from "@/context/BouquetContext";
import { THEMES } from "@/lib/themes";
import { ThemeId } from "@/types/bouquet";
import ThemeCard from "@/components/ui/ThemeCard";

export default function Step5Theme() {
  const { state, dispatch } = useBouquet();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-rose-800 mb-1">
          Choose a Background
        </h2>
        <p className="text-rose-400 text-sm">
          Set the mood with a beautiful backdrop
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {THEMES.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            selected={state.theme === theme.id}
            onSelect={() =>
              dispatch({ type: "SET_THEME", payload: theme.id as ThemeId })
            }
          />
        ))}
      </div>
    </div>
  );
}
