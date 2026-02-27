"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TourFloor } from "@/types/tour";

interface FloorSelectorProps {
  floors: TourFloor[];
  currentFloorId: number;
  onFloorChange: (floorId: number) => void;
}

export function FloorSelector({
  floors,
  currentFloorId,
  onFloorChange,
}: FloorSelectorProps) {
  // Render floors from top (highest) to bottom (lowest)
  const sorted = [...floors].sort((a, b) => b.id - a.id);

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5">
      <p className="text-xs text-gray-400 text-center mb-1 font-medium">
        Давхар
      </p>
      {sorted.map((floor) => {
        const active = floor.id === currentFloorId;
        return (
          <motion.button
            key={floor.id}
            onClick={() => onFloorChange(floor.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-11 h-11 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg",
              active
                ? "bg-navy-600 text-white shadow-navy-600/40 ring-2 ring-navy-400"
                : "glass-dark text-gray-300 hover:text-white hover:bg-navy-700/60",
            )}
            title={floor.label}
          >
            {floor.id}
          </motion.button>
        );
      })}
    </div>
  );
}
