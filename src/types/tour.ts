/**
 * types/tour.ts — shared types for the 360° virtual campus tour
 */
import { Url } from "next/dist/shared/lib/router/router";

export interface NavHotspot {
  id: string;
  type: "nav";
  targetSceneId: string;
  label: string;
  yaw: number;
  pitch?: number;
}

export interface InfoHotspot {
  id: string;
  type: "info";
  yaw: number;
  pitch?: number;
  title: string;
  description: string;
  details?: {
    roomCode?: string;
    capacity?: number;
    department?: string;
    equipment?: string[];
    url?: string;
  };
}

export interface TourScene {
  id: string;
  label: string;
  panoramaUrl: string;
  description?: string;

  // ── Camera defaults ───────────────────────────────────────────────────────
  /** Horizontal angle on arrival in degrees. 0 = forward, 90 = right, -90 = left */
  defaultYaw?: number;
  /** Vertical angle on arrival in degrees. 0 = horizon, -20 = look slightly down */
  defaultPitch?: number;
  /** Zoom level on arrival. 0 = widest, 100 = most zoomed in. Default 50 */
  defaultZoom?: number;

  // ── Tiny Planet intro ─────────────────────────────────────────────────────
  /**
   * When true, this scene opens as a Tiny Planet (fisheye distortion + fully
   * zoomed out, camera looking straight down) then animates into normal view
   * over ~2.5 seconds. Best used on outdoor/outside scenes (floor id = 0).
   *
   * Usage in tour.config.ts:
   *   tinyPlanet: true
   */
  tinyPlanet?: boolean;

  // ── Preload neighbours ────────────────────────────────────────────────────
  /**
   * Panorama URLs to prefetch after this scene loads, so the next nav click
   * feels instant. Add URLs of adjacent scenes.
   *
   * Example:
   *   preloadUrls: ["/panoramas/A/a1-02.jpg", "/panoramas/A/a1-03.jpg"]
   */
  preloadUrls?: string[];

  hotspots?:     NavHotspot[];
  infoHotspots?: InfoHotspot[];
}

export interface TourFloor {
  /** 0 = outside/campus view, 1+ = building floors */
  id: number;
  label: string;
  defaultSceneId: string;
  mapImageUrl?: string;
  scenes: TourScene[];
}

export interface TourBuilding {
  id: string;
  name: string;
  description: string;
  thumbnailUrl?: string;
  floors: TourFloor[];
}

export interface TourConfig {
  defaultBuildingId: string;
  buildings: TourBuilding[];
}