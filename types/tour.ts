// ============================================================
// МТЭС 360° VR Tour — TypeScript Type Definitions
// ============================================================

export type BuildingId = "A" | "B";
export type HotspotType = "nav" | "info" | "link";

/** Spherical coordinate — yaw: -180..180, pitch: -90..90 */
export interface SphericalPosition {
  yaw: number;
  pitch: number;
}

/** Navigation hotspot — өрөөнөөс өрөөнд шилжих */
export interface NavHotspot {
  id: string;
  type: "nav";
  position: SphericalPosition;
  targetSceneId: string;
  tooltip: string;
}

/** Info hotspot — өрөөний мэдээлэл харуулах */
export interface InfoHotspot {
  id: string;
  type: "info";
  position: SphericalPosition;
  title: string;
  description: string;
  details?: {
    capacity?: number;    // Суудлын тоо
    roomCode?: string;    // Өрөөний дугаар
    department?: string;  // Тэнхим
    equipment?: string[]; // Тоног төхөөрөмж
  };
}

export type Hotspot = NavHotspot | InfoHotspot;

/** Нэг 360° зургийн байрлал */
export interface TourScene {
  id: string;
  label: string;           // Монгол нэр: "201-р Лекцийн Танхим"
  imageUrl: string;        // /images/tour/a-2-room201.jpg
  thumbnailUrl?: string;   // Жижиг preview зураг
  hotspots: Hotspot[];
  defaultYaw?: number;     // Анхдагч харах чиглэл
  defaultPitch?: number;
  description?: string;    // Товч тайлбар
}

/** Нэг давхрын мэдээлэл */
export interface TourFloor {
  id: number;              // 1, 2, 3, 4
  label: string;           // "1-р давхар"
  scenes: TourScene[];
  floorMapUrl?: string;    // /images/tour/floor-map-a1.svg
  defaultSceneId: string;  // Тус давхрын анхдагч scene
}

/** Нэг барилгын мэдээлэл */
export interface TourBuilding {
  id: BuildingId;
  name: string;            // "Барилга A"
  description: string;
  thumbnailUrl: string;
  floors: TourFloor[];
  defaultFloorId: number;
}

/** Системийн бүх тохиргоо */
export interface TourConfig {
  buildings: TourBuilding[];
  defaultBuildingId: BuildingId;
}

/** Tour-ийн одоогийн байрлал (state) */
export interface TourLocation {
  buildingId: BuildingId;
  floorId: number;
  sceneId: string;
}
