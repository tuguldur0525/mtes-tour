"use client";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { TourScene } from "@/types/tour";

interface SceneListProps {
  scenes: TourScene[];
  currentSceneId: string;
  onSceneChange: (sceneId: string) => void;
}

export function SceneList({
  scenes,
  currentSceneId,
  onSceneChange,
}: SceneListProps) {
  return (
    <div className="absolute right-4 top-20 bottom-24 z-20 w-52 overflow-y-auto">
      <div className="glass-dark rounded-xl p-2 space-y-1 shadow-xl">
        <p className="text-xs font-semibold text-gray-400 px-2 py-1 uppercase tracking-wider">
          Байрлалууд
        </p>
        {scenes.map((scene) => {
          const active = scene.id === currentSceneId;
          return (
            <button
              key={scene.id}
              onClick={() => onSceneChange(scene.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center justify-between group",
                active
                  ? "bg-navy-600/80 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              )}
            >
              <span className="leading-snug">{scene.label}</span>
              <ChevronRight
                className={cn(
                  "w-3.5 h-3.5 shrink-0 transition-transform",
                  active
                    ? "text-navy-300"
                    : "text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
