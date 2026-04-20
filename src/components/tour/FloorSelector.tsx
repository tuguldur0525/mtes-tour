"use client";
/**
 * FloorSelector.tsx
 *
 * Left side: floor number buttons (unchanged behaviour).
 * Bottom-left: minimap panel that displays the current floor's mapImageUrl.
 *              Hidden when no mapImageUrl is set on the floor.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Map, X } from "lucide-react";
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
  const [mapOpen, setMapOpen] = useState(false);

  // Render floors top (highest id) → bottom (lowest id)
  const sorted = [...floors].sort((a, b) => b.id - a.id);
  const currentFloor = floors.find((f) => f.id === currentFloorId);
  const hasMap = !!currentFloor?.mapImageUrl;

  return (
    <>
      {/* ── Floor buttons (left side, vertically centered) ── */}
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
              {floor.id === 0 ? "🌍" : floor.id}
            </motion.button>
          );
        })}

        {/* Map toggle button — only shown when current floor has a map */}
        {hasMap && (
          <motion.button
            onClick={() => setMapOpen((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg mt-2",
              mapOpen
                ? "bg-navy-500 text-white ring-2 ring-navy-300"
                : "glass-dark text-gray-300 hover:text-white hover:bg-navy-700/60",
            )}
            title="Давхрын зураглал"
          >
            <Map className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* ── Minimap panel (bottom-left) ── */}
      <AnimatePresence>
        {mapOpen && hasMap && currentFloor?.mapImageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-4 z-30 glass-dark rounded-xl overflow-hidden shadow-2xl border border-navy-600/40"
            style={{ width: 260 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-navy-700/50">
              <div className="flex items-center gap-2">
                <Map className="w-3.5 h-3.5 text-navy-400" />
                <span className="text-xs font-semibold text-gray-300">
                  {currentFloor.label} — Зураглал
                </span>
              </div>
              <button
                onClick={() => setMapOpen(false)}
                className="p-1 rounded text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Map image */}
            <div className="relative bg-navy-900/60">
              <img
                src={currentFloor.mapImageUrl}
                alt={`${currentFloor.label} зураглал`}
                className="w-full object-contain"
                style={{ maxHeight: 220 }}
                onError={(e) => {
                  // Hide the panel if image fails to load
                  (
                    e.currentTarget.parentElement?.parentElement as HTMLElement
                  ).style.display = "none";
                }}
              />
              {/* "You are here" dot — optional, centered as a placeholder */}
              <div
                className="absolute w-3 h-3 rounded-full bg-navy-400 border-2 border-white shadow-lg animate-pulse"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
                title="Таны байршил"
              />
            </div>

            <p className="text-center text-xs text-gray-500 py-1.5">
              Давхрын байршлын зураглал
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
