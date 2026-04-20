"use client";
/**
 * /tour — 360° VR Tour
 *
 * Fix: scene-to-scene navigation no longer triggers the loading overlay.
 *      The PSV crossfade transition handles the visual smoothly.
 *      Loading overlay only appears for building/floor changes (heavier loads).
 */

import { useState, useCallback, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  TOUR_CONFIG,
  getBuilding,
  getFloor,
  getScene,
} from "@/lib/tour.config";
import { buildTourUrl } from "@/lib/utils";
import type { InfoHotspot } from "@/types/tour";

const PanoViewer = dynamic(
  () =>
    import("@/components/tour/PanoViewer").then((m) => ({
      default: m.PanoViewer,
    })),
  { ssr: false },
);
const InfoModal = dynamic(
  () =>
    import("@/components/tour/InfoModal").then((m) => ({
      default: m.InfoModal,
    })),
  { ssr: false },
);
const LoadingOverlay = dynamic(
  () =>
    import("@/components/tour/LoadingOverlay").then((m) => ({
      default: m.LoadingOverlay,
    })),
  { ssr: false },
);

import { FloorSelector } from "@/components/tour/FloorSelector";
import { BuildingTabs } from "@/components/tour/BuildingTabs";
import { SceneList } from "@/components/tour/SceneList";
import { TourHUD } from "@/components/tour/TourHUD";

const DEFAULT_BUILDING = TOUR_CONFIG.defaultBuildingId;
const DEFAULT_FLOOR = 0; // always start outside

// Find which floor a sceneId lives on (needed for cross-floor nav hotspots)
function findFloorForScene(buildingId: string, sceneId: string): number | null {
  const b = getBuilding(buildingId);
  if (!b) return null;
  for (const floor of b.floors) {
    if (floor.scenes.some((s) => s.id === sceneId)) return floor.id;
  }
  return null;
}

function TourContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buildingId, setBuildingId] = useState<string>(
    searchParams.get("building") ?? DEFAULT_BUILDING,
  );
  const [floorId, setFloorId] = useState<number>(
    Number(searchParams.get("floor") ?? DEFAULT_FLOOR),
  );
  const [sceneId, setSceneId] = useState<string>(() => {
    const fromUrl = searchParams.get("scene");
    if (fromUrl) return fromUrl;
    const building = getBuilding(
      searchParams.get("building") ?? DEFAULT_BUILDING,
    );
    const flId = Number(searchParams.get("floor") ?? DEFAULT_FLOOR);
    return building?.floors.find((f) => f.id === flId)?.defaultSceneId ?? "";
  });

  // isLoading = true only for the initial mount + building/floor switches.
  // Scene-to-scene nav inside the same floor does NOT set this true —
  // the PSV crossfade is enough visual feedback.
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<InfoHotspot | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const building = getBuilding(buildingId);
  const floor = building ? getFloor(buildingId, floorId) : undefined;
  const scene = floor ? getScene(buildingId, floorId, sceneId) : undefined;

  // Fallback for invalid URL params
  useEffect(() => {
    if (!building) {
      setBuildingId(DEFAULT_BUILDING);
      return;
    }
    if (!floor) {
      const outside =
        building.floors.find((f) => f.id === 0) ?? building.floors[0];
      setFloorId(outside.id);
      setSceneId(outside.defaultSceneId);
      return;
    }
    if (!scene && floor.scenes.length > 0) {
      setSceneId(floor.defaultSceneId);
    }
  }, [building, floor, scene]);

  // Sync URL
  useEffect(() => {
    if (!scene) return;
    router.replace(buildTourUrl(buildingId, floorId, sceneId), {
      scroll: false,
    });
  }, [buildingId, floorId, sceneId, scene, router]);

  // ── Building change — show overlay (different building = cold load) ──────
  const handleBuildingChange = useCallback((newBuildingId: string) => {
    const b = getBuilding(newBuildingId);
    if (!b) return;
    const outsideFloor = b.floors.find((fl) => fl.id === 0) ?? b.floors[0];
    setBuildingId(newBuildingId);
    setFloorId(outsideFloor.id);
    setSceneId(outsideFloor.defaultSceneId);
    setIsLoading(true); // ← overlay for building switch
  }, []);

  // ── Floor change — show overlay (floor map change = noticeable jump) ─────
  const handleFloorChange = useCallback(
    (newFloorId: number) => {
      const f = getFloor(buildingId, newFloorId);
      if (!f) return;
      setFloorId(newFloorId);
      setSceneId(f.defaultSceneId);
      setIsLoading(true); // ← overlay for floor switch
    },
    [buildingId],
  );

  // ── Scene nav — NO overlay, let PSV crossfade do the work ───────────────
  const handleSceneChange = useCallback(
    (newSceneId: string) => {
      const targetFloorId = findFloorForScene(buildingId, newSceneId);
      const crossesFloor = targetFloorId !== null && targetFloorId !== floorId;

      if (crossesFloor) {
        // Crossing a floor boundary is a bigger jump — show overlay briefly
        setFloorId(targetFloorId!);
        setIsLoading(true);
      }
      // ← no setIsLoading(true) for same-floor scene changes

      setSceneId(newSceneId);
      setActiveModal(null);
    },
    [buildingId, floorId],
  );

  const handleNavigate = useCallback(
    (id: string) => handleSceneChange(id),
    [handleSceneChange],
  );
  const handleInfoOpen = useCallback(
    (hs: InfoHotspot) => setActiveModal(hs),
    [],
  );
  const handleInfoClose = useCallback(() => setActiveModal(null), []);
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
      <div className="flex-1 relative overflow-hidden">
        <PanoViewer
          scene={scene}
          onNavigate={handleNavigate}
          onInfoOpen={handleInfoOpen}
          onReady={handleViewerReady}
        />

        {/* Overlay only shows for slow loads (building/floor switch) */}
        <AnimatePresence>{isLoading && <LoadingOverlay />}</AnimatePresence>

        <BuildingTabs
          buildings={TOUR_CONFIG.buildings}
          currentBuildingId={buildingId}
          onBuildingChange={handleBuildingChange}
        />

        <FloorSelector
          floors={building.floors}
          currentFloorId={floorId}
          onFloorChange={handleFloorChange}
        />

        <div className="hidden lg:block">
          <SceneList
            scenes={floor.scenes}
            currentSceneId={sceneId}
            onSceneChange={handleSceneChange}
          />
        </div>

        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="lg:hidden absolute right-4 top-20 z-20 px-3 py-2 rounded-lg glass-dark text-xs text-gray-300 hover:text-white transition-colors"
        >
          {sidebarOpen ? "Хаах ✕" : "Байрлалууд ☰"}
        </button>

        {sidebarOpen && (
          <div className="lg:hidden absolute right-4 top-32 z-20">
            <SceneList
              scenes={floor.scenes}
              currentSceneId={sceneId}
              onSceneChange={(id) => {
                handleSceneChange(id);
                setSidebarOpen(false);
              }}
            />
          </div>
        )}

        <AnimatePresence>
          {activeModal && (
            <InfoModal hotspot={activeModal} onCloseAction={handleInfoClose} />
          )}
        </AnimatePresence>
      </div>

      <TourHUD building={building} floor={floor} scene={scene} />
    </div>
  );
}

export default function TourPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 top-16 bg-navy-900 flex items-center justify-center">
          <div className="text-white text-sm animate-pulse">
            Ачаалж байна...
          </div>
        </div>
      }
    >
      <TourContent />
    </Suspense>
  );
}
