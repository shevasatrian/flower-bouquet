export interface ContainerDef {
  id: string;
  label: string;
  description: string;
  emoji: string;
}

export const CONTAINERS: ContainerDef[] = [
  {
    id: "hand-tied",
    label: "Hand-Tied",
    description: "Rustic bouquet with twine",
    emoji: "🎀",
  },
  {
    id: "vase",
    label: "Glass Vase",
    description: "Classic transparent vase",
    emoji: "🏺",
  },
  {
    id: "basket",
    label: "Wicker Basket",
    description: "Charming rustic basket",
    emoji: "🧺",
  },
  {
    id: "box",
    label: "Flower Box",
    description: "Elegant rectangular box",
    emoji: "📦",
  },
];
