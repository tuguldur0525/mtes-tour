"use client";
/**
 * /tour — 360° VR Tour гол хуудас
 *
 * URL params: ?building=A&floor=1&scene=a1-entrance
 * State: buildingId, floorId, sceneId
 */

import { useState, useCallback, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { TOUR_CONFIG, getBuilding, getFloor, getScene } from "@/lib/tour.config";
import { buildTourUrl } from "@/lib/utils";
import type { InfoHotspot } from "@/types/tour";

// ── Lazy load heavy components ─────────────────────────────
const PanoViewer   = dynamic(() => import("@/components/tour/PanoViewer").then(m => ({ default: m.PanoViewer })),   { ssr: false });
const InfoModal    = dynamic(() => import("@/components/tour/InfoModal").then(m => ({ default: m.InfoModal })),     { ssr: false });
const LoadingOverlay = dynamic(() => import("@/components/tour/LoadingOverlay").then(m => ({ default: m.LoadingOverlay })), { ssr: false });

// Static UI components (no browser APIs needed)
import { FloorSelector } from "@/components/tour/FloorSelector";
import { BuildingTabs }  from "@/components/tour/BuildingTabs";
import { SceneList }     from "@/components/tour/SceneList";
import { TourHUD }       from "@/components/tour/TourHUD";

// ── Default location ───────────────────────────────────────
const DEFAULT_BUILDING = TOUR_CONFIG.defaultBuildingId;
const DEFAULT_FLOOR    = 1;

function TourContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  // ── State ────────────────────────────────────────────────
  const [buildingId, setBuildingId] = useState<string>(
    searchParams.get("building") ?? DEFAULT_BUILDING
  );
  const [floorId, setFloorId] = useState<number>(
    Number(searchParams.get("floor") ?? DEFAULT_FLOOR)
  );
  const [sceneId, setSceneId] = useState<string>(() => {
    const fromUrl = searchParams.get("scene");
    if (fromUrl) return fromUrl;
    const building = getBuilding(searchParams.get("building") ?? DEFAULT_BUILDING);
    const flId     = Number(searchParams.get("floor") ?? DEFAULT_FLOOR);
    return building?.floors.find(f => f.id === flId)?.defaultSceneId ?? "";
  });
  const [isLoading,   setIsLoading]   = useState(true);
  const [activeModal, setActiveModal] = useState<InfoHotspot | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Derived data ─────────────────────────────────────────
  const building = getBuilding(buildingId);
  const floor    = building ? getFloor(buildingId, floorId) : undefined;
  const scene    = floor   ? getScene(buildingId, floorId, sceneId) : undefined;

  // Fallback if URL params are invalid
  useEffect(() => {
    if (!building) {
      setBuildingId(DEFAULT_BUILDING);
      return;
    }
    if (!floor) {
      const firstFloor = building.floors[0];
      setFloorId(firstFloor.id);
      setSceneId(firstFloor.defaultSceneId);
      return;
    }
    if (!scene && floor.scenes.length > 0) {
      setSceneId(floor.defaultSceneId);
    }
  }, [building, floor, scene]);

  // ── URL sync ─────────────────────────────────────────────
  useEffect(() => {
    if (!scene) return;
    const url = buildTourUrl(buildingId, floorId, sceneId);
    router.replace(url, { scroll: false });
  }, [buildingId, floorId, sceneId, scene, router]);

  // ── Handlers ─────────────────────────────────────────────
  const handleBuildingChange = useCallback((newBuildingId: string) => {
    const b = getBuilding(newBuildingId);
    if (!b) return;
    const f = b.floors.find(fl => fl.id === 1) ?? b.floors[0];
    setBuildingId(newBuildingId);
    setFloorId(f.id);
    setSceneId(f.defaultSceneId);
    setIsLoading(true);
  }, []);

  const handleFloorChange = useCallback((newFloorId: number) => {
    const f = getFloor(buildingId, newFloorId);
    if (!f) return;
    setFloorId(newFloorId);
    setSceneId(f.defaultSceneId);
    setIsLoading(true);
  }, [buildingId]);

  const handleSceneChange = useCallback((newSceneId: string) => {
    setSceneId(newSceneId);
    setIsLoading(true);
    setActiveModal(null);
  }, []);

  const handleNavigate   = useCallback((targetSceneId: string) => handleSceneChange(targetSceneId), [handleSceneChange]);
  const handleInfoOpen   = useCallback((hs: InfoHotspot) => setActiveModal(hs), []);
  const handleInfoClose  = useCallback(() => setActiveModal(null), []);
  const handleViewerReady = useCallback(() => setIsLoading(false), []);

  if (!building || !floor || !scene) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900 text-white">
        <p>Ачаалж байна...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 top-16 bg-navy-900 flex flex-col">
      {/* ── Main viewer area ─────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">

        {/* 360° Panorama Viewer */}
        <PanoViewer
          scene={scene}
          onNavigate={handleNavigate}
          onInfoOpen={handleInfoOpen}
          onReady={handleViewerReady}
        />

        {/* Loading overlay */}
        <AnimatePresence>
          {isLoading && <LoadingOverlay />}
        </AnimatePresence>

        {/* Building selector tabs */}
        <BuildingTabs
          buildings={TOUR_CONFIG.buildings}
          currentBuildingId={buildingId}
          onBuildingChange={handleBuildingChange}
        />

        {/* Floor selector (left side) */}
        <FloorSelector
          floors={floor ? building.floors : []}
          currentFloorId={floorId}
          onFloorChange={handleFloorChange}
        />

        {/* Scene list (right side, desktop) */}
        <div className="hidden lg:block">
          <SceneList
            scenes={floor.scenes}
            currentSceneId={sceneId}
            onSceneChange={handleSceneChange}
          />
        </div>

        {/* Mobile scene toggle */}
        <button
          onClick={() => setSidebarOpen(v => !v)}
          className="lg:hidden absolute right-4 top-20 z-20 px-3 py-2 rounded-lg glass-dark text-xs text-gray-300 hover:text-white transition-colors"
        >
          {sidebarOpen ? "Хаах ✕" : "Байрлалууд ☰"}
        </button>

        {/* Mobile scene list */}
        {sidebarOpen && (
          <div className="lg:hidden absolute right-4 top-32 z-20">
            <SceneList
              scenes={floor.scenes}
              currentSceneId={sceneId}
              onSceneChange={(id) => { handleSceneChange(id); setSidebarOpen(false); }}
            />
          </div>
        )}

        {/* Info modal */}
        <InfoModal hotspot={activeModal} onClose={handleInfoClose} />
      </div>

      {/* ── HUD bar ──────────────────────────────────── */}
      <TourHUD building={building} floor={floor} scene={scene} />
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export default function TourPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 top-16 bg-navy-900 flex items-center justify-center">
          <div className="text-white text-sm animate-pulse">Ачаалж байна...</div>
        </div>
      }
    >
      <TourContent />
    </Suspense>
  );
}
