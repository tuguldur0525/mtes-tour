# МТЭС 360° VR Tour — Next.js

**Бакалаврын дипломын ажил | Мультимедиа Технологи | МТЭС — МУИС | 2026**

## Суулгах

```bash
npm install
npm run dev
```

## Зургийн файл нэмэх

`/public/images/tour/` хавтаст зургийн файлуудыг байрлуулна:

- Нэрлэх дүрэм: `a1-entrance.jpg` (barилга-давхар-байрлал)
- Хэмжээ: 8K эх → web 4K (4096×2048px), JPEG 85% чанар
- Нэг файл: 5-8MB-аас ихгүй

## Аялал эхлэх ба campus drone view

Баруун дээд буланд байрлах "Аялал Эхлүүлэх" товч дарахад одоо аялал эхлээд нэгэн нийтлэг
кэмпусийн drone дүрс гарч ирнэ. Энэ дүрс дээрээс та дээд талбарын табуудыг ашиглан A, B эсвэл C
барилгыг сонгож аялалыг үргэлжлүүлнэ.

## Tour тохиргоо шинэчлэх

`/lib/tour.config.ts` файлд Scene, Hotspot нэмж болно.

## Deploy

```bash
vercel --prod
```

## Tech Stack

- Next.js 14 (App Router)
- @photo-sphere-viewer/core v5
- Tailwind CSS
- Framer Motion
- TypeScript
- Vercel
