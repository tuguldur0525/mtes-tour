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
          infoHotspots: [
            {
              id: "info-a1-101",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Лекцийн танхим 101",
              description: "Их хэмжээний лекцийн танхим. Проектор, чаргуур тоноглогдсон.",
              details: {
                roomCode: "A-101",
                capacity: 120,
                department: "Нийтлэг хэрэглээ",
                equipment: ["Проектор", "Чаргуур", "Микрофон"],
              },
            },
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
            navHotspot("nav-a1-09", "a1-09", "Гарах", 0),  //garah haalga solih
            navHotspot("nav-a1-07b", "a1-10", "2 давхарт гарах", 180),
          ],
          infoHotspots: [
            {
              id: "info-a1-103",
              type: "info",
              yaw: 45,
              pitch: 0,
              title: "Дасгалын анги 103",
              description: "Бага бүлгийн дасгал, семинарын танхим.",
              details: { roomCode: "A-103", capacity: 40, equipment: ["Самбар", "Проектор"] },
            },
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
          infoHotspots: [
            {
              id: "info-a1-104",
              type: "info",
              yaw: 45,
              pitch: 0,
              title: "Дасгалын анги 104",
              description: "Компьютерийн дасгалын анги.",
              details: { roomCode: "A-104", capacity: 35, equipment: ["Компьютер 35ш", "Проектор"] },
            },
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
          infoHotspots: [
            {
              id: "info-a1-cafe",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Кафетери",
              description: "Оюутан, багш нарт зориулсан хоолны газар. 07:30–18:00.",
              details: { roomCode: "A-CAFE", capacity: 100 },
            },
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
          infoHotspots: [
            {
              id: "info-a1-cafe",
              type: "info",
              yaw: 60,
              pitch: 0,
              title: "Кафетери",
              description: "Оюутан, багш нарт зориулсан хоолны газар. 07:30–18:00.",
              details: { roomCode: "A-CAFE", capacity: 100 },
            },
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
            navHotspot("nav-a1-08b", "a1-13", "Зүүн булан", 70),

          ],
          infoHotspots: [
            {
              id: "info-a1-cafe",
              type: "info",
              yaw: 60,
              pitch: 0,
              title: "Кафетери",
              description: "Оюутан, багш нарт зориулсан хоолны газар. 07:30–18:00.",
              details: { roomCode: "A-CAFE", capacity: 100 },
            },
          ],
        },
        {
          id: "a1-13",
          label: "Зүүн шат",
          panoramaUrl: "/panoramas/A/inside114.jpg",
          description: "1-р давхрын кафетери",
          defaultYaw: 0,
          hotspots: [
            navHotspot("nav-a1-09b", "a1-12", "Буцах", 93),
            navHotspot("nav-a1-08b", "a1-14", "Араас харах", 0),

          ],
          infoHotspots: [
            {
              id: "info-a1-cafe",
              type: "info",
              yaw: 60,
              pitch: 0,
              title: "Кафетери",
              description: "Оюутан, багш нарт зориулсан хоолны газар. 07:30–18:00.",
              details: { roomCode: "A-CAFE", capacity: 100 },
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
            navHotspot("nav-a1-09b", "a1-12", "Гарах", 10,-25),

          ],
          infoHotspots: [
            {
              id: "info-a1-cafe",
              type: "info",
              yaw: 60,
              pitch: 0,
              title: "Кафетери",
              description: "Оюутан, багш нарт зориулсан хоолны газар. 07:30–18:00.",
              details: { roomCode: "A-CAFE", capacity: 100 },
            },
          ],
        },
        {
          id: "a1-15",
          label: "109-р лаборатори",
          panoramaUrl: "/panoramas/A/lab109.jpg",
          description: "1-р давхрын кафетери",
          defaultZoom:20,
          hotspots: [
            navHotspot("nav-a1-09b", "a1-09", "Гарах", -130, -5),

          ],
          infoHotspots: [
            {
              id: "info-a1-cafe",
              type: "info",
              yaw: 60,
              pitch: 0,
              title: "Кафетери",
              description: "Оюутан, багш нарт зориулсан хоолны газар. 07:30–18:00.",
              details: { roomCode: "A-CAFE", capacity: 100 },
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
            navHotspot("nav-a1-04b", "a1-06", "3-р давхар руу гарах", 95, 5),
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
              yaw: 90,
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
          infoHotspots: [
            {
              id: "info-a2-202",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Семинарын танхим 202",
              description: "Бага бүлгийн семинар, хэлэлцүүлгийн танхим.",
              details: { roomCode: "A-202", capacity: 40 },
            },
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
          infoHotspots: [
            {
              id: "info-a2-203",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Дасгалын анги 203",
              description: "IT дасгалын анги. Компьютер тус бүрт.",
              details: { roomCode: "A-203", capacity: 30, equipment: ["Компьютер 30ш"] },
            },
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
          infoHotspots: [
            {
              id: "info-a2-204",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Дасгалын анги 204",
              description: "Ерөнхий зориулалтын дасгалын анги.",
              details: { roomCode: "A-204", capacity: 40 },
            },
          ],
        },
        {
          id: "a2-07",
          label: "203 өрөө",
          panoramaUrl: "/panoramas/A2/inside203.jpg",
          description: "203-р ангийн дотор тал",
          hotspots: [navHotspot("nav-a2-02d", "a2-06", "Буцах", -100)],

          infoHotspots: [
            {
              id: "info-a2-library",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Номын сан",
              description: "10,000 гаруй ном, цахим нөөц бүхий сургуулийн номын сан.",
              details: { roomCode: "A-LIB", capacity: 80, equipment: ["Компьютер 20ш", "Принтер"] },
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
            navHotspot("nav-a2-08b", "a2-10", "3-р давхарт гарах", -80),
          ],

          defaultZoom: 0,
          defaultYaw: -40,
          infoHotspots: [
            {
              id: "info-a2-student",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Оюутны өрөө",
              description: "Оюутнуудын амрах, бүлгээрээ суралцах орчин.",
              details: { roomCode: "A-SR", capacity: 30 },
            },
          ],
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
          label: "Шатны буудал 3Д",
          panoramaUrl: "/panoramas/A/a3-01.jpg",
          description: "3-р давхарт гарсан шатны буудал",
          hotspots: [navHotspot("nav-a3-02", "a3-02", "Коридор", 0)],
        },
        {
          id: "a3-02",
          label: "3-р давхрын коридор",
          panoramaUrl: "/panoramas/A/a3-02.jpg",
          description: "3-р давхрын голч коридор",
          hotspots: [
            navHotspot("nav-a3-01", "a3-01", "Буцах", 180),
            navHotspot("nav-a3-03", "a3-03", "301-р анги", 0),
          ],
        },
        {
          id: "a3-03",
          label: "301-р анги",
          panoramaUrl: "/panoramas/A/a3-03.jpg",
          description: "Лекцийн танхим — 301",
          hotspots: [navHotspot("nav-a3-02b", "a3-02", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a3-301",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Лекцийн танхим 301",
              description: "Харьцангуй жижиг лекцийн танхим, шинэчлэгдсэн тоног.",
              details: { roomCode: "A-301", capacity: 60, equipment: ["Проектор", "Чаргуур"] },
            },
          ],
        },
        {
          id: "a3-04",
          label: "302-р анги",
          panoramaUrl: "/panoramas/A/a3-04.jpg",
          description: "Семинарын танхим — 302",
          hotspots: [navHotspot("nav-a3-03b", "a3-03", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a3-302",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Семинарын анги 302",
              description: "",
              details: { roomCode: "A-302", capacity: 35 },
            },
          ],
        },
        {
          id: "a3-05",
          label: "Лаборатори 3А",
          panoramaUrl: "/panoramas/A/a3-05.jpg",
          description: "Компьютерийн лаборатори 3А",
          hotspots: [navHotspot("nav-a3-04b", "a3-04", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a3-lab3a",
              type: "info",
              yaw: 45,
              pitch: 0,
              title: "Компьютерийн лаборатори 3А",
              description: "Өндөр гүйцэтгэлтэй компьютер бүхий лаборатори.",
              details: { roomCode: "A-LAB3A", capacity: 30, equipment: ["Workstation 30ш", "Сервер"] },
            },
          ],
        },
        {
          id: "a3-06",
          label: "Лаборатори 3Б",
          panoramaUrl: "/panoramas/A/a3-06.jpg",
          description: "Компьютерийн лаборатори 3Б",
          hotspots: [navHotspot("nav-a3-05b", "a3-05", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a3-lab3b",
              type: "info",
              yaw: 45,
              pitch: 0,
              title: "Компьютерийн лаборатори 3Б",
              description: "Сүлжээ, холбооны лаборатори.",
              details: { roomCode: "A-LAB3B", capacity: 25, equipment: ["Сүлжээний тоног", "Компьютер 25ш"] },
            },
          ],
        },
        {
          id: "a3-07",
          label: "303-р анги",
          panoramaUrl: "/panoramas/A/a3-07.jpg",
          description: "Дасгалын анги — 303",
          hotspots: [navHotspot("nav-a3-06b", "a3-06", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a3-303",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Дасгалын анги 303",
              description: "",
              details: { roomCode: "A-303", capacity: 40 },
            },
          ],
        },
        {
          id: "a3-08",
          label: "Профессорын өрөө 3А",
          panoramaUrl: "/panoramas/A/a3-08.jpg",
          description: "3-р давхрын багшийн өрөө",
          hotspots: [navHotspot("nav-a3-07b", "a3-07", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a3-prof",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Багшийн өрөө 3А",
              description: "Физикийн тэнхимийн ажлын өрөө.",
              details: { roomCode: "A-3A", department: "Физикийн тэнхим" },
            },
          ],
        },
        {
          id: "a3-09",
          label: "Хурлын танхим 3",
          panoramaUrl: "/panoramas/A/a3-09.jpg",
          description: "3-р давхрын хурлын танхим",
          hotspots: [navHotspot("nav-a3-08b", "a3-08", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a3-conf",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Хурлын танхим 3",
              description: "Дунд хэмжээний хурлын танхим. Видеоконференц тоноглогдсон.",
              details: { roomCode: "A-CONF3", capacity: 20, equipment: ["ВК систем", "Проектор"] },
            },
          ],
        },
        {
          id: "a3-10",
          label: "Тавилгын хонгил",
          panoramaUrl: "/panoramas/A/a3-10.jpg",
          description: "3-р давхрын хонгилын үзэмж",
          hotspots: [navHotspot("nav-a3-09b", "a3-09", "Буцах", 180)],
        },
      ],
    },

    // ── Floor 4 ──────────────────────────────
    {
      id: 4,
      label: "4-р давхар",
      defaultSceneId: "a4-01",
      mapImageUrl: "/images/maps/a-floor4.png",
      scenes: [
        {
          id: "a4-01",
          label: "Шатны буудал 4Д",
          panoramaUrl: "/panoramas/A/a4-01.jpg",
          description: "4-р давхарт гарсан шатны буудал",
          hotspots: [navHotspot("nav-a4-02", "a4-02", "Коридор", 0)],
        },
        {
          id: "a4-02",
          label: "4-р давхрын коридор",
          panoramaUrl: "/panoramas/A/a4-02.jpg",
          description: "4-р давхрын голч коридор",
          hotspots: [
            navHotspot("nav-a4-01", "a4-01", "Буцах", 180),
            navHotspot("nav-a4-03", "a4-03", "401-р анги", 0),
            navHotspot("nav-a4-06", "a4-06", "Дэвшилтэт лаб", 90),
          ],
        },
        {
          id: "a4-03",
          label: "401-р анги",
          panoramaUrl: "/panoramas/A/a4-03.jpg",
          description: "Лекцийн танхим — 401",
          hotspots: [navHotspot("nav-a4-02b", "a4-02", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a4-401",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Лекцийн танхим 401",
              description: "Шинэчлэгдсэн тоног бүхий лекцийн танхим.",
              details: { roomCode: "A-401", capacity: 80, equipment: ["Смарт самбар", "Проектор"] },
            },
          ],
        },
        {
          id: "a4-04",
          label: "402-р анги",
          panoramaUrl: "/panoramas/A/a4-04.jpg",
          description: "Семинарын танхим — 402",
          hotspots: [navHotspot("nav-a4-03b", "a4-03", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a4-402",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Семинарын анги 402",
              description: "",
              details: { roomCode: "A-402", capacity: 35 },
            },
          ],
        },
        {
          id: "a4-05",
          label: "403-р анги",
          panoramaUrl: "/panoramas/A/a4-05.jpg",
          description: "Дасгалын анги — 403",
          hotspots: [navHotspot("nav-a4-04b", "a4-04", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a4-403",
              type: "info",
              yaw: 90,
              pitch: 0,
              title: "Дасгалын анги 403",
              description: "",
              details: { roomCode: "A-403", capacity: 40 },
            },
          ],
        },
        {
          id: "a4-06",
          label: "Дэвшилтэт лаб",
          panoramaUrl: "/panoramas/A/a4-06.jpg",
          description: "Дэвшилтэт технологийн лаборатори",
          hotspots: [navHotspot("nav-a4-02c", "a4-02", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a4-advlab",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Дэвшилтэт технологийн лаб",
              description: "AI, робот, VR судалгааны лаборатори.",
              details: {
                roomCode: "A-ADV-LAB",
                capacity: 20,
                department: "Судалгааны тэнхим",
                equipment: ["VR headset", "3D принтер", "Робот тоног"],
              },
            },
          ],
        },
        {
          id: "a4-07",
          label: "Судалгааны өрөө 4А",
          panoramaUrl: "/panoramas/A/a4-07.jpg",
          description: "Судалгааны баг, докторантурын өрөө",
          hotspots: [navHotspot("nav-a4-06b", "a4-06", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a4-research",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Судалгааны өрөө 4А",
              description: "Докторантур оюутан, судлаачдын ажлын орчин.",
              details: { roomCode: "A-RES4A", department: "Судалгааны тэнхим" },
            },
          ],
        },
        {
          id: "a4-08",
          label: "Хурлын танхим 4",
          panoramaUrl: "/panoramas/A/a4-08.jpg",
          description: "4-р давхрын хурлын танхим",
          hotspots: [navHotspot("nav-a4-07b", "a4-07", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a4-conf",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Хурлын танхим 4",
              description: "Олон улсын хурал, видеоконференцэд зориулсан танхим.",
              details: { roomCode: "A-CONF4", capacity: 30, equipment: ["ВК систем", "Смарт самбар"] },
            },
          ],
        },
        {
          id: "a4-09",
          label: "Декант",
          panoramaUrl: "/panoramas/A/a4-09.jpg",
          description: "Деканатын тасаг",
          hotspots: [navHotspot("nav-a4-08b", "a4-08", "Буцах", 180)],
          infoHotspots: [
            {
              id: "info-a4-dean",
              type: "info",
              yaw: 0,
              pitch: 0,
              title: "Деканатын тасаг",
              description: "Сургуулийн захиргаа, деканат. Хуваарь, бичиг баримтын асуудал.",
              details: { roomCode: "A-DEAN", department: "Захиргаа" },
            },
          ],
        },
        {
          id: "a4-10",
          label: "4-р давхрын тагт",
          panoramaUrl: "/panoramas/A/a4-10.jpg",
          description: "4-р давхрын тагтнаас харагдах дүр",
          hotspots: [navHotspot("nav-a4-09b", "a4-09", "Буцах", 180)],
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
        // floor - 2
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
  name: "МУИС номын сан",
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
