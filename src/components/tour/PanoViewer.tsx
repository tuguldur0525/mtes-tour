"use client";
/**
 * PanoViewer.tsx — Photo Sphere Viewer (PSV v5) wrapper
 *
 * Features:
 *  - Tiny Planet intro animation on outside scenes (tinyPlanet: true on scene)
 *  - Smooth 800ms crossfade between scenes, no loading spinner
 *  - defaultYaw / defaultPitch / defaultZoom per scene
 *  - Neighbour image prefetch after load
 *  - Info hotspots: minimal frosted-glass boards, semi-transparent
 *  - Gyroscope support on mobile via GyroscopePlugin
 */

import { useEffect, useRef, useCallback, useState } from "react";
import type { TourScene, NavHotspot, InfoHotspot } from "@/types/tour";

type PSVViewer = import("@photo-sphere-viewer/core").Viewer;
type MarkersPlugin =
  import("@photo-sphere-viewer/markers-plugin").MarkersPlugin;
type GyroscopePlugin =
  import("@photo-sphere-viewer/gyroscope-plugin").GyroscopePlugin;

// ── Tiny Planet timing ─────────────────────────────────────────────────────────
const PLANET_HOLD_MS = 1000;
const PLANET_ANIM_MS = 3000;

interface PanoViewerProps {
  scene: TourScene;
  onNavigate: (sceneId: string) => void;
  onInfoOpen: (hotspot: InfoHotspot) => void;
  onReady: () => void;
}

// ── Nav arrow SVG ──────────────────────────────────────────────────────────────
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

// ── Minimal transparent board ──────────────────────────────────────────────────
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

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" rx="10" fill="rgba(8,20,35,0.52)"/>
  <rect x="0" y="0" width="${W}" height="2" rx="1" fill="rgba(46,117,182,0.70)"/>
  <rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" rx="9.5"
        fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="16" y="30"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="14" font-weight="600"
        fill="rgba(255,255,255,0.92)" letter-spacing="-0.3">${title}</text>
  ${
    detail
      ? `
  <text x="16" y="50"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="11" font-weight="400"
        fill="rgba(160,190,220,0.65)">${detail}</text>`
      : ""
  }
  <text x="${W - 14}" y="68"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="10" font-weight="300"
        fill="rgba(185,212,240,0.90)"

        text-anchor="end">Дэлгэрэнгүй →</text>
