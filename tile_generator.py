#!/usr/bin/env python3
"""
tile_generator.py
=================
Converts equirectangular 360° panorama JPEGs into tile sets
compatible with @photo-sphere-viewer/equirectangular-tiles-adapter.

PSV Tiles adapter expects this folder structure:
  public/tiles/{scene_id}/
      preview.jpg          ← low-res full image (shown while tiles load)
      1/{col}_{row}.jpg    ← zoom level 1 tiles (coarse)
      2/{col}_{row}.jpg    ← zoom level 2 tiles (fine)
      ...

Usage:
  python3 tile_generator.py

Edit PANORAMAS below to match your actual file paths.
"""

import os
import json
import math
from pathlib import Path
from PIL import Image

# ── Configuration ──────────────────────────────────────────────────────────────

# Where your source panoramas live (relative to this script)
PANORAMAS_DIR = Path("public/panoramas")

# Where tiles will be written
TILES_DIR = Path("public/tiles")

# Preview image size (shown instantly while tiles load)
PREVIEW_WIDTH  = 1024
PREVIEW_HEIGHT = 512

# Tile size in pixels — 512 is the PSV recommendation
TILE_SIZE = 512

# JPEG quality for tiles (80 = good balance of size vs quality)
TILE_QUALITY = 80

# JPEG quality for preview (can be lower since it's tiny)
PREVIEW_QUALITY = 70

# ── Scene list — edit to match your tour.config.ts ────────────────────────────
# Format: { "scene_id": "relative/path/to/source.jpg" }
SCENES = {
    # Building A — Floor 0
    "a-outside":    "A/outside3.jpg",

    # Building A — Floor 1
    "a1-01":  "A/entrance2.jpg",
    "a1-02":  "A/entrance3.jpg",
    "a1-04":  "A/hoidshat.jpg",
    "a1-05":  "A/urdhongil.jpg",
    "a1-06":  "A/urdhongil2.jpg",
    "a1-07":  "A/urdhongil3.jpg",
    "a1-08":  "A/urdhaalga.jpg",
    "a1-09":  "A/entrance109.jpg",
    "a1-10":  "A/entrance119.jpg",
    "a1-11":  "A/entrance112.jpg",
    "a1-12":  "A/entrance114.jpg",
    "a1-13":  "A/inside114.jpg",
    "a1-14":  "A/114ar.jpg",
    "a1-15":  "A/lab109.jpg",

    # Building A — Floor 2
    "a2-01":  "A2/khoidshat.jpg",
    "a2-02":  "A2/entrance207.jpg",
    "a2-03":  "A2/inside207.jpg",
    "a2-04":  "A2/outside209.jpg",
    "a2-05":  "A2/outside211.jpg",
    "a2-06":  "A2/outside203.jpg",
    "a2-07":  "A2/inside203.jpg",
    "a2-08":  "A2/urdshat.jpg",

    # Building A — Floor 3
    "a3-01":  "A3/a3-01.jpg",
    "a3-02":  "A3/a3-02.jpg",
    "a3-03":  "A3/a3-03.jpg",
    "a3-04":  "A3/a3-04.jpg",
    "a3-05":  "A3/a3-05.jpg",
    "a3-06":  "A3/a3-06.jpg",
    "a3-07":  "A3/a3-07.jpg",
    "a3-09":  "A3/a3-09.jpg",
    "a3-10":  "A3/a3-10.jpg",

    # Building A — Floor 4
    "a4-01":  "A4/a4-01.jpg",
    "a4-02":  "A4/a4-02.jpg",
    "a4-03":  "A4/a4-03.jpg",
    "a4-04":  "A4/a4-04.jpg",
    "a4-05":  "A4/a4-05.jpg",
    "a4-06":  "A4/a4-06.jpg",
    "a4-07":  "A4/a4-07.jpg",
    "a4-08":  "A4/a4-08.jpg",
    "a4-09":  "A4/a4-09.jpg",
    "a4-10":  "A4/a4-10.jpg",

    # Building B
    "b-outside":  "B/outside.jpg",
    "b1-01":      "B/entrance.jpg",
    "b1-02":      "B/entrance-left.jpg",
    "b1-03":      "B/entrance-right.jpg",
    "b1-04":      "B/2ndfloor-left.jpg",
    "b1-05":      "B/2ndfloor-right.jpg",

    # Building C
    "c-outside":  "C/c-outside.jpg",
    "c1-01":      "C/c1-entrance.jpg",
}


# ── Core functions ─────────────────────────────────────────────────────────────

def get_tile_levels(img_width: int, img_height: int):
    """
    Calculate how many zoom levels to generate based on image size.
    PSV tiles adapter works with powers of 2 up to the full resolution.
    Returns list of (level, cols, rows, tile_w, tile_h) tuples.
    """
    levels = []
    # Start from a coarse level and go up to full resolution
    # Level 1 = 2048×1024, Level 2 = 4096×2048, etc.
    base_w = TILE_SIZE * 4   # 2048
    base_h = TILE_SIZE * 2   # 1024

    level = 1
    w, h = base_w, base_h

    while True:
        cols = math.ceil(w / TILE_SIZE)
        rows = math.ceil(h / TILE_SIZE)
        levels.append({
            "level": level,
            "width":  w,
            "height": h,
            "cols":   cols,
            "rows":   rows,
        })
        if w >= img_width and h >= img_height:
            break
        w = min(w * 2, img_width)
        h = min(h * 2, img_height)
        level += 1
        if level > 4:  # cap at 4 levels regardless
            break

    return levels


