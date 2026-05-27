export type BouquetSize = "small" | "medium" | "large";
export type ContainerType = "hand-tied" | "vase" | "basket" | "box";
export type ThemeId = "garden" | "sunset" | "night-sky" | "pastel-abstract";

export interface FlowerSelection {
  id: string;
  quantity: number;
}

export interface BouquetState {
  size: BouquetSize;
  flowers: FlowerSelection[];
  container: ContainerType;
  message: string;
  theme: ThemeId;
  recipientName: string;
  wrappingColor: string;
  ribbonColor: string;
  currentStep: number;
}

export type BouquetAction =
  | { type: "SET_SIZE"; payload: BouquetSize }
  | { type: "UPDATE_FLOWER_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "SET_CONTAINER"; payload: ContainerType }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_THEME"; payload: ThemeId }
  | { type: "SET_RECIPIENT"; payload: string }
  | { type: "SET_WRAPPING_COLOR"; payload: string }
  | { type: "SET_RIBBON_COLOR"; payload: string }
  | { type: "SET_STEP"; payload: number };
