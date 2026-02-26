"use client";
/**
 * PanoViewer — Photo Sphere Viewer v5 wrapper component
 *
 * Гол 360° viewer. PSV нь browser API шаардлагатай тул
 * dynamic import + "use client" ашигладаг.
 */

import { useEffect, useRef, useCallback } from "react";
import type { TourScene, NavHotspot, InfoHotspot } from "@/types/tour";

interface PanoViewerProps {
  scene: TourScene;
  onNavigate: (targetSceneId: string) => void;
  onInfoOpen: (hotspot: InfoHotspot) => void;
  onReady?: () => void;
}

export function PanoViewer({
  scene,
  onNavigate,
  onInfoOpen,
  onReady,
}: PanoViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<unknown>(null);

  // ── Cleanup helper ──────────────────────────────────────
  const destroyViewer = useCallback(() => {
    if (viewerRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (viewerRef.current as any).destroy();
      viewerRef.current = null;
    }
  }, []);

  // ── Init / re-init on scene change ──────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    async function initPSV() {
      const { Viewer } = await import("@photo-sphere-viewer/core");
      const { MarkersPlugin } = await import(
        "@photo-sphere-viewer/markers-plugin"
      );
      const { CompassPlugin } = await import(
        "@photo-sphere-viewer/compass-plugin"
      );
      const { GyroscopePlugin } = await import(
        "@photo-sphere-viewer/gyroscope-plugin"
      );

      if (cancelled || !containerRef.current) return;

      // Destroy previous instance
      destroyViewer();

      // Build markers from hotspots
      const markers = scene.hotspots.map((hs) => {
        const base = {
          id: hs.id,
          position: { yaw: `${hs.position.yaw}deg`, pitch: `${hs.position.pitch}deg` },
        };

        if (hs.type === "nav") {
          const nav = hs as NavHotspot;
          return {
            ...base,
            html: `
              <div class="psv-custom-nav" title="${nav.tooltip}">
                <div class="psv-nav-arrow">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                    <circle cx="24" cy="24" r="22" fill="rgba(46,117,182,0.85)" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
                    <path d="M24 14 L34 30 L24 26 L14 30 Z" fill="white"/>
                  </svg>
                </div>
                <span class="psv-nav-label">${nav.tooltip}</span>
              </div>`,
            anchor: "bottom center",
            data: { type: "nav", targetSceneId: nav.targetSceneId },
            style: { cursor: "pointer" },
          };
        } else {
          const info = hs as InfoHotspot;
          return {
            ...base,
            html: `
              <div class="psv-custom-info" title="${info.title}">
                <div class="psv-info-dot">
                  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                    <circle cx="18" cy="18" r="16" fill="rgba(30,80,140,0.9)" stroke="rgba(150,200,255,0.8)" stroke-width="2"/>
                    <text x="18" y="24" text-anchor="middle" font-size="18" fill="white" font-family="sans-serif" font-weight="bold">i</text>
                  </svg>
                </div>
                <span class="psv-info-label">${info.title}</span>
              </div>`,
            anchor: "bottom center",
            data: { type: "info", hotspot: info },
            style: { cursor: "pointer" },
          };
        }
      });

      const viewer = new Viewer({
        container: containerRef.current!,
        panorama: scene.imageUrl,
        defaultYaw: scene.defaultYaw ?? 0,
        defaultPitch: scene.defaultPitch ?? 0,
        defaultZoomLvl: 50,
        minFov: 30,
        maxFov: 90,
        navbar: [
          "autorotate",
          "zoom",
          "move",
          "gyroscope",
          "stereo",
          "fullscreen",
        ],
        plugins: [
          [
            MarkersPlugin,
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              markers: markers as any,
            },
          ],
          [CompassPlugin, { hotspots: [] }],
          [GyroscopePlugin, { touchmove: true, moveMode: "smooth" }],
        ],
        loadingImg: undefined,
        loadingTxt: "Ачаалж байна...",
        touchmoveTwoFingers: false,
        mousewheelCtrlKey: false,
      });

      viewerRef.current = viewer;

      // Marker click handler
      const markersPlugin = viewer.getPlugin(MarkersPlugin);
      markersPlugin.addEventListener("select-marker", (e: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const marker = (e as any).marker;
        if (!marker?.data) return;

        if (marker.data.type === "nav") {
          onNavigate(marker.data.targetSceneId);
        } else if (marker.data.type === "info") {
          onInfoOpen(marker.data.hotspot);
        }
      });

      viewer.addEventListener("ready", () => {
        if (!cancelled) onReady?.();
      });
    }

    initPSV().catch(console.error);

    return () => {
      cancelled = true;
      destroyViewer();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.id, scene.imageUrl]);

  return (
    <>
      {/* PSV global styles */}
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5/index.min.css');
        @import url('https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/markers-plugin@5/index.min.css');
        @import url('https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/compass-plugin@5/index.min.css');

        .psv-custom-nav, .psv-custom-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          user-select: none;
        }
        .psv-nav-arrow, .psv-info-dot {
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .psv-custom-nav:hover .psv-nav-arrow,
        .psv-custom-info:hover .psv-info-dot {
          transform: scale(1.15);
          filter: drop-shadow(0 4px 12px rgba(46,117,182,0.8));
        }
        .psv-nav-label, .psv-info-label {
          background: rgba(13,27,42,0.85);
          color: white;
          font-size: 11px;
          font-family: system-ui, sans-serif;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 4px;
          white-space: nowrap;
          pointer-events: none;
          border: 1px solid rgba(46,117,182,0.4);
        }
      `}</style>
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
}
