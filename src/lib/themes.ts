export interface ThemeDef {
  id: string;
  label: string;
  gradientColors: [string, string];
  nameColor: string;
  cardBg: string;
  description: string;
}

export const THEMES: ThemeDef[] = [
  {
    id: "garden",
    label: "Garden",
    gradientColors: ["#d4edda", "#f8d7da"],
    nameColor: "#a4133c",
    cardBg: "rgba(255,255,255,0.92)",
    description: "Fresh green garden with soft pink",
  },
  {
    id: "sunset",
    label: "Sunset",
    gradientColors: ["#ff9a9e", "#fecfef"],
    nameColor: "#7928d4",
    cardBg: "rgba(255,255,255,0.88)",
    description: "Warm peach and rose glow",
  },
  {
    id: "night-sky",
    label: "Night Sky",
    gradientColors: ["#1a1a2e", "#16213e"],
    nameColor: "#fcd34d",
    cardBg: "rgba(255,255,255,0.18)",
    description: "Deep indigo with golden stars",
  },
  {
    id: "pastel-abstract",
    label: "Pastel Dream",
    gradientColors: ["#f5f0ff", "#ffe4ea"],
    nameColor: "#7928d4",
    cardBg: "rgba(255,255,255,0.92)",
    description: "Dreamy lavender and blush",
  },
];
