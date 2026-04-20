# МТЭС 360° Виртуал Аялал

Next.js 14 + Photo Sphere Viewer дээр суурилсан их сургуулийн 360° виртуал аялал.

## Суулгах

```bash
npm install
npm run dev
```

## Панорама зургуудыг байрлуулах

Зургуудаа дараах замд `.jpg` форматаар байрлуул:

```
public/
└── panoramas/
    ├── A/
    │   ├── a-outside.jpg
    │   ├── a1-01.jpg   ← Building A, Floor 1, Scene 01
    │   ├── a1-02.jpg
    │   │   ... (a1-01 → a1-10)
    │   ├── a2-01.jpg   ← Building A, Floor 2
    │   │   ... (a2-01 → a2-10)
    │   ├── a3-01.jpg   ← Building A, Floor 3
    │   │   ... (a3-01 → a3-10)
    │   └── a4-01.jpg   ← Building A, Floor 4
    │       ... (a4-01 → a4-10)
    ├── B/
    │   ├── b-outside.jpg
    │   ├── b1-01.jpg   ← Building B, Floor 1 (4 scenes)
    │   ├── b1-02.jpg
    │   ├── b1-03.jpg
    │   ├── b1-04.jpg
    │   ├── b2-01.jpg   ← Building B, Floor 2 (4 scenes)
    │   ├── b2-02.jpg
    │   ├── b2-03.jpg
    │   └── b2-04.jpg
    └── C/
        ├── c-outside.jpg
        └── c1-entrance.jpg
```

## Барилгын thumbnail зургууд

```
public/
└── images/
    ├── buildings/
    │   ├── a-thumb.jpg
    │   ├── b-thumb.jpg
    │   └── c-thumb.jpg
    ├── maps/
    │   ├── a-floor1.png  (floor plan, optional)
    │   ├── a-floor2.png
    │   ├── a-floor3.png
    │   ├── a-floor4.png
    │   ├── b-floor1.png
    │   ├── b-floor2.png
    │   └── c-floor1.png
    └── num-logo.png      ← МУИС лого (navbar, footer)
```

## Hotspot байрлалыг тохируулах

`src/lib/tour.config.ts` дотор хотспот бүрийн `yaw` (хэвтээ өнцөг) болон
`pitch` (босоо өнцөг) утгыг зургийнхаа дагуу тохируул.

- `yaw: 0`   = дэлгэцийн голд (шууд урд)
- `yaw: 90`  = баруун тийш
- `yaw: -90` = зүүн тийш
- `yaw: 180` = ард

## Байршуулах (Vercel)

```bash
npx vercel --prod
```

## Технологийн стек

- **Next.js 14** — App Router
- **@photo-sphere-viewer/core v5** — 360° panorama renderer
- **@photo-sphere-viewer/markers-plugin** — nav & info hotspots
- **Framer Motion** — UI animations
- **Tailwind CSS** — styling
- **TypeScript** — type safety
