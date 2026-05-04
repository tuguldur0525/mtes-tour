"use client";
/**
 * PanoViewer.tsx — Photo Sphere Viewer v5
 *
 * Reverted to the working blob URL approach.
 * The tiles adapter caused "Invalid panorama configuration" errors
 * due to async import timing — removed entirely until tiles are
 * actually generated and the adapter is confirmed working locally.
 *
 * Performance strategy (no tiles):
 *  1. loadImage() fetches + decodes into blob URL before PSV touches it
 *  2. Neighbour preload fires 800ms after scene is visible
 *  3. pendingSceneRef drops stale responses if user navigates quickly
 */

import { useEffect, useRef, useCallback, useState } from "react";
import type { ViewerConfig } from "@photo-sphere-viewer/core";
import type { TourScene, NavHotspot, InfoHotspot } from "@/types/tour";
import { getBuilding } from "@/lib/tour.config";

type PSVViewer = import("@photo-sphere-viewer/core").Viewer;
type MarkersPlugin =
  import("@photo-sphere-viewer/markers-plugin").MarkersPlugin;
type GyroscopePlugin =
  import("@photo-sphere-viewer/gyroscope-plugin").GyroscopePlugin;

const PLANET_HOLD_MS = 1000;
const PLANET_ANIM_MS = 3000;
const MAX_PRELOAD = 3;

interface PanoViewerProps {
  scene: TourScene;
  buildingId: string;
  floorId: number;
  onNavigate: (sceneId: string) => void;
  onInfoOpen: (hotspot: InfoHotspot) => void;
  onReady: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onViewerInit?: (viewer: any) => void;
}

// ── Image cache ────────────────────────────────────────────────────────────────
const imageCache = new Map<string, string>();
const inFlight = new Map<string, Promise<string>>();

