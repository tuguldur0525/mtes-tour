"use client";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";
import type { TourScene } from "@/types/tour";

interface SceneListProps {
  scenes: TourScene[];
  currentSceneId: string;
  onSceneChange: (sceneId: string) => void;
  // Mobile bottom sheet — optional so desktop usage still compiles without them
  isOpen?: boolean;
  onClose?: () => void;
}

export function SceneList({
  scenes,
  currentSceneId,
  onSceneChange,
  isOpen,
  onClose,
}: SceneListProps) {
  const currentIndex = scenes.findIndex((s) => s.id === currentSceneId);

  // Your existing windowing logic — kept exactly as you wrote it
  const visibleScenes = (() => {
    const windowSize = 7;
    const half = Math.floor(windowSize / 2);

    let start = currentIndex - half;
    let end = currentIndex + half + 1;

    if (start < 0) {
      start = 0;
      end = Math.min(windowSize, scenes.length);
    }

    if (end > scenes.length) {
      end = scenes.length;
      start = Math.max(0, end - windowSize);
    }

    return scenes.slice(start, end);
  })();

  // Shared scene buttons — used in both desktop panel and mobile sheet
  const items = (
    <div className="space-y-1">
      {visibleScenes.map((scene) => {
        const active = scene.id === currentSceneId;
        return (
          <button
            key={scene.id}
            onClick={() => {
              onSceneChange(scene.id);
              onClose?.();
            }}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center justify-between group",
              active
                ? "bg-navy-600/80 text-white"
                : "text-gray-300 hover:text-white hover:bg-white/10",
            )}
          >
            <span className="leading-snug">{scene.label}</span>
            <ChevronRight
              className={cn(
                "w-3.5 h-3.5 shrink-0 transition-transform",
                active
                  ? "text-navy-300"
                  : "text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5",
              )}
            />
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ── Desktop: fixed right panel (always visible) ── */}
      <div className="hidden lg:block absolute right-4 top-20 bottom-24 z-20 w-52 overflow-y-auto">
        <div className="glass-dark rounded-xl p-2 space-y-1 shadow-xl">
          <p className="text-xs font-semibold text-gray-400 px-2 py-1 uppercase tracking-wider">
            Байрлалууд
          </p>
          {items}
        </div>
      </div>

      {/* ── Mobile: bottom sheet (shown when isOpen = true) ── */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Sheet */}
          <div
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50
                          glass-dark rounded-t-2xl shadow-2xl
                          border-t border-navy-600/40
                          max-h-[60vh] flex flex-col"
          >
            {/* Drag handle + header */}
            <div className="relative flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2
                              w-10 h-1 rounded-full bg-gray-600"
              />
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Байрлалууд
              </p>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Scrollable list */}
            <div className="overflow-y-auto px-2 pb-6">{items}</div>
          </div>
        </>
      )}
    </>
  );
}
