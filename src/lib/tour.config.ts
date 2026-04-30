/**
 * lib/tour.config.ts
 * University Campus 360° Virtual Tour Configuration
 * IMAGE PATH CONVENTION:
 *   /panoramas/{buildingId}/{sceneId}.jpg
 */

import type { TourConfig, TourBuilding } from "@/types/tour";
import { nav } from "framer-motion/client";

// ─────────────────────────────────────────────
//  Helper — build a nav hotspot pointing to
//  another scene in the SAME floor
// ─────────────────────────────────────────────
function navHotspot(
  id: string,
  targetSceneId: string,
  label: string,
  yaw: number,
  pitch: number = -5,
) {
  return { id, type: "nav" as const, targetSceneId, label, yaw, pitch };
}

// ─────────────────────────────────────────────
//  Building A — Main Academic Building
//  4 floors × 10 scenes each, starts outside
// ─────────────────────────────────────────────
const BUILDING_A: TourBuilding = {
  id: "A",
  name: "МУИС 7-р байр",
  description:
    "Монгол улсын их сургуулийн 7-р байр буюу Мэдээллийн технологи, электроникийн сургууль.",
  thumbnailUrl: "/images/buildings/thumb-building-a.jpg",
  floors: [
    // ── Floor 0 (Outside) ────
    {
      id: 0,
      label: "Гадна талбай",
      defaultSceneId: "a-outside",
      mapImageUrl: "/images/buildings/thumb-building-a.jpg",
      scenes: [
        {
          id: "a-outside",
          label: "МТЭС гадна талбай",
          panoramaUrl: "/panoramas/A/outside3.jpg",
          description: "Мэдээллийн технологи, электроникийн сургуулийн гадна талбайн харагдах байдал",
          //tinyPlanet: true,
          defaultZoom: 60,
          tinyPlanet: true,
          hotspots: [
            navHotspot("nav-a-entrance", "a1-01", "Орох",17, 0, ),
          ],
          infoHotspots: [
            {
              id: "info-a-outside",
              type: "info",
              yaw: 40,
              pitch: 0,
              title: "Сургуулийн гадна талбай",
              description: "Монгол улсын их сургуулийн 7-р байр болох Мэдээллийн технологи, электроникийн сургуулийн гадна талбай",
              details: {roomCode: "A-Outside"},

            }
          ]
        },
      ],
    },

    // ── Floor 1 ──────────────────────────────
    {
      id: 1,
      label: "1-р давхар",
      defaultSceneId: "a1-01",
      mapImageUrl: "/images/maps/a-floor1.png",
      scenes: [
        {
          id: "a1-01",
          label: "Үүдний танхим",
          panoramaUrl: "/panoramas/A/entrance2.jpg",
          description: "1-р давхрын үүдний танхим",
          hotspots: [
            navHotspot("a-outside", "a-outside", "Гарах",180  ),
            navHotspot("nav-a1-01", "a1-02", "Урагшлах", 0, -18),
          ],
          infoHotspots: [
            {
              id: "info-a1-lobby",
              type: "info",
              yaw: 30,
              pitch: -10,
              title: "Үүдний танхим",
              description: "Монгол улсын их сургуулийн 7-р байр болох Мэдээллийн технологи, электроникийн сургуулийн үүдний танхим. .",
              details: { roomCode: "A-LOBBY", department: "МТЭС" },
            },
          ],
        },
        {
          id: "a1-02",
          label: "Гол уулзвар",
          panoramaUrl: "/panoramas/A/entrance3.jpg",
          description: "",
          defaultYaw: 35,
          defaultZoom:10,
          hotspots: [
            navHotspot("nav-a1-01", "a1-01", "Үүдэнд буцах", -130, -16),
            navHotspot("nav-a1-04", "a1-04", "2 давхарт гарах", -25,-10),
            navHotspot("nav-a1-03", "a1-09", "Урагш явах", 35, -10),
            navHotspot("nav-a1-02", "a1-05", "Урд хонгил", 140, -6),
          ],
          infoHotspots: [
            {
              id: "info-a1-02",
              type: "info",
              yaw: -100,
              pitch: 0,
              title: "Үүдний танхим",
              description: "МУИС-ын 7-р байр болох Мэдээллийн технологи, электроникийн сургуулийн үүдний танхим.",
              details: { roomCode: "Main hall", department: "МТЭС" },
            }
          ]
        },
        {
          id: "a1-05",
          label: "Урд коридор",
          panoramaUrl: "/panoramas/A/urdhongil.jpg",
          description: "Оюутны мэдээлэл, лавлагааны тоо",
          defaultYaw: 175,
          defaultZoom: 40,
          hotspots: [
            navHotspot("nav-a1-01b", "a1-06", "Урагш явах", 180),
            navHotspot("nav-a1-02b", "a1-02", "Буцах", 0, -10),
          ],
          infoHotspots: [
            {
              id: "info-a1-info",
              type: "info",
              yaw: 0,
              pitch: 5,
              title: "Мэдээллийн тоо",
              description: "Оюутны асуулт, бүртгэлийн мэдээлэл авах газар.",
              details: { roomCode: "A101-INFO", department: "Захиргаа" },
            },
          ],
        },
        {
          id: "a1-04",
          label: "Хойд шат",
          panoramaUrl: "/panoramas/A/hoidshat.jpg",
          description: "1-р давхрын хойд шат",
          hotspots: [
            navHotspot("nav-a1-02b", "a1-02", "Буцах", 80),
            navHotspot("nav-a1-05", "a2-01", "2 давхарт гарах", 0),
          ],
        },
        {
          id: "a1-06",
          label: "Урд хонгил",
          panoramaUrl: "/panoramas/A/urdhongil2.jpg",
          description: "1-р давхрын шатны хонгил",
          defaultYaw: 160,
          hotspots: [
            navHotspot("nav-a1-05b", "a1-05", "Буцах", -25),
            navHotspot("nav-a1-07", "a1-07", "Урагшлах", 155),
          ],
        },
        {
          id: "a1-07",
          label: "Урд хонгил",
          panoramaUrl: "/panoramas/A/urdhongil3.jpg",
          description: "1-р давхрын урд коридор",
          defaultYaw: 0, 
          hotspots: [
            navHotspot("nav-a1-06b", "a1-06", "Буцах", 175),
            navHotspot("nav-a1-08", "a1-08", "Урд хаалга", 0),
          ],
        },
        {
          id: "a1-08",
          label: "Урд хаалга",
          panoramaUrl: "/panoramas/A/urdhaalga.jpg",
          description: "Сургууль руу орж гарах 2 дахь хаалга",
          hotspots: [
            navHotspot("nav-a1-07a", "a1-07", "Буцах", -90),
            navHotspot("nav-a1-09", "a-outside", "Гарах", 0),  //garah haalga solih
            navHotspot("nav-a1-07b", "a2-08", "2 давхарт гарах", 180),
          ],
        },
        {
          id: "a1-09",
          label: "109-р анги",
          panoramaUrl: "/panoramas/A/entrance109.jpg",   
          description: "109-р анги хаалганы гадна",
          defaultYaw: 180,
          hotspots: [
            navHotspot("nav-a1-08b", "a1-02", "Буцах", 0),
            navHotspot("nav-a1-10", "a1-10", "Зүүн хонгил", 180),
            navHotspot("nav-a1-09b", "a1-15", "109-р анги руу орох", -110),
            
          ],
        },
        {
          id: "a1-10",
          label: "Зүүн хонгил 119-р анги",
          panoramaUrl: "/panoramas/A/entrance119.jpg",
          description: "1-р давхрын кафетери",
          hotspots: [
            navHotspot("nav-a1-09b", "a1-09", "Буцах", 0),
            navHotspot("nav-a1-08b", "a1-11", "Зүүн булан", -175),

          ],
        },
        {
          id: "a1-11",
          label: "Зүүн хонгил 112-р анги",
          panoramaUrl: "/panoramas/A/entrance112.jpg",
          description: "1-р давхрын кафетери",
          defaultYaw: 0,
          hotspots: [
            navHotspot("nav-a1-09b", "a1-09", "Буцах", 180),
            navHotspot("nav-a1-08b", "a1-12", "Зүүн булан", 0),
          ],
        },
        {
          id: "a1-12",
          label: "Зүүн хонгил 114-р анги",
          panoramaUrl: "/panoramas/A/entrance114.jpg",
          description: "Лекцийн танхим 114-р анги руу орох хаалганы гадна",
          defaultYaw: 60,
          hotspots: [
            navHotspot("nav-a1-09b", "a1-11", "Буцах", -110),
            navHotspot("nav-a1-08b", "a1-13", "114-р анги", 70),

          ],
        },
        {
          id: "a1-13",
          label: "114-р анги дотор",
          panoramaUrl: "/panoramas/A/inside114.jpg",
          description: "1-р давхрын лекцийн танхим 114-р анги дотор",
          defaultYaw: 0,
          defaultZoom: 10,
          hotspots: [
            navHotspot("nav-a1-09b", "a1-12", "Буцах", 93),
            navHotspot("nav-a1-08b", "a1-14", "Араас харах", 0),
          ],
          infoHotspots: [
            {
              id: "info-a1-114",
              type: "info",
              yaw: 55,
              pitch: 0,
              title: "Лекцийн танхим 114-р анги",
              description: "1-р давхрын лекцийн танхим 114-р анги дотор",
              details: { roomCode: "A-114", capacity: 120, equipment: ["Проектор"] },
            },
          ],
        },
        {
          id: "a1-14",
          label: "114 ангийн арын хэсэг",
          panoramaUrl: "/panoramas/A/114ar.jpg",
          description: "1-р давхрын кафетери",
          defaultYaw: 10,
          defaultPitch: -10,
          hotspots: [
            navHotspot("nav-a1-09b", "a1-13", "Гарах", 10,-25),
          ],
          infoHotspots: [
            {
              id: "info-a1-114ar",
              type: "info",
              yaw: 30,
              pitch: 0,
              title: "Лекцийн танхим 114-р анги",
              description: "1-р давхрын лекцийн танхим 114-р анги дотор",
              details: { roomCode: "A-114", capacity: 120, equipment: ["Проектор"] },
            },
          ],

        },
        {
          id: "a1-15",
          label: "109-р лаборатори",
          panoramaUrl: "/panoramas/A/lab109.jpg",
          description: "Мультимедиа лаборатори 109-р анги дотор ",
          defaultZoom:20,
          defaultYaw: 20,
          hotspots: [
            navHotspot("nav-a1-09b", "a1-09", "Гарах", -130, -5),

          ],
          infoHotspots: [
            {
              id: "info-a1-lab109",
              type: "info",
              yaw: 40,
              pitch: 0,
              title: "Мультимедиа лаборатори",
              description: "Мультимедиа лаборатори 109-р анги дотор .",
              details: { roomCode: "LAB109", capacity: 25 , equipment: ["Компьютер 25ш", "Ухаалаг зурагт"] },
            },
          ],
        },
      ],
    },

    // ── Floor 2 ──────────────────────────────
    {
      id: 2,
      label: "2-р давхар",
      defaultSceneId: "a2-01",
      mapImageUrl: "/images/maps/a-floor2.png",
      scenes: [
        {
          id: "a2-01",
          label: "2 давхар хойд шат",
          panoramaUrl: "/panoramas/A2/khoidshat.jpg",
          description: "2-р давхарт гарсан шатны буудал",
          defaultYaw: 150,
          defaultZoom: 0,
          
          hotspots: [
            navHotspot("nav-a2-01a", "a1-04", "Буцах", 80, -20),
            navHotspot("nav-a1-04b", "a3-01", "3-р давхар руу гарах", 95, 5),
            navHotspot("nav-a2-02", "a2-02", "Коридор", 180),
          ],
        },
        {
          id: "a2-02",
          label: "2-р давхрын коридор",
          panoramaUrl: "/panoramas/A2/entrance207.jpg",
          description: "2-р давхрын голч коридор",
          defaultYaw: -160,
          hotspots: [
            navHotspot("nav-a2-01", "a2-01", "Буцах", 110),
            navHotspot("nav-a2-03", "a2-03", "207-р анги", 180),
            navHotspot("nav-a2-07", "a2-04", "Урагш явах", -75),
          ],
        },
        {
          id: "a2-03",
          label: "207-р анги",
          panoramaUrl: "/panoramas/A2/inside207.jpg",
          description: "Лекцийн танхим — 201",
          defaultYaw: 0,
          hotspots: [navHotspot("nav-a2-02b", "a2-02", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a2-207",
              type: "info",
              yaw: 40,
              pitch: 0,
              title: "Лекцийн танхим 207",
              description: "Их сургуулийн үндсэн лекцийн танхимуудын нэг.",
              details: { roomCode: "A-207", capacity: 100, equipment: ["Проектор", "Чанга яригч"] },
            },
          ],
        },
        {
          id: "a2-04",
          label: "209-р ангийн гадаа",
          panoramaUrl: "/panoramas/A2/outside209.jpg",
          description: "Лекцийн танхим — 209",
          defaultYaw: 180,
          hotspots: [
            navHotspot("nav-a2-02c", "a2-02", "Буцах", 0),
            navHotspot("nav-a2-04b", "a2-05", "Урагш явах", 180),
          ],
        },
        {
          id: "a2-05",
          label: "211-р ангийн гадаа",
          panoramaUrl: "/panoramas/A2/outside211.jpg",
          description: "Семинарын танхим — 211",
          hotspots: [
            navHotspot("nav-a2-04b", "a2-04", "Буцах", 0),
            navHotspot("nav-a2-05b", "a2-06", "Урагш явах", 180),
          ],

        },
        {
          id: "a2-06",
          label: "203-р анги",
          panoramaUrl: "/panoramas/A2/outside203.jpg",
          description: "Семинарын танхим — 203",
          hotspots: [
            navHotspot("nav-a2-05b", "a2-05", "Буцах", 0),
            navHotspot("nav-a2-06a", "a2-07", "203-руу орох", -90),
            navHotspot("nav-a2-06b", "a2-08", "Урагш явах", -175),
          ],
        },
        {
          id: "a2-07",
          label: "203 Сургалтын албаны өрөө",
          panoramaUrl: "/panoramas/A2/inside203.jpg",
          description: "203-р ангийн дотор тал",
          hotspots: [navHotspot("nav-a2-02d", "a2-06", "Буцах", -100)],

          infoHotspots: [
            {
              id: "info-a2-lib",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Сургалтын алба",
              description: "МТЭС-ийн сургалтын алба.",
              details: { roomCode: "A-203"},
            },
          ],
        },
        {
          id: "a2-08",
          label: "Урд шат",
          panoramaUrl: "/panoramas/A2/urdshat.jpg",
          description: "2-р давхрын урд шат",
          hotspots: [
            navHotspot("nav-a2-07b", "a2-06", "Буцах", 0),
            navHotspot("nav-a2-08a", "a1-08", "1-р давхар руу буух", -100, -20), 
            navHotspot("nav-a2-08b", "a3-10", "3-р давхарт гарах", -80),
          ],

          defaultZoom: 0,
          defaultYaw: -40,
        },
      ],
    },

    // ── Floor 3 ──────────────────────────────
    {
      id: 3,
      label: "3-р давхар",
      defaultSceneId: "a3-01",
      mapImageUrl: "/images/maps/a-floor3.png",
      scenes: [
        {
          id: "a3-01",
          label: "3-р давхар хойд шат",
          panoramaUrl: "/panoramas/A3/a3-01.jpg",
          description: "3-р давхарт гарсан шатны буудал",
          defaultYaw: -120,
          defaultZoom: 0,
          hotspots: [
            navHotspot("nav-a3-12", "a2-01", "2-р давхар руу буух", 180, -20),
            navHotspot("nav-a3-13", "a4-01", "4-р давхарт гарах", -160, 8),
            navHotspot("nav-a3-14", "a3-02", "304-р анги", 0),
            navHotspot("nav-a3-15", "a3-04", "Коридор", -80)

          ],
        },
        {
          id: "a3-02",
          label: "304-р анги",
          panoramaUrl: "/panoramas/A3/a3-02.jpg",
          description: "304-р анги дотор",
          defaultYaw: 30,
          hotspots: [
            navHotspot("nav-a3-01", "a3-01", "Буцах", -90),
          ],
          infoHotspots: [
            {
              id: "info-a3-304",
              type: "info",
              yaw: 70,
              pitch: 0,
              title: "304-р лабораторийн ",
              description: "304 лабораторийн анги дотор",
              details: { roomCode: "A-304", capacity: 30, equipment: ["Компьютер 30ш", "Проектор"] },
            },
          ],
        },
        {
          id: "a3-04",
          label: "Коридор",
          panoramaUrl: "/panoramas/A3/a3-04.jpg",
          description: "Коридор",
          defaultYaw: 20, 
          hotspots: [navHotspot("nav-a3-02b", "a3-01", "Буцах", 180),
              navHotspot("nav-a3-03b", "a3-03", "303-р анги", 90),
              navHotspot("nav-a3-03d", "a3-06", "Коридор", 0),
          ],
          
        },
        {
          id: "a3-03",
          label: "303-р анги",
          panoramaUrl: "/panoramas/A3/a3-03.jpg",
          description: "303 лабораторийн анги дотор",
          defaultYaw: 180,
          hotspots: [
            navHotspot("nav-a3-03b", "a3-04", "Буцах", 60),
            
          ],
          infoHotspots: [
            {
              id: "info-a3-302",
              type: "info",
              yaw: -120,
              pitch: 0,
              title: "303 лабораторийн анги",
              description: "303 лабораторийн анги дотор",
              details: { roomCode: "A-303", capacity: 35, equipment: ["Компьютер 10ш", "Проектор"] },
            },
          ],
        },
        {
          id: "a3-05",
          label: "302-р анги",
          panoramaUrl: "/panoramas/A3/a3-05.jpg",
          description: "Компьютерийн лаборатори 302",
          defaultYaw: 0,
          defaultZoom: 20,
          hotspots: [navHotspot("nav-a3-04b", "a3-06", "Буцах", -90)],
          infoHotspots: [
            {
              id: "info-a3-lab3a",
              type: "info",
              yaw: 45,
              pitch: 0,
              title: "Компьютерийн лаборатори 3А",
              description: "Өндөр гүйцэтгэлтэй компьютер бүхий лаборатори.",
              details: { roomCode: "A-302", capacity: 25, equipment: ["Компьютер 30ш", "Проектор"] },
            },
          ],
        },
        {
          id: "a3-06",
          label: "Коридор",
          panoramaUrl: "/panoramas/A3/a3-06.jpg",
          description: "3-р давхрын коридор",
          defaultYaw: 180,
          hotspots: [navHotspot("nav-a3-05b", "a3-04", "Буцах", 0),
            navHotspot("nav-a3-05p", "a3-07", "Коридор", 180),
            navHotspot("nav-a3-05l", "a3-05", "302-р анги", -90),
          ],
          
        },
        {
          id: "a3-07",
          label: "Коридор",
          panoramaUrl: "/panoramas/A3/a3-07.jpg",
          description: "3-р давхрын коридор",
          hotspots: [
            navHotspot("nav-a3-06b", "a3-10", "3-р давхарын урд шат", 180),
          navHotspot("nav-a3-06g", "a3-09", "301-р анги", -90),
        navHotspot("nav-a3-06r", "a3-06", "Буцах", 0)],

        },
        {
          id: "a3-09",
          label: "301-р анги",
          panoramaUrl: "/panoramas/A3/a3-09.jpg",
          description: "301-р анги дотор",
          hotspots: [navHotspot("nav-a3-08b", "a3-07", "Буцах", -90)],
          infoHotspots: [
            {
              id: "info-a3-conf",
              type: "info",
              yaw: 30,
              pitch: 0,
              title: "301 лабораторийн анги",
              description: "301 лабораторийн анги дотор",
              details: { roomCode: "A-301", capacity: 20, equipment: ["Компьютер 20ш", "Проектор"] },
            },
          ],
        },
        {
          id: "a3-10",
          label: "3-р давхрын урд шат",
          panoramaUrl: "/panoramas/A3/a3-10.jpg",
          description: "3-р давхрын урд шатн",
          hotspots: [navHotspot("nav-a3-09b", "a3-07", "Буцах", 0),
            navHotspot("nav-a3-10a", "a2-08", "2-р давхар руу буух", -100, -20),
            navHotspot("nav-a3-10b", "a4-10", "4-р давхарт гарах", -85, 8),
          ],
        },
      ],
    },

    // ── Floor 4 ──────────────────────────────
    {
      id: 4,
      label: "4-р давхар ",
      defaultSceneId: "a4-01",
      mapImageUrl: "/images/maps/a-floor4.png",
      scenes: [
        {
          id: "a4-01",
          label: "4-р давхар хойд шат",
          panoramaUrl: "/panoramas/A4/a4-01.jpg",
          description: "4-р давхарын хойд шат",
          defaultYaw: -40,
          defaultPitch: -10,
          defaultZoom: 0,
          hotspots: [navHotspot("nav-a4-02", "a4-02", "Коридор", 0),
            navHotspot("nav-a4-03", "a3-01", "3-р давхарт буух", -100, -20),
          ],
        },
        {
          id: "a4-02",
          label: "4-р давхрын коридор",
          panoramaUrl: "/panoramas/A4/a4-02.jpg",
          description: "4-р давхрын голч коридор",
          hotspots: [
            navHotspot("nav-a4-01", "a4-01", "Буцах", 175),
            navHotspot("nav-a4-03", "a4-04", "Коридор", -5),
            navHotspot("nav-a4-06", "a4-03", "403-р анги", 60),
          ],
        },
        {
          id: "a4-03",
          label: "403-р анги",
          panoramaUrl: "/panoramas/A4/a4-03.jpg",
          description: "403-р анги дотор",
          hotspots: [navHotspot("nav-a4-02b", "a4-02", "Буцах", -70)],
          infoHotspots: [
            {
              id: "info-a4-403",
              type: "info",
              yaw: 20,
              pitch: 0,
              title: "Лабораторийн анги 403",
              description: "Шинэчлэгдсэн тоног бүхий лабораторийн анги.",
              details: { roomCode: "A-403", capacity: 25, equipment: ["Компьютер 25ш", "Проектор"] },
            },
          ],
        },
        {
          id: "a4-04",
          label: "Коридор",
          panoramaUrl: "/panoramas/A4/a4-04.jpg",
          description: "4-р давхрын коридор",
          hotspots: [navHotspot("nav-a4-03b", "a4-02", "Буцах", 180),
            navHotspot("nav-a4-04a", "a4-05", "404-р анги", 90),
            navHotspot("nav-a4-04c", "a4-06", "Урагш явах", 0),
          ],
        },
        {
          id: "a4-05",
          label: "404-р анги",
          panoramaUrl: "/panoramas/A4/a4-05.jpg",
          description: "Лекцийн танхим 404-р анги дотор",
          hotspots: [navHotspot("nav-a4-04b", "a4-04", "Буцах", -90)],
          infoHotspots: [
            {
              id: "info-a4-404",
              type: "info",
              yaw: 50,
              pitch: 0,
              title: "Лекцийн танхим 404",
              description: "4 давхарын лекцийн танхим 404-р анги дотор.",
              details: { roomCode: "A-404", capacity: 60, equipment: ["Проектор"] },
            },
          ],
        },
        {
          id: "a4-06",
          label: "Коридор",
          panoramaUrl: "/panoramas/A4/a4-06.jpg",
          description: "4-р давхрын коридор",
          hotspots: [navHotspot("nav-a4-02c", "a4-04", "Буцах", 76),
            navHotspot("nav-a4-06a", "a4-07", "Урагш явах", -106)
          ],        
        },
        {
          id: "a4-07",
          label: "Коридор",
          panoramaUrl: "/panoramas/A4/a4-07.jpg",
          description: "4-р давхрын коридор",
          hotspots: [navHotspot("nav-a4-06b", "a4-06", "Буцах", 90),
              navHotspot("nav-a4-07a", "a4-08", "Урагш явах", -90)
          ],
        },
        {
          id: "a4-08",
          label: "Коридор",
          panoramaUrl: "/panoramas/A4/a4-08.jpg",
          description: "4-р давхрын коридор",
          hotspots: [navHotspot("nav-a4-07b", "a4-07", "Буцах", 90),
              navHotspot("nav-a4-08a", "a4-09", "404-р анги", 0),
              navHotspot("nav-a4-08c", "a4-10", "Урд шат", -90)
          ],
        },
        {
          id: "a4-09",
          label: "401-р анги",
          panoramaUrl: "/panoramas/A4/a4-09.jpg",
          description: "401-р анги дотор",
          hotspots: [navHotspot("nav-a4-08b", "a4-08", "Буцах", -80)],
          infoHotspots: [
            {
              id: "info-a4-dean",
              type: "info",
              yaw: 30,
              pitch: 0,
              title: "401-р лаборатори",
              description: "401-р лабораторийн анги дотор.",
              details: { roomCode: "A-401", equipment: ["Компьютер 25ш", "Проектор"] },
            },
          ],
        },
        {
          id: "a4-10",
          label: "4-р давхрын урд шат",
          panoramaUrl: "/panoramas/A4/a4-10.jpg",
          description: "4-р давхрын урд шат",
          defaultYaw: 140,
          defaultZoom: 0,
          defaultPitch: -10,
          hotspots: [navHotspot("nav-a4-09b", "a4-08", "Буцах", 180),
              navHotspot("nav-a4-10a", "a3-10", "3-р давхарт буух", 85, -20),
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
//  Building B — Science & Labs Building
//  2 floors × 4 scenes each, starts outside
// ─────────────────────────────────────────────
const BUILDING_B: TourBuilding = {
  id: "B",
  name: "МУИС 8-р байр",
  description:
    "Монгол Улсын Их Сургуулийн 8-р байр болох Бизнесийн сургуулийн барилга.",
  thumbnailUrl: "/images/buildings/thumb-building-b.jpg",
  floors: [
    // ── Floor 0 (Outside) ──
    {
      id: 0,
      label: "Гадна талбай",
      defaultSceneId: "b-outside",
      mapImageUrl: "/images/buildings/thumb-building-b.jpg",
      scenes: [
        {
          id: "b-outside",
          label: "БС гадна талбай",
          panoramaUrl: "/panoramas/B/outside.jpg",
          description: "МУИС-ийн Бизнесийн сургуулийн гадна талбайн харагдах байдал",
          defaultZoom: 20,
          tinyPlanet: true,
          
          hotspots: [navHotspot("nav-b-entrance", "b1-01", "Орох", -5)],
          infoHotspots: [
            {
              id: "info-b-outside",
              type: "info",
              yaw: 30,
              pitch: -10,
              title: "Бизнесийн сургуулийн гадна талбай",
              description: "Монгол улсын их сургуулийн 8-р байр болох бизнесийн сургуулийн гадна талбай",
              details: {roomCode: "B-Outside"},
            }
          ]
        },
      ],
    },
    // ── Floor 1 ──
    {
      id: 1,
      label: "1-р давхар",
      defaultSceneId: "b1-01",
      mapImageUrl: "/images/maps/b-floor1.png",
      scenes: [
        {
          id: "b1-01",
          label: "Үүдний танхим",
          panoramaUrl: "/panoramas/B/entrance.jpg",
          description: "Бизнесийн сургуулийн үүдний танхим",
          defaultYaw: -95,
          defaultPitch:0,
          defaultZoom:0,
          hotspots: [
            navHotspot("nav-b1-01", "b-outside", "Гарах", 90),
            navHotspot("nav-b1-02", "b1-02", "Зүүн жишүүр", 0),
            navHotspot("nav-b1-03", "b1-03", "Баруун жишүүр", 180),
            
          ],
          infoHotspots: [
            {
              id: "info-b-lobby",
              type: "info",
              yaw: -90,
              pitch: 0,
              title: "Үүдний танхим ",
              description: "Бизнесийн чиглэлээр үндэсний хэмжээнд тэргүүлэгч сургуулийн хувьд сургалт, судалгаагаар салбартаа болон Төв Азийн бүс нутагт тэргүүлэгч сургууль нь байх болно.",
              details: { roomCode: "B-LOBBY",
                department: "Бизнесийн сургууль",
                url: "https://bs.num.edu.mn"},
            },
          ],
        },
        {
          id: "b1-02",
          label: "Зүүн жишүүр",
          panoramaUrl: "/panoramas/B/entrance-left.jpg",
          description: "Бизнесийн сургуулийн үүдний танхимын зүүн жишүүр",
          hotspots: [
            navHotspot("nav-b1-01", "b1-01", "Буцах", 90),
            navHotspot("nav-b1-03", "b1-04", "2-р давхарт гарах", 180),
          ],
        },
        {
          id: "b1-03",
          label: "Баруун жишүүр",
          panoramaUrl: "/panoramas/B/entrance-right.jpg",
          description: "Бизнесийн сургуулийн үүдний танхимын баруун жишүүр",
          defaultYaw: -45,
          defaultZoom:40,
          hotspots: [
            navHotspot("nav-b1-02", "b1-01", "Буцах", 0),
            navHotspot("nav-b1-04", "b1-05", "2-р давхарт гарах", -90),
          ],
          infoHotspots: [
            {
              id: "info-b2-left",
              type: "info",
              yaw: -160,
              pitch: 0,
              title: "Хувцасны өлгүүр",
              description: "Бизнесийн сургуулийн 2-р давхрын зүүн жигүүрт байрлах хувцасны өлгүүр.",
              details: { roomCode: "B-1F-LEFT" },
            },
          ],
        },
      ],
    },
        // floor - 2
      {
      id: 2,
      label: "2-р давхар",
      defaultSceneId: "b1-04",
      mapImageUrl: "/images/maps/b-floor2.png",
      scenes: [
        {
          id: "b1-04",
          label: "2-давхарын зүүн жигүүр",
          panoramaUrl: "/panoramas/B/2ndfloor-left.jpg",
          description: "Бизнесийн сургуулийн 2-р давхрын коридор",
          defaultYaw: 120,
          defaultZoom: 30,
          hotspots: [
            navHotspot("nav-b1-03b", "b1-05", "Баруун жигүүр", 180),
            navHotspot("nav-b1-01b", "b1-02", "Буцах", 75, -20),
          ],


        },
        {
          id: "b1-05",
          label: "2-давхарын баруун жигүүр",
          panoramaUrl: "/panoramas/B/2ndfloor-right.jpg",
          description: "Бизнесийн сургуулийн 2-р давхрын коридор",
          defaultYaw: 60,
          defaultZoom: 30,
          hotspots: [
            navHotspot("nav-b1-04b", "b1-04", "Зүүн жигүүр", 0),
            navHotspot("nav-b1-01c", "b1-03", "Буцах", 80, -20),
          ],}
      ],
    }, 
  ],
};

// ─────────────────────────────────────────────
//  Building C — Administration Building
//  1 floor + outside
// ─────────────────────────────────────────────
const BUILDING_C: TourBuilding = {
  id: "C",
  name: "МУИС Номын сан",
  description:
    "Захиргааны барилга. Ректорат, санхүү, хүний нөөцийн газрууд байрладаг.",
  thumbnailUrl: "/images/buildings/thumb-building-c.jpg",
  floors: [
    // ── Floor 0 (Outside) ──
    {
      id: 0,
      label: "Гадна талбай",
      defaultSceneId: "c-outside",
      scenes: [
        {
          id: "c-outside",
          label: "Барилга В — Гадна",
          panoramaUrl: "/panoramas/C/c-outside.jpg",
          description: "Барилга В-ийн гадна харагдах байдал",
          hotspots: [navHotspot("nav-c-entrance", "c1-01", "Орох үүд", 0)],
        },
      ],
    },

    // ── Floor 1 ──
    {
      id: 1,
      label: "1-р давхар",
      defaultSceneId: "c1-01",
      mapImageUrl: "/images/maps/c-floor1.png",
      scenes: [
        {
          id: "c1-01",
          label: "Үүдний танхим",
          panoramaUrl: "/panoramas/C/c1-entrance.jpg",
          description: "Захиргааны барилгын үүдний танхим",
          hotspots: [navHotspot("nav-c-outside", "c-outside", "Гарах", 180)],
          infoHotspots: [
            {
              id: "info-c1-lobby",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Захиргааны барилгын үүд",
              description:
                "Ректорат, санхүүгийн газар, хүний нөөцийн алба болон бусад захиргааны нэгжүүд энд байрладаг.",
              details: {
                roomCode: "C-LOBBY",
                department: "Захиргааны тасаг",
              },
            },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────
function initScenePreloads(buildings: TourBuilding[]) {
  const panoramaBySceneId = new Map<string, string>();

  for (const building of buildings) {
    for (const floor of building.floors) {
      for (const scene of floor.scenes) {
        if (scene.panoramaUrl) {
          panoramaBySceneId.set(scene.id, scene.panoramaUrl);
        }
      }
    }
  }

  for (const building of buildings) {
    for (const floor of building.floors) {
      for (const scene of floor.scenes) {
        const targets = new Set<string>();

        for (const hotspot of scene.hotspots ?? []) {
          if (hotspot.type === "nav" && hotspot.targetSceneId) {
            const url = panoramaBySceneId.get(hotspot.targetSceneId);
            if (url) targets.add(url);
          }
        }

        scene.preloadUrls = [...targets];
      }
    }
  }
}

initScenePreloads([BUILDING_A, BUILDING_B, BUILDING_C]);

export const TOUR_CONFIG: TourConfig = {
  defaultBuildingId: "A",
  buildings: [BUILDING_A, BUILDING_B, BUILDING_C],
};

// ── Helpers ─────────────────────────────────
export function getBuilding(id: string): TourBuilding | undefined {
  return TOUR_CONFIG.buildings.find((b) => b.id === id);
}

export function getFloor(buildingId: string, floorId: number) {
  return getBuilding(buildingId)?.floors.find((f) => f.id === floorId);
}

export function getScene(buildingId: string, floorId: number, sceneId: string) {
  return getFloor(buildingId, floorId)?.scenes.find((s) => s.id === sceneId);
}
