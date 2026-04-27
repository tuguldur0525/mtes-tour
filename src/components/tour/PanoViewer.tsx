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
 */

import { useEffect, useRef, useCallback } from "react";
import type { TourScene, NavHotspot, InfoHotspot } from "@/types/tour";

type PSVViewer = import("@photo-sphere-viewer/core").Viewer;
type MarkersPlugin =
  import("@photo-sphere-viewer/markers-plugin").MarkersPlugin;

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
// Design: frosted glass feel — very low opacity fill, thin single border line,
// no gradients, no decorative elements. Just the essential text.
function makeBoardSvg(hs: InfoHotspot): string {
  const W = 200,
    H = 72;

  // One detail line — capacity wins over department
  let detail = "";
  if (hs.details?.roomCode) detail += hs.details.roomCode;
  if (hs.details?.capacity)
    detail += (detail ? "  ·  " : "") + `${hs.details.capacity} суудал`;
  if (hs.details?.department && !hs.details?.capacity)
    detail += (detail ? "  ·  " : "") + hs.details.department;

  // Truncate title if needed
  const title = hs.title.length > 20 ? hs.title.slice(0, 19) + "…" : hs.title;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="blur${hs.id}" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.8"/>
    </filter>
  </defs>

  <!-- Frosted glass background: very transparent dark -->
  <rect width="${W}" height="${H}" rx="10"
        fill="rgba(8,20,35,0.52)"/>

  <!-- Single thin border — top accent only -->
  <rect x="0" y="0" width="${W}" height="2" rx="1"
        fill="rgba(46,117,182,0.70)"/>

  <!-- Outer border hairline -->
  <rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" rx="9.5"
        fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Title -->
  <text x="16" y="30"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="14" font-weight="600"
        fill="rgba(255,255,255,0.92)"
        letter-spacing="-0.3">${title}</text>

  <!-- Detail row -->
  ${
    detail
      ? `
  <text x="16" y="50"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="11" font-weight="400"
        fill="rgba(160,190,220,0.65)"
        letter-spacing="0">${detail}</text>
  `
      : ""
  }

  <!-- Tap hint — very subtle, right-aligned -->
  <text x="${W - 14}" y="50"
        font-family="system-ui,-apple-system,sans-serif"
        font-size="10" font-weight="300"
        fill="rgba(224,237,244,0.60)"
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

// ── Tiny Planet animation ──────────────────────────────────────────────────────
function playTinyPlanetIntro(
  viewer: PSVViewer,
  targetZoom: number,
  duration = 2500,
) {
  viewer.setOption("fisheye" as never, 2 as never);
  viewer.rotate({ yaw: 0, pitch: -Math.PI / 2 });
  viewer.zoom(0);

  const startTime = performance.now();
  const startPitch = -Math.PI / 2;

  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(now: number) {
    const t = Math.min((now - startTime) / duration, 1);
    const e = easeOutCubic(t);
    viewer.setOption("fisheye" as never, (2 * (1 - e)) as never);
    viewer.zoom(targetZoom * e);
    viewer.rotate({ yaw: 0, pitch: startPitch * (1 - e) });
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
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
  const readyFiredRef = useRef(false);
  const isFirstLoad = useRef(true);

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

    // Nav hotspots — arrow icon
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

    // Info hotspots — minimal transparent board
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

  // ── Init viewer once ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;

    (async () => {
      const { Viewer } = await import("@photo-sphere-viewer/core");
      const { MarkersPlugin } =
        await import("@photo-sphere-viewer/markers-plugin");

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
        plugins: [[MarkersPlugin, { markers: buildMarkers(scene) }]],
      });

      viewerRef.current = viewer;
      markersRef.current = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);

      viewer.addEventListener("ready", () => {
        if (!readyFiredRef.current) {
          readyFiredRef.current = true;
          onReadyRef.current();

          if (isTinyPlanet && isFirstLoad.current) {
            isFirstLoad.current = false;
            setTimeout(() => {
              playTinyPlanetIntro(viewer, scene.defaultZoom ?? 100, 2500);
            }, 1600);
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
      if (scene.defaultZoom !== undefined) {
        options.zoom = scene.defaultZoom;
      }
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
            playTinyPlanetIntro(viewer, scene.defaultZoom ?? 50, 4000);
          }, 400);
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
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-label={`360° панорама — ${scene.label}`}
    />
  );
}
