import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** URL state encode/decode */
export function buildTourUrl(buildingId: string, floorId: number, sceneId: string) {
  return `/tour?building=${buildingId}&floor=${floorId}&scene=${sceneId}`;
}

export function parseTourUrl(searchParams: URLSearchParams) {
  return {
    // when no building is specified we treat the tour as starting at the
    // campus/drone view.
    buildingId: searchParams.get("building") ?? "campus",
    floorId: Number(searchParams.get("floor") ?? 1),
    sceneId: searchParams.get("scene") ?? "",
  };
}
