"use client";

import React, { createContext, useContext, useReducer } from "react";
import { BouquetState, BouquetAction } from "@/types/bouquet";

const initialState: BouquetState = {
  size: "medium",
  flowers: [],
  container: "hand-tied",
  message: "",
  theme: "garden",
  recipientName: "",
  wrappingColor: "#c4a882",
  ribbonColor: "#d4af37",
  currentStep: 1,
};

function reducer(state: BouquetState, action: BouquetAction): BouquetState {
  switch (action.type) {
    case "SET_SIZE":
      return { ...state, size: action.payload };

    case "UPDATE_FLOWER_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, flowers: state.flowers.filter((f) => f.id !== id) };
      }
      const exists = state.flowers.some((f) => f.id === id);
      if (exists) {
        return {
          ...state,
          flowers: state.flowers.map((f) =>
            f.id === id ? { ...f, quantity } : f
          ),
        };
      }
      return { ...state, flowers: [...state.flowers, { id, quantity }] };
    }

    case "SET_CONTAINER":
      return { ...state, container: action.payload };

    case "SET_MESSAGE":
      return { ...state, message: action.payload };

    case "SET_THEME":
      return { ...state, theme: action.payload };

    case "SET_RECIPIENT":
      return { ...state, recipientName: action.payload };

    case "SET_WRAPPING_COLOR":
      return { ...state, wrappingColor: action.payload };

    case "SET_RIBBON_COLOR":
      return { ...state, ribbonColor: action.payload };

    case "SET_STEP":
      return { ...state, currentStep: action.payload };

    default:
      return state;
  }
}

interface BouquetContextType {
  state: BouquetState;
  dispatch: React.Dispatch<BouquetAction>;
}

const BouquetContext = createContext<BouquetContextType | null>(null);

export function BouquetProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BouquetContext.Provider value={{ state, dispatch }}>
      {children}
    </BouquetContext.Provider>
  );
}

export function useBouquet() {
  const ctx = useContext(BouquetContext);
  if (!ctx) throw new Error("useBouquet must be used within BouquetProvider");
  return ctx;
}
