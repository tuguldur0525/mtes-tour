# МТЭС 360° Виртуал Аялал

<div align="center">

![МТЭС Virtual Tour](public/images/og-image.jpg)

**Монгол Улсын Их Сургуулийн Мэдээллийн Технологи, Электроникийн Сургуулийн**  
**360° панорама виртуал аялал**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mtes--tour.vercel.app-2E75B6?style=for-the-badge&logo=vercel)](https://mtes-tour.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## Товчхон

МТЭС-ийн 2 барилгын 6 давхрын 53+ байрлалыг 360° панорама зургаар аялах боломжтой вэб аппликейшн. Дотоод орчин, лаборатори, лекцийн танхимуудтай хүссэн газраасаа танилцаарай.

## Функцүүд

- **360° Панорама** — Photo Sphere Viewer v5 дээр суурилсан, WebGL renderer
- **3 барилга, 7 давхар** — Барилга А (4 давхар), Барилга Б (2 давхар), Барилга В (1 давхар)
- **Навигаци хотспот** — Байрлалуудын хооронд шилжих сумны тэмдэгүүд
- **Мэдээллийн самбар** — Өрөө тус бүрийн нэр, код, багтаамж, тоног төхөөрөмжийн мэдээлэл
- **Tiny Planet эффект** — Гадна байрлалд орохдоо tiny planet→ нормал харагдалт руу шилжих анимаци
- **Гироскоп** — Гар утасны хөдөлгүүр мэдрэгчээр эргэн тойрноо харах (iOS + Android)
- **VR горим** — Google Cardboard дэмжлэгтэй stereoscopic горим
- **Автомат эргэлт** — Идэвхгүй үед панорама аяндаа эргэдэг
- **Давхрын зураглал** — Floor plan minimap харах боломжтой
- **Хуваалцах** — Тодорхой байрлалд шууд очих URL хуулах
- **Аялалын явц** — Давхар тус бүрт хэдэн байрлал үзсэнийг харуулах progress bar
- **Заавар цонх** — Хэрхэн ашиглах тусламжийн цонх
- **Mobile-first дизайн** — Bottom sheet scene selector, compact HUD
- **SEO** — JSON-LD structured data, Open Graph, sitemap, robots.txt

## Технологийн стек

| Технологи                                                                         | Хувилбар | Зориулалт                           |
| --------------------------------------------------------------------------------- | -------- | ----------------------------------- |
| [Next.js](https://nextjs.org)                                                     | 14       | App Router, SSG, image optimization |
| [TypeScript](https://typescriptlang.org)                                          | 5        | Type safety                         |
| [Photo Sphere Viewer](https://photo-sphere-viewer.js.org)                         | 5        | 360° WebGL renderer                 |
| [PSV Markers Plugin](https://photo-sphere-viewer.js.org/plugins/markers.html)     | 5        | Hotspot markers                     |
| [PSV Gyroscope Plugin](https://photo-sphere-viewer.js.org/plugins/gyroscope.html) | 5        | Mobile gyroscope                    |
| [Framer Motion](https://www.framer.com/motion)                                    | 11       | UI animations                       |
| [Tailwind CSS](https://tailwindcss.com)                                           | 3        | Styling                             |
| [Lucide React](https://lucide.dev)                                                | latest   | Icons                               |
| [Vercel](https://vercel.com)                                                      | —        | Hosting & CDN                       |

## Эхлүүлэх

### Шаардлага

- Node.js 18+
- npm 9+

### Суулгах

```bash
# Repository-г clone хийх
git clone https://github.com/your-username/mtes-tour.git
cd mtes-tour

# Dependency суулгах
npm install

# Development server ажиллуулах
npm run dev
```

Браузерт [http://localhost:3000](http://localhost:3000) хаягаар нээнэ.

### Build

```bash
npm run build    # Production build
npm run start    # Production server ажиллуулах
npm run lint     # ESLint шалгах
```

## Төслийн бүтэц

```
mtes-tour/
├── public/
│   ├── panoramas/              # 360° зургууд
│   │   ├── A/                  # Барилга А
│   │   │   ├── outside.jpg     # Гадна
│   │   │   ├── entrance.jpg    # Үүдний танхим
│   │   │   ├── a1-02.jpg       # 1-р давхар, 2-р байрлал
│   │   │   └── ...
│   │   ├── B/                  # Барилга Б
│   │   └── C/                  # Барилга В
│   ├── images/
│   │   ├── buildings/          # Барилгын thumbnail зургууд
│   │   ├── maps/               # Давхрын floor plan зургууд
│   │   ├── num-logo.png        # МУИС лого
│   │   └── og-image.jpg        # Social share preview (1200×630px)
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, metadata, JSON-LD
│   │   ├── page.tsx            # Нүүр хуудас
│   │   ├── globals.css         # Global styles, PSV overrides
│   │   ├── not-found.tsx       # 404 хуудас
│   │   ├── robots.ts           # robots.txt
│   │   ├── sitemap.ts          # sitemap.xml
│   │   ├── tour/
│   │   │   └── page.tsx        # 360° аялалын үндсэн хуудас
│   │   ├── about/
│   │   │   └── page.tsx        # Сургуулийн тухай
│   │   └── contact/
│   │       └── page.tsx        # Холбоо барих
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Навигаци
│   │   │   └── Footer.tsx      # Footer
│   │   └── tour/
│   │       ├── PanoViewer.tsx  # PSV wrapper, image cache, gyroscope
│   │       ├── BuildingTabs.tsx # Барилга сонгох tab
│   │       ├── FloorSelector.tsx # Давхар сонгох + minimap
│   │       ├── SceneList.tsx   # Байрлалуудын жагсаалт
│   │       ├── TourHUD.tsx     # HUD bar (заавар, VR, share, progress)
│   │       ├── InfoModal.tsx   # Өрөөний мэдээллийн modal
│   │       └── LoadingOverlay.tsx # Ачаалах дэлгэц
│   │
│   ├── lib/
│   │   ├── tour.config.ts      # Барилга, давхар, байрлалуудын тохиргоо
│   │   └── utils.ts            # cn(), buildTourUrl()
│   │
│   └── types/
│       └── tour.ts             # TypeScript interface-үүд
│
├── vercel.json                 # CDN cache headers
├── next.config.mjs             # Next.js тохиргоо
├── tailwind.config.ts          # Tailwind тохиргоо
└── tsconfig.json
```

## Панорама зургийн тохиргоо

### Зургийн байршил

360° панорама зургуудаа дараах замд `.jpg` форматаар байршуул:

```
public/panoramas/{BarilgaId}/{SceneId}.jpg
```

**Жишээ:**

```
public/panoramas/A/outside.jpg        ← Барилга А гадна
public/panoramas/A/entrance.jpg       ← Үүдний танхим
public/panoramas/A/a1-02.jpg          ← 1-р давхар, 2-р байрлал
public/panoramas/B/b-outside.jpg      ← Барилга Б гадна
public/panoramas/C/c1-entrance.jpg    ← Барилга В үүд
```

### Зургийн шаардлага

| Параметр      | Утга                                               |
| ------------- | -------------------------------------------------- |
| Формат        | JPEG (`.jpg`)                                      |
| Хэмжээ        | 4096×2048px (оновчтой)                             |
| Файлын хэмжээ | ~1–2.5MB (хэт том бол squoosh.app-аар багасгана)   |
| Проекц        | Equirectangular (360° камераас гарах стандарт)     |
| Тохиргоо      | `tour.config.ts`-д `panoramaUrl` талбарт зааж өгнө |

### Зургийг багасгах

[squoosh.app](https://squoosh.app) ашиглан JPEG 75–80% чанараар хадгалахад файлын хэмжээ мэдэгдэхүйц буурна, харагдах чанар өөрчлөгдөхгүй.

## Байрлал нэмэх / өөрчлөх

`src/lib/tour.config.ts` файлд бүх барилга, давхар, байрлал, hotspot тохируулагдана.

### Шинэ байрлал нэмэх

```typescript
{
  id: "a1-11",                          // Өвөрмөц ID
  label: "Компьютерийн анги 105",       // SceneList-д харагдах нэр
  panoramaUrl: "/panoramas/A/a1-11.jpg", // Зургийн зам
  description: "Дасгалын анги",         // HUD-д харагдах
  defaultYaw: -30,                       // Камерын эхлэх чиглэл (градус)
  defaultPitch: -10,                     // Камерын босоо өнцөг
  defaultZoom: 50,                       // Zoom түвшин (0–100)
  tinyPlanet: false,                     // true = гадна байрлалд tiny planet эффект
  hotspots: [
    {
      id: "nav-to-corridor",
      type: "nav",
      targetSceneId: "a1-07",            // Очих байрлалын ID
      label: "Коридор",
      yaw: 180,                          // Сумны чиглэл (градус)
      pitch: -5,
    }
  ],
  infoHotspots: [
    {
      id: "info-room-105",
      type: "info",
      yaw: 45,
      pitch: 0,
      title: "Компьютерийн анги 105",
      description: "32 компьютертэй дасгалын анги.",
      details: {
        roomCode: "A-105",
        capacity: 32,
        department: "МКУТ",
        equipment: ["Компьютер 32ш", "Проектор", "Самбар"],
      }
    }
  ]
}
```

### Hotspot байрлал олох

`defaultYaw` болон `yaw` утгыг тохируулахдаа:

- `0°` = камер харж байгаа урд тийш
- `90°` = баруун тийш
- `-90°` = зүүн тийш
- `180°` = ард тийш
- `pitch: -10` = харцыг бага зэрэг доош хандуулна

Байршлыг туршиж тааруулахдаа PSV-ийн navbar дахь координатыг харна.

## URL бүтэц

```
/tour?building=A&floor=1&scene=a1-01
       ↑           ↑        ↑
   Барилга ID  Давхрын ID  Байрлалын ID
```

Тодорхой байрлалд шууд очих URL-г **Хуваалцах** товчоор хуулж авна.

## Байршуулах

### Vercel (Санал болгох)

```bash
# Vercel CLI суулгах
npm i -g vercel

# Байршуулах
vercel --prod
```

Эсвэл GitHub repository-г Vercel-тэй холбоод автомат deploy хийлгэнэ.

### Орчны хувьсагч

Одоогоор `.env` шаардахгүй. Бүх тохиргоо `tour.config.ts`-д байна.

## SEO

- **JSON-LD** structured data — Google-д байгууллагын мэдээлэл дамжуулна
- **Open Graph** — Нийгмийн мэдээллийн хэрэгслүүдэд preview зураг харуулна
- **Sitemap** — `/sitemap.xml` автоматаар үүснэ
- **Robots** — `/robots.txt` автоматаар үүснэ
- **Canonical URL** — Давхар контент арилгана

**Google Search Console-д бүртгүүлэх:**

1. [search.google.com/search-console](https://search.google.com/search-console) нэвтрэх
2. Сайтаа нэмж verification хийх
3. `https://mtes-tour.vercel.app/sitemap.xml` илгээх

## Гүйцэтгэл

- **Image cache** — Blob URL + `HTMLImageElement.decode()` ашиглан зургийг GPU-д урьдчилан ачаална
- **Neighbour preload** — Идэвхтэй байрлалын хажуугийн бүх байрлалыг дараагийн навигацид бэлдэн ачаална
- **Vercel CDN** — `vercel.json` дахь cache header-үүдээр панорама зургуудыг 1 жил CDN-д хадгална
- **Crossfade transition** — 400ms fade, spinner харагдахгүй

## Хөгжүүлэгч

**Мультимедиа Технологи — МТЭС, МУИС**  
Т. Төгөлдөр · Бакалаврын дипломын ажил · 2026

## Лиценз

© 2026 МУИС — МТЭС. Бүх эрх хуулиар хамгаалагдсан.
