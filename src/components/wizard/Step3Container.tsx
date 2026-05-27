"use client";

import { useBouquet } from "@/context/BouquetContext";
import { CONTAINERS } from "@/lib/containers";
import { ContainerType } from "@/types/bouquet";
import ContainerCard from "@/components/ui/ContainerCard";

export default function Step3Container() {
  const { state, dispatch } = useBouquet();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-rose-800 mb-1">
          Choose a Container
        </h2>
        <p className="text-rose-400 text-sm">
          How would you like to present your flowers?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {CONTAINERS.map((container) => (
          <ContainerCard
            key={container.id}
            container={container}
            selected={state.container === container.id}
            onSelect={() =>
              dispatch({
                type: "SET_CONTAINER",
                payload: container.id as ContainerType,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
