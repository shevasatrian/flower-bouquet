export interface FlowerDef {
  id: string;
  label: string;
  svgPath: string;
  primaryColor: string;
  secondaryColor: string;
  emoji: string;
  description: string;
}

export const FLOWERS: FlowerDef[] = [
  {
    id: "rose",
    label: "Rose",
    svgPath: "/flowers/rose.svg",
    primaryColor: "#e0568e",
    secondaryColor: "#ffd2e3",
    emoji: "🌹",
    description: "Classic symbol of love",
  },
  {
    id: "tulip",
    label: "Tulip",
    svgPath: "/flowers/tulip.svg",
    primaryColor: "#d62a48",
    secondaryColor: "#ff8fa3",
    emoji: "🌷",
    description: "Elegant spring bloom",
  },
  {
    id: "lily",
    label: "Lily",
    svgPath: "/flowers/lily.svg",
    primaryColor: "#ff9ec2",
    secondaryColor: "#ffffff",
    emoji: "🌸",
    description: "Pure and fragrant",
  },
  {
    id: "sunflower",
    label: "Sunflower",
    svgPath: "/flowers/sunflower.svg",
    primaryColor: "#fbbf24",
    secondaryColor: "#ffe14d",
    emoji: "🌻",
    description: "Radiant and joyful",
  },
  {
    id: "peony",
    label: "Peony",
    svgPath: "/flowers/peony.svg",
    primaryColor: "#ff9bb4",
    secondaryColor: "#ffd9e0",
    emoji: "💮",
    description: "Lush and romantic",
  },
  {
    id: "daisy",
    label: "Gerbera",
    svgPath: "/flowers/daisy.svg",
    primaryColor: "#ff9a2e",
    secondaryColor: "#ffd24d",
    emoji: "🌼",
    description: "Bright and cheerful",
  },
  {
    id: "lavender",
    label: "Lavender",
    svgPath: "/flowers/lavender.svg",
    primaryColor: "#7b3fb8",
    secondaryColor: "#c9a7ee",
    emoji: "💜",
    description: "Calming and graceful",
  },
];

export const MAX_STEMS: Record<string, number> = {
  small: 6,
  medium: 14,
  large: 22,
};
