import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Build a /tour URL with the given building, floor, and scene params.
 */
export function buildTourUrl(
  buildingId: string,
  floorId: number,
  sceneId: string,
): string {
  const params = new URLSearchParams({
    building: buildingId,
    floor: String(floorId),
    scene: sceneId,
  });
  return `/tour?${params.toString()}`;
}