async function loadImage(url: string): Promise<string> {
  if (imageCache.has(url)) return imageCache.get(url)!;
  if (inFlight.has(url)) return inFlight.get(url)!;
  const promise = (async () => {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} — ${url}`);
    const blob = await resp.blob();
    const blobUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.src = blobUrl;
    await img.decode().catch(() => {});
    imageCache.set(url, blobUrl);
    inFlight.delete(url);
    return blobUrl;
  })();
  inFlight.set(url, promise);
  return promise;
}

async function preloadQueue(urls: string[], max = MAX_PRELOAD) {
  const todo = urls.filter((u) => u && !imageCache.has(u) && !inFlight.has(u));
  for (let i = 0; i < todo.length; i += max) {
    await Promise.allSettled(todo.slice(i, i + max).map(loadImage));
    await new Promise((r) => setTimeout(r, 50));
  }
}

// ── SVG icons ──────────────────────────────────────────────────────────────────
const NAV_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
  <circle cx="28" cy="28" r="26" fill="rgba(31,78,121,0.80)" stroke="rgba(46,117,182,0.95)" stroke-width="2"/>
  <path d="M20 28l8-10 8 10" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="28" cy="32" r="3" fill="white"/>
</svg>`;

function svgToDataUrl(svg: string) {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}
const NAV_ICON = svgToDataUrl(NAV_SVG);

function makeBoardSvg(hs: InfoHotspot): string {
  const W = 200,
    H = 72;
  let detail = "";
  if (hs.details?.roomCode) detail += hs.details.roomCode;
  if (hs.details?.capacity)
    detail += (detail ? "  ·  " : "") + `${hs.details.capacity} суудал`;
  if (hs.details?.department && !hs.details?.capacity)
    detail += (detail ? "  ·  " : "") + hs.details.department;
  const title = hs.title.length > 20 ? hs.title.slice(0, 19) + "…" : hs.title;
  return svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" rx="10" fill="rgba(8,20,35,0.52)"/>
  <rect x="0" y="0" width="${W}" height="2" rx="1" fill="rgba(46,117,182,0.70)"/>
  <rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" rx="9.5"
        fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="16" y="30" font-family="system-ui,-apple-system,sans-serif"
        font-size="14" font-weight="600" fill="rgba(255,255,255,0.92)"
        letter-spacing="-0.3">${title}</text>
  ${
    detail
      ? `<text x="16" y="50" font-family="system-ui,-apple-system,sans-serif"
        font-size="11" font-weight="400" fill="rgba(160,190,220,0.65)">${detail}</text>`
      : ""
  }
  <text x="${W - 14}" y="68" font-family="system-ui,-apple-system,sans-serif"
        font-size="10" font-weight="300" fill="rgba(182,212,240,0.90)"
        text-anchor="end">Дэлгэрэнгүй →</text>
</svg>`);
}

// ── Tiny Planet ────────────────────────────────────────────────────────────────
function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function playTinyPlanetIntro(
  viewer: PSVViewer,
  targetZoom: number,
  duration: number,
) {
  viewer.setOption("fisheye" as never, 2 as never);
  viewer.rotate({ yaw: 0, pitch: -Math.PI / 2 });
  viewer.zoom(0);
  const t0 = performance.now();
  function step(now: number) {
    const t = Math.min((now - t0) / duration, 1);
    const e = easeInOutSine(t);
    viewer.setOption("fisheye" as never, (2 * (1 - e)) as never);
    viewer.zoom(targetZoom * e);
    viewer.rotate({ yaw: 0, pitch: (-Math.PI / 2) * (1 - e) });
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function deviceHasGyroscope() {
  return (
    typeof window !== "undefined" &&
    (typeof (
      DeviceOrientationEvent as unknown as { requestPermission?: unknown }
    ).requestPermission === "function" ||
      "ondeviceorientation" in window)
  );
}

// ── Component ──────────────────────────────────────────────────────────────────
export function PanoViewer({
  scene,
  buildingId,
  onNavigate,
  onInfoOpen,
  onReady,
  onViewerInit,
}: PanoViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PSVViewer | null>(null);
  const markersRef = useRef<MarkersPlugin | null>(null);
  const gyroRef = useRef<GyroscopePlugin | null>(null);
  const readyFiredRef = useRef(false);
  const isFirstLoad = useRef(true);
  const pendingSceneRef = useRef("");
  const preloadAbortRef = useRef<AbortController | null>(null);

  const [gyroAvailable, setGyroAvailable] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);

  const onReadyRef = useRef(onReady);
  const onNavigateRef = useRef(onNavigate);
  const onInfoOpenRef = useRef(onInfoOpen);
  const onViewerInitRef = useRef(onViewerInit);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);
  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);
  useEffect(() => {
    onInfoOpenRef.current = onInfoOpen;
  }, [onInfoOpen]);
  useEffect(() => {
    onViewerInitRef.current = onViewerInit;
  }, [onViewerInit]);

  const getDirectNeighbourUrls = useCallback(
    (s: TourScene): string[] => {
      const urls: string[] = [];
      const building = getBuilding(buildingId);
      if (!building) return urls;
      (s.hotspots ?? []).forEach((hs: NavHotspot) => {
        for (const floor of building.floors) {
          const target = floor.scenes.find((sc) => sc.id === hs.targetSceneId);
          if (target) {
            urls.push(target.panoramaUrl);
            break;
          }
        }
      });
      const ext = s as TourScene & { preloadUrls?: string[] };
      (ext.preloadUrls ?? []).forEach((u) => {
        if (!urls.includes(u)) urls.push(u);
      });
      return urls;
    },
    [buildingId],
  );

  const buildMarkers = useCallback((s: TourScene) => {
    const markers: object[] = [];
    (s.hotspots ?? []).forEach((hs: NavHotspot) => {
      const px = Math.round(
        56 * Math.max(0.65, 1 - Math.abs(hs.pitch ?? -5) / 90),
      );
      markers.push({
        id: hs.id,
        position: { yaw: `${hs.yaw}deg`, pitch: `${hs.pitch ?? -5}deg` },
        image: NAV_ICON,
        size: { width: px, height: px },
        tooltip: { content: hs.label, position: "top center" },
        data: { type: "nav", targetSceneId: hs.targetSceneId },
        className: "psv-marker--nav",
      });
    });
    (s.infoHotspots ?? []).forEach((hs: InfoHotspot) => {
      markers.push({
        id: hs.id,
        position: { yaw: `${hs.yaw}deg`, pitch: `${hs.pitch ?? 0}deg` },
        image: makeBoardSvg(hs),
        size: { width: 200, height: 72 },
        data: { type: "info", hotspot: hs },
        className: "psv-marker--board",
      });
    });
    return markers;
  }, []);

  const handleGyroToggle = useCallback(async () => {
    const gyro = gyroRef.current;
    if (!gyro) return;
    const DevOrient = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof DevOrient.requestPermission === "function") {
      try {
        const perm = await DevOrient.requestPermission();
        if (perm !== "granted") {
          alert("Гироскоп зөвшөөрөл олгоогүй байна.");
          return;
        }
      } catch {
        return;
      }
    }
    if (gyroActive) {
      gyro.stop();
      setGyroActive(false);
    } else {
      gyro.start();
      setGyroActive(true);
    }
  }, [gyroActive]);

  const startNeighbourPreload = useCallback(
    (s: TourScene) => {
      preloadAbortRef.current?.abort();
      const ac = new AbortController();
      preloadAbortRef.current = ac;
      const urls = getDirectNeighbourUrls(s);
      if (!urls.length) return;
      setTimeout(() => {
        if (!ac.signal.aborted) preloadQueue(urls, MAX_PRELOAD).catch(() => {});
      }, 800);
    },
    [getDirectNeighbourUrls],
  );

  // ── Init viewer ONCE ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;

    (async () => {
      const { Viewer } = await import("@photo-sphere-viewer/core");
      const { MarkersPlugin } =
        await import("@photo-sphere-viewer/markers-plugin");
      const { GyroscopePlugin } =
        await import("@photo-sphere-viewer/gyroscope-plugin");

      if (destroyed || !containerRef.current) return;

      const isTinyPlanet = !!(scene as TourScene & { tinyPlanet?: boolean })
        .tinyPlanet;

      // Always use blob URL — guaranteed string, no adapter confusion
      let firstUrl: string = scene.panoramaUrl;
      try {
        firstUrl = await loadImage(scene.panoramaUrl);
      } catch {
        // Network error — fall back to raw URL, PSV will show its own loader
        firstUrl = scene.panoramaUrl;
      }

      if (destroyed || !containerRef.current) return;

      // ViewerConfig — panorama is always a string here
      const config: ViewerConfig = {
        container: containerRef.current,
        panorama: firstUrl, // ← always a string URL, never an object
        caption: scene.label,
        defaultYaw: isTinyPlanet ? 0 : (scene.defaultYaw ?? 0),
        defaultPitch: isTinyPlanet ? -90 : (scene.defaultPitch ?? 0),
        defaultZoomLvl: isTinyPlanet ? 0 : (scene.defaultZoom ?? 50),
        fisheye: isTinyPlanet ? (2 as unknown as boolean) : false,
        minFov: 30,
        maxFov: 110,
        navbar: ["zoom", "fullscreen"],
        loadingTxt: "Ачаалж байна...",
        touchmoveTwoFingers: false,
        mousewheelCtrlKey: false,
        plugins: [
          [MarkersPlugin, { markers: buildMarkers(scene) }],
          [
            GyroscopePlugin,
            { touchmove: false, absolutePosition: false, roll: false },
          ],
        ],
      };

      const viewer = new Viewer(config);

      viewerRef.current = viewer;
      markersRef.current = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);
      gyroRef.current = viewer.getPlugin<GyroscopePlugin>(GyroscopePlugin);
      if (deviceHasGyroscope()) setGyroAvailable(true);
      onViewerInitRef.current?.(viewer);

      viewer.addEventListener("ready", () => {
        if (!readyFiredRef.current) {
          readyFiredRef.current = true;
          onReadyRef.current();
          if (isTinyPlanet && isFirstLoad.current) {
            isFirstLoad.current = false;
            setTimeout(
              () =>
                playTinyPlanetIntro(
                  viewer,
                  scene.defaultZoom ?? 100,
                  PLANET_ANIM_MS,
                ),
              PLANET_HOLD_MS,
            );
          } else {
            isFirstLoad.current = false;
          }
          startNeighbourPreload(scene);
        }
      });

      markersRef.current?.addEventListener("select-marker", ({ marker }) => {
        const d = marker.data as {
          type: string;
          targetSceneId?: string;
          hotspot?: InfoHotspot;
        };
        if (d.type === "nav" && d.targetSceneId) {
          readyFiredRef.current = false;
          onNavigateRef.current(d.targetSceneId);
        } else if (d.type === "info" && d.hotspot) {
          onInfoOpenRef.current(d.hotspot);
        }
      });
    })();

    return () => {
      destroyed = true;
      preloadAbortRef.current?.abort();
      gyroRef.current = null;
      viewerRef.current?.destroy();
      viewerRef.current = null;
      markersRef.current = null;
      readyFiredRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scene change ───────────────────────────────────────────────────────────
  useEffect(() => {
    const viewer = viewerRef.current;
    const markers = markersRef.current;
    if (!viewer) return;

    const thisSceneId = scene.id;
    pendingSceneRef.current = thisSceneId;
    readyFiredRef.current = false;
    const isTinyPlanet = !!(scene as TourScene & { tinyPlanet?: boolean })
      .tinyPlanet;

    preloadAbortRef.current?.abort();
    preloadAbortRef.current = null;

    // Swap markers immediately
    if (markers) {
      markers.clearMarkers();
      buildMarkers(scene).forEach((m) =>
        markers.addMarker(m as Parameters<MarkersPlugin["addMarker"]>[0]),
      );
    }

    // Fetch + decode → then crossfade
    loadImage(scene.panoramaUrl)
      .catch(() => scene.panoramaUrl) // fallback to raw URL on error
      .then(async (url) => {
        if (pendingSceneRef.current !== thisSceneId || !viewerRef.current)
          return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options: any = {
          transition: 400,
          showLoader: false,
        };

        if (isTinyPlanet) {
          options.position = { yaw: "0deg", pitch: "-90deg" };
          options.zoom = 0;
        } else {
          if (
            scene.defaultYaw !== undefined ||
            scene.defaultPitch !== undefined
          ) {
            options.position = {
              yaw: `${scene.defaultYaw ?? 0}deg`,
              pitch: `${scene.defaultPitch ?? 0}deg`,
            };
          }
          if (scene.defaultZoom !== undefined) options.zoom = scene.defaultZoom;
        }

        await viewerRef.current.setPanorama(url, options).catch(() => {});

        if (pendingSceneRef.current !== thisSceneId) return;

        if (!readyFiredRef.current) {
          readyFiredRef.current = true;
          onReadyRef.current();
        }

        if (isTinyPlanet) {
          viewerRef.current?.setOption("fisheye" as never, 2 as never);
          setTimeout(() => {
            if (viewerRef.current && pendingSceneRef.current === thisSceneId)
              playTinyPlanetIntro(
                viewerRef.current,
                scene.defaultZoom ?? 50,
                PLANET_ANIM_MS,
              );
          }, PLANET_HOLD_MS);
        } else {
          viewerRef.current?.setOption("fisheye" as never, false as never);
        }

        startNeighbourPreload(scene);
      });
  }, [scene, buildMarkers, startNeighbourPreload]);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      aria-label={`360° панорама — ${scene.label}`}
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {gyroAvailable && (
        <button
          onClick={handleGyroToggle}
          title={gyroActive ? "Гироскоп унтраах" : "Гироскоп асаах"}
          className={`absolute bottom-14 right-3 z-30 w-10 h-10 rounded-xl
                      flex items-center justify-center transition-all duration-200 shadow-lg sm:bottom-16
                      ${
                        gyroActive
                          ? "bg-navy-500 text-white ring-2 ring-navy-300"
                          : "glass-dark text-gray-300 hover:text-white"
                      }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="7" y="2" width="10" height="18" rx="2" />
            <path
              d="M2 9c1-2.5 3-4 5-4"
              opacity={gyroActive ? "1" : "0.4"}
              stroke={gyroActive ? "#7ab8e8" : "currentColor"}
            />
            <path
              d="M22 9c-1-2.5-3-4-5-4"
              opacity={gyroActive ? "1" : "0.4"}
              stroke={gyroActive ? "#7ab8e8" : "currentColor"}
            />
          </svg>
        </button>
      )}
    </div>
  );
}
