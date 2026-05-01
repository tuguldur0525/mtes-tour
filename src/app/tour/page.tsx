"use client";
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
import { LayoutList } from "lucide-react";

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
const DEFAULT_FLOOR = 0;

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

  const [buildingId, setBuildingId] = useState(
    searchParams.get("building") ?? DEFAULT_BUILDING,
  );
  const [floorId, setFloorId] = useState(
    Number(searchParams.get("floor") ?? DEFAULT_FLOOR),
  );
  const [sceneId, setSceneId] = useState(() => {
    const fromUrl = searchParams.get("scene");
    if (fromUrl) return fromUrl;
    const b = getBuilding(searchParams.get("building") ?? DEFAULT_BUILDING);
    const fId = Number(searchParams.get("floor") ?? DEFAULT_FLOOR);
    return b?.floors.find((f) => f.id === fId)?.defaultSceneId ?? "";
  });

  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<InfoHotspot | null>(null);
  const [sceneSheetOpen, setSceneSheetOpen] = useState(false);

  const building = getBuilding(buildingId);
  const floor = building ? getFloor(buildingId, floorId) : undefined;
  const scene = floor ? getScene(buildingId, floorId, sceneId) : undefined;

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
    if (!scene && floor.scenes.length > 0) setSceneId(floor.defaultSceneId);
  }, [building, floor, scene]);

  useEffect(() => {
    if (!scene) return;
    router.replace(buildTourUrl(buildingId, floorId, sceneId), {
      scroll: false,
    });
  }, [buildingId, floorId, sceneId, scene, router]);

  const handleBuildingChange = useCallback((newId: string) => {
    const b = getBuilding(newId);
    if (!b) return;
    const outside = b.floors.find((f) => f.id === 0) ?? b.floors[0];
    setBuildingId(newId);
    setFloorId(outside.id);
    setSceneId(outside.defaultSceneId);
    setIsLoading(true);
  }, []);

  const handleFloorChange = useCallback(
    (newFloorId: number) => {
      const f = getFloor(buildingId, newFloorId);
      if (!f) return;
      setFloorId(newFloorId);
      setSceneId(f.defaultSceneId);
      setIsLoading(true);
    },
    [buildingId],
  );

  const handleSceneChange = useCallback(
    (newSceneId: string) => {
      const targetFloorId = findFloorForScene(buildingId, newSceneId);
      if (targetFloorId !== null && targetFloorId !== floorId) {
        setFloorId(targetFloorId);
        setIsLoading(true);
      }
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
          buildingId={buildingId}
          floorId={floorId}
          onNavigate={handleNavigate}
          onInfoOpen={handleInfoOpen}
          onReady={handleViewerReady}
        />

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

        <SceneList
          scenes={floor.scenes}
          currentSceneId={sceneId}
          onSceneChange={handleSceneChange}
          isOpen={sceneSheetOpen}
          onClose={() => setSceneSheetOpen(false)}
        />

        <AnimatePresence>
          {activeModal && (
            <InfoModal hotspot={activeModal} onCloseAction={handleInfoClose} />
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <button
          onClick={() => setSceneSheetOpen(true)}
          className="lg:hidden absolute -top-9 right-3 z-20
                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                    glass-dark text-xs text-gray-300 hover:text-white
                    border border-navy-600/40 shadow-lg"
        >
          <LayoutList className="w-3.5 h-3.5" />
          <span>Байрлалууд</span>
        </button>
        <TourHUD building={building} floor={floor} scene={scene} />
      </div>
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