</svg>`;

  return svgToDataUrl(svg);
}

function prefetchImage(url: string) {
  if (!url || typeof document === "undefined") return;
  if (document.querySelector(`link[href="${url}"]`)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "image";
  link.href = url;
  document.head.appendChild(link);
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

  const startTime = performance.now();
  const startPitch = -Math.PI / 2;

  function step(now: number) {
    const t = Math.min((now - startTime) / duration, 1);
    const e = easeInOutSine(t);
    viewer.setOption("fisheye" as never, (2 * (1 - e)) as never);
    viewer.zoom(targetZoom * e);
    viewer.rotate({ yaw: 0, pitch: startPitch * (1 - e) });
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ── Check if device has a gyroscope ───────────────────────────────────────────
// DeviceOrientationEvent exists on all mobile browsers but only fires
// real data if there's actual hardware. We check for it once on mount.
function deviceHasGyroscope(): boolean {
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
  onNavigate,
  onInfoOpen,
  onReady,
}: PanoViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PSVViewer | null>(null);
  const markersRef = useRef<MarkersPlugin | null>(null);
  const gyroRef = useRef<GyroscopePlugin | null>(null);
  const readyFiredRef = useRef(false);
  const isFirstLoad = useRef(true);

  // Gyroscope UI state
  const [gyroAvailable, setGyroAvailable] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);

  const onReadyRef = useRef(onReady);
  const onNavigateRef = useRef(onNavigate);
  const onInfoOpenRef = useRef(onInfoOpen);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);
  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);
  useEffect(() => {
    onInfoOpenRef.current = onInfoOpen;
  }, [onInfoOpen]);

  // ── Build markers ──────────────────────────────────────────────────────────
  const buildMarkers = useCallback((s: TourScene) => {
    const markers: object[] = [];

    (s.hotspots ?? []).forEach((hs: NavHotspot) => {
      const pitchAbs = Math.abs(hs.pitch ?? -5);
      const scale = Math.max(0.65, 1 - pitchAbs / 90);
      const px = Math.round(56 * scale);
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

  // ── Gyroscope toggle handler ───────────────────────────────────────────────
  const handleGyroToggle = useCallback(async () => {
    const gyro = gyroRef.current;
    if (!gyro) return;

    // iOS 13+ requires explicit permission request
    const DevOrient = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };

    if (typeof DevOrient.requestPermission === "function") {
      try {
        const permission = await DevOrient.requestPermission();
        if (permission !== "granted") {
          alert(
            "Гироскоп ашиглахыг зөвшөөрөөгүй байна. Тохиргооноос зөвшөөрнө үү.",
          );
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

  // ── Init viewer once ───────────────────────────────────────────────────────
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

      const isTinyPlanet =
        (scene as TourScene & { tinyPlanet?: boolean }).tinyPlanet === true;

      const viewer = new Viewer({
        container: containerRef.current,
        panorama: scene.panoramaUrl,
        caption: scene.label,
        defaultYaw: isTinyPlanet ? 0 : (scene.defaultYaw ?? 0),
        defaultPitch: isTinyPlanet ? -90 : (scene.defaultPitch ?? 0),
        defaultZoomLvl: isTinyPlanet ? 0 : (scene.defaultZoom ?? 50),
        fisheye: isTinyPlanet ? (2 as unknown as boolean) : false,
        minFov: 30,
        maxFov: 110,
        navbar: ["autorotate", "zoom", "fullscreen"],
        loadingTxt: "Ачаалж байна...",
        touchmoveTwoFingers: false,
        mousewheelCtrlKey: false,
        plugins: [
          [MarkersPlugin, { markers: buildMarkers(scene) }],
          // GyroscopePlugin — touchmove: false means gyro and touch don't conflict
          [
            GyroscopePlugin,
            {
              touchmove: false, // user can still drag manually while gyro is on
              absolutePosition: false, // relative mode — more natural feeling
              roll: false, // don't roll the horizon (keeps it level)
            },
          ],
        ],
      });

      viewerRef.current = viewer;
      markersRef.current = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);
      gyroRef.current = viewer.getPlugin<GyroscopePlugin>(GyroscopePlugin);

      // Show gyro button if device supports it
      if (deviceHasGyroscope()) setGyroAvailable(true);

      viewer.addEventListener("ready", () => {
        if (!readyFiredRef.current) {
          readyFiredRef.current = true;
          onReadyRef.current();

          if (isTinyPlanet && isFirstLoad.current) {
            isFirstLoad.current = false;
            setTimeout(() => {
              playTinyPlanetIntro(
                viewer,
                scene.defaultZoom ?? 100,
                PLANET_ANIM_MS,
              );
            }, PLANET_HOLD_MS);
          } else {
            isFirstLoad.current = false;
          }
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

    readyFiredRef.current = false;

    const isTinyPlanet =
      (scene as TourScene & { tinyPlanet?: boolean }).tinyPlanet === true;

    const options: Record<string, unknown> = {
      transition: 800,
      showLoader: false,
    };

    if (!isTinyPlanet) {
      if (scene.defaultYaw !== undefined || scene.defaultPitch !== undefined) {
        options.position = {
          yaw: `${scene.defaultYaw ?? 0}deg`,
          pitch: `${scene.defaultPitch ?? 0}deg`,
        };
      }
      if (scene.defaultZoom !== undefined) options.zoom = scene.defaultZoom;
    } else {
      options.position = { yaw: "0deg", pitch: "-90deg" };
      options.zoom = 0;
    }

    viewer
      .setPanorama(scene.panoramaUrl, options)
      .then(() => {
        if (!readyFiredRef.current) {
          readyFiredRef.current = true;
          onReadyRef.current();
        }
        if (isTinyPlanet) {
          viewer.setOption("fisheye" as never, 2 as never);
          setTimeout(() => {
            playTinyPlanetIntro(
              viewer,
              scene.defaultZoom ?? 50,
              PLANET_ANIM_MS,
            );
          }, PLANET_HOLD_MS);
        } else {
          viewer.setOption("fisheye" as never, false as never);
        }
        const s = scene as TourScene & { preloadUrls?: string[] };
        (s.preloadUrls ?? []).forEach(prefetchImage);
      })
      .catch(() => {
        if (!readyFiredRef.current) {
          readyFiredRef.current = true;
          onReadyRef.current();
        }
      });

    if (markers) {
      markers.clearMarkers();
      buildMarkers(scene).forEach((m) =>
        markers.addMarker(m as Parameters<MarkersPlugin["addMarker"]>[0]),
      );
    }
  }, [scene, buildMarkers]);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      aria-label={`360° панорама — ${scene.label}`}
    >
      {/* PSV container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* ── Gyroscope toggle button — mobile only ─────────────────────────── */}
      {gyroAvailable && (
        <button
          onClick={handleGyroToggle}
          title={gyroActive ? "Гироскоп унтраах" : "Гироскоп асаах"}
          className={`
            absolute bottom-14 right-3 z-30
            w-10 h-10 rounded-xl
            flex items-center justify-center
            transition-all duration-200 shadow-lg
            sm:bottom-16
            ${
              gyroActive
                ? "bg-navy-500 text-white ring-2 ring-navy-300 shadow-navy-500/40"
                : "glass-dark text-gray-300 hover:text-white"
            }
          `}
        >
          {/* Phone + motion arc icon */}
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
            {/* Phone body */}
            <rect x="7" y="2" width="10" height="18" rx="2" />
            {/* Motion arcs */}
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
