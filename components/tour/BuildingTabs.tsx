"use client";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";
import type { TourBuilding } from "@/types/tour";

interface BuildingTabsProps {
  buildings: TourBuilding[];
  currentBuildingId: string;
  onBuildingChange: (buildingId: string) => void;
}

export function BuildingTabs({
  buildings,
  currentBuildingId,
  onBuildingChange,
}: BuildingTabsProps) {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      {buildings.map((building) => {
        const active = building.id === currentBuildingId;
        return (
          <button
            key={building.id}
            onClick={() => onBuildingChange(building.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md",
              active
                ? "bg-navy-600 text-white shadow-navy-600/40"
                : "glass-dark text-gray-300 hover:text-white hover:bg-navy-700/60"
            )}
          >
            <Building2 className="w-3.5 h-3.5" />
            {building.name}
          </button>
        );
      })}
    </div>
  );
}