def generate_tiles(scene_id: str, src_path: Path) -> dict:
    """Generate preview + all tile levels for one scene. Returns config dict."""
    if not src_path.exists():
        print(f"  ⚠️  MISSING: {src_path} — skipping {scene_id}")
        return {}

    print(f"  Processing {scene_id} ({src_path.name})...")

    img = Image.open(src_path).convert("RGB")
    img_w, img_h = img.size

    scene_dir = TILES_DIR / scene_id
    scene_dir.mkdir(parents=True, exist_ok=True)

    # ── Preview image ─────────────────────────────────────────────────────────
    preview_path = scene_dir / "preview.jpg"
    if not preview_path.exists():
        preview = img.resize((PREVIEW_WIDTH, PREVIEW_HEIGHT), Image.LANCZOS)
        preview.save(str(preview_path), "JPEG", quality=PREVIEW_QUALITY, optimize=True)
        print(f"    ✓ preview.jpg ({PREVIEW_WIDTH}×{PREVIEW_HEIGHT})")
    else:
        print(f"    · preview.jpg already exists, skipping")

    # ── Tile levels ───────────────────────────────────────────────────────────
    levels_config = []
    levels = get_tile_levels(img_w, img_h)

    for lvl in levels:
        level     = lvl["level"]
        lw, lh    = lvl["width"], lvl["height"]
        cols, rows = lvl["cols"], lvl["rows"]

        level_dir = scene_dir / str(level)
        level_dir.mkdir(exist_ok=True)

        # Resize source to this level's resolution
        if lw != img_w or lh != img_h:
            resized = img.resize((lw, lh), Image.LANCZOS)
        else:
            resized = img

        tiles_written = 0
        for row in range(rows):
            for col in range(cols):
                tile_path = level_dir / f"{col}_{row}.jpg"
                if tile_path.exists():
                    continue  # skip already generated tiles

                x0 = col * TILE_SIZE
                y0 = row * TILE_SIZE
                x1 = min(x0 + TILE_SIZE, lw)
                y1 = min(y0 + TILE_SIZE, lh)

                tile = resized.crop((x0, y0, x1, y1))
                tile.save(str(tile_path), "JPEG", quality=TILE_QUALITY, optimize=True)
                tiles_written += 1

        print(f"    ✓ Level {level} ({lw}×{lh}) → {cols}×{rows} = {cols*rows} tiles"
              + (f" ({tiles_written} new)" if tiles_written < cols*rows else ""))

        levels_config.append({
            "zoomLvl": level,
            "width":   lw,
            "height":  lh,
            "cols":    cols,
            "rows":    rows,
            "tileSize": TILE_SIZE,
        })

    # Return the config object needed by PSV tiles adapter
    return {
        "id":       scene_id,
        "preview":  f"/tiles/{scene_id}/preview.jpg",
        "levels":   levels_config,
        "baseUrl":  f"/tiles/{scene_id}/",
    }


def generate_all():
    print(f"\n🔄 Generating tiles for {len(SCENES)} scenes...")
    print(f"   Source:  {PANORAMAS_DIR}")
    print(f"   Output:  {TILES_DIR}")
    print(f"   Tile size: {TILE_SIZE}px  Quality: {TILE_QUALITY}\n")

    TILES_DIR.mkdir(parents=True, exist_ok=True)

    configs = {}
    skipped = []

    for scene_id, rel_path in SCENES.items():
        src = PANORAMAS_DIR / rel_path
        cfg = generate_tiles(scene_id, src)
        if cfg:
            configs[scene_id] = cfg
        else:
            skipped.append(scene_id)

    # Write a JSON manifest for reference
    manifest_path = TILES_DIR / "manifest.json"
    with open(str(manifest_path), "w", encoding="utf-8") as f:
        json.dump(configs, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Done!")
    print(f"   {len(configs)} scenes tiled → {TILES_DIR}/")
    print(f"   Manifest written → {manifest_path}")
    if skipped:
        print(f"   ⚠️  {len(skipped)} skipped (missing source): {', '.join(skipped)}")

    print(f"\n📋 Next steps:")
    print(f"   1. Copy the generated tile_config.ts snippet below into your project")
    print(f"   2. Update PanoViewer.tsx to use EquirectangularTilesAdapter")

    # Print TypeScript config snippet
    print(f"\n// ── Paste into src/lib/tile_config.ts ────────────────────────────")
    print(f"export const TILE_CONFIGS: Record<string, object> = {{")
    for scene_id, cfg in configs.items():
        last_level = cfg["levels"][-1]
        print(f'  "{scene_id}": {{')
        print(f'    panorama: {{')
        print(f'      width:   {last_level["width"]},')
        print(f'      cols:    {last_level["cols"]},')
        print(f'      rows:    {last_level["rows"]},')
        print(f'      tileSize: {TILE_SIZE},')
        print(f'      baseUrl: "/tiles/{scene_id}/",')
        print(f'      levels: [')
        for lvl in cfg["levels"][:-1]:  # all except the last (last is default)
            print(f'        {{ zoomLvl: {lvl["zoomLvl"]}, width: {lvl["width"]}, cols: {lvl["cols"]}, rows: {lvl["rows"]} }},')
        print(f'      ],')
        print(f'    }},')
        print(f'    panoData: {{ fullWidth: {last_level["width"]}, fullHeight: {last_level["height"]} }},')
        print(f'    preview: "/tiles/{scene_id}/preview.jpg",')
        print(f'  }},')
    print(f"}};")


if __name__ == "__main__":
    generate_all()