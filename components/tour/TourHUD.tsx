"use client";
/**
 * TourHUD — Heads-Up Display
 * Дэлгэцийн доод талд байрлах байрлалын мэдээлэл + зааврын bar
 */
import { MapPin, Share2, Info } from "lucide-react";
import type { TourBuilding, TourFloor, TourScene } from "@/types/tour";
import { buildTourUrl } from "@/lib/utils";
import { useState } from "react";

interface TourHUDProps {
  building: TourBuilding;
  floor: TourFloor;
  scene: TourScene;
}

export function TourHUD({ building, floor, scene }: TourHUDProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url =
      window.location.origin +
      buildTourUrl(building.id, floor.id, scene.id);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      {/* Location breadcrumb */}
      <div className="flex items-center justify-between px-4 py-3 glass-dark border-t border-navy-700/50">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-navy-400 shrink-0" />
          <span className="text-gray-400">{building.name}</span>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">{floor.label}</span>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">{scene.label}</span>
        </div>

        <div className="flex items-center gap-2">
          {scene.description && (
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
              <Info className="w-3.5 h-3.5" />
              <span className="max-w-xs truncate">{scene.description}</span>
            </div>
          )}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? "Хуулагдлаа ✓" : "Хуваалцах"}
          </button>
        </div>
      </div>

      {/* Controls hint — shown only first time */}
      <div className="flex items-center justify-center gap-6 py-1.5 bg-navy-900/60 text-xs text-gray-600">
        <span>🖱️ Чирж эргүүлэх</span>
        <span>🔍 Scroll: zoom</span>
        <span>📱 Touch: хуруугаар эргүүлэх</span>
        <span>🧭 Gyroscope товч: sensor горим</span>
      </div>
    </div>
  );
}
