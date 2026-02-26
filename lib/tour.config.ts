// ============================================================
// МТЭС 360° VR Tour — Гол тохиргооны файл
// Энд барилга, давхар, scene, hotspot бүгдийг тодорхойлно.
// Зураг авалт хийсний дараа imageUrl-уудыг шинэчилнэ.
// ============================================================

import type { TourConfig } from "@/types/tour";

export const TOUR_CONFIG: TourConfig = {
  defaultBuildingId: "A",

  buildings: [
    // ─────────────────────────────────────────────
    // БАРИЛГА A
    // ─────────────────────────────────────────────
    {
      id: "A",
      name: "Барилга A",
      description:
        "МТЭС-ийн үндсэн барилга. Лекцийн танхим, компьютерийн лаб, тэнхимийн өрөөнүүдийг агуулна.",
      thumbnailUrl: "/images/tour/thumb-building-a.jpg",
      defaultFloorId: 1,

      floors: [
        // ── 1-р ДАВХАР ──────────────────────────
        {
          id: 1,
          label: "1-р давхар",
          defaultSceneId: "a1-entrance",
          floorMapUrl: "/images/tour/floormap-a1.svg",
          scenes: [
            {
              id: "a1-entrance",
              label: "Үүдний танхим",
              imageUrl: "/images/tour/a1-entrance.jpg",
              thumbnailUrl: "/images/tour/thumb-a1-entrance.jpg",
              description: "Барилга A-ийн гол орц — мэдэгдлийн самбар, хүлээлгийн зай",
              defaultYaw: 0,
              defaultPitch: 0,
              hotspots: [
                {
                  id: "a1-entrance-to-corridor",
                  type: "nav",
                  position: { yaw: 90, pitch: -5 },
                  targetSceneId: "a1-corridor",
                  tooltip: "Коридор →",
                },
                {
                  id: "a1-entrance-info",
                  type: "info",
                  position: { yaw: -30, pitch: 10 },
                  title: "Үүдний танхим",
                  description:
                    "МТЭС-ийн Барилга A-ийн гол орц. Мэдэгдлийн самбар болон оюутны зөвлөгөөний ширээ байрладаг.",
                  details: {
                    roomCode: "A-Lobby",
                    department: "Захиргаа",
                  },
                },
              ],
            },
            {
              id: "a1-corridor",
              label: "1-р давхрын коридор",
              imageUrl: "/images/tour/a1-corridor.jpg",
              thumbnailUrl: "/images/tour/thumb-a1-corridor.jpg",
              description: "1-р давхрын гол коридор",
              defaultYaw: 0,
              hotspots: [
                {
                  id: "a1-corridor-to-entrance",
                  type: "nav",
                  position: { yaw: 180, pitch: -5 },
                  targetSceneId: "a1-entrance",
                  tooltip: "← Үүдний танхим",
                },
                {
                  id: "a1-corridor-to-101",
                  type: "nav",
                  position: { yaw: -60, pitch: -10 },
                  targetSceneId: "a1-room101",
                  tooltip: "101-р танхим →",
                },
                {
                  id: "a1-corridor-to-102",
                  type: "nav",
                  position: { yaw: 60, pitch: -10 },
                  targetSceneId: "a1-room102",
                  tooltip: "102-р танхим →",
                },
                {
                  id: "a1-corridor-to-stairs",
                  type: "nav",
                  position: { yaw: 0, pitch: -15 },
                  targetSceneId: "a1-stairs",
                  tooltip: "Шат ↑",
                },
              ],
            },
            {
              id: "a1-room101",
              label: "101-р Лекцийн Танхим",
              imageUrl: "/images/tour/a1-room101.jpg",
              thumbnailUrl: "/images/tour/thumb-a1-room101.jpg",
              description: "Багтаамж 60 суудалтай лекцийн танхим",
              hotspots: [
                {
                  id: "a1-101-to-corridor",
                  type: "nav",
                  position: { yaw: 180, pitch: -5 },
                  targetSceneId: "a1-corridor",
                  tooltip: "← Коридор",
                },
                {
                  id: "a1-101-info",
                  type: "info",
                  position: { yaw: 45, pitch: 5 },
                  title: "101-р Лекцийн Танхим",
                  description:
                    "Ерөнхий лекцийн танхим. Интерактив самбар, проектортой.",
                  details: {
                    roomCode: "A-101",
                    capacity: 60,
                    department: "Нийтийн хэрэглээ",
                    equipment: ["Проектор", "Интерактив самбар", "Ухаалаг телевизор"],
                  },
                },
              ],
            },
            {
              id: "a1-room102",
              label: "102-р Лекцийн Танхим",
              imageUrl: "/images/tour/a1-room102.jpg",
              thumbnailUrl: "/images/tour/thumb-a1-room102.jpg",
              description: "Багтаамж 60 суудалтай лекцийн танхим",
              hotspots: [
                {
                  id: "a1-102-to-corridor",
                  type: "nav",
                  position: { yaw: 180, pitch: -5 },
                  targetSceneId: "a1-corridor",
                  tooltip: "← Коридор",
                },
                {
                  id: "a1-102-info",
                  type: "info",
                  position: { yaw: 45, pitch: 5 },
                  title: "102-р Лекцийн Танхим",
                  description:
                    "Ерөнхий лекцийн танхим. Проектор, цагаан самбартай.",
                  details: {
                    roomCode: "A-102",
                    capacity: 60,
                    equipment: ["Проектор", "Цагаан самбар"],
                  },
                },
              ],
            },
            {
              id: "a1-stairs",
              label: "Шат (1→2)",
              imageUrl: "/images/tour/a1-stairs.jpg",
              thumbnailUrl: "/images/tour/thumb-a1-stairs.jpg",
              description: "2-р давхарт холбогдох шат",
              hotspots: [
                {
                  id: "a1-stairs-to-corridor",
                  type: "nav",
                  position: { yaw: 180, pitch: 0 },
                  targetSceneId: "a1-corridor",
                  tooltip: "← 1-р давхар",
                },
                {
                  id: "a1-stairs-to-floor2",
                  type: "nav",
                  position: { yaw: 0, pitch: -20 },
                  targetSceneId: "a2-corridor",
                  tooltip: "2-р давхар ↑",
                },
              ],
            },
          ],
        },

        // ── 2-р ДАВХАР ──────────────────────────
        {
          id: 2,
          label: "2-р давхар",
          defaultSceneId: "a2-corridor",
          floorMapUrl: "/images/tour/floormap-a2.svg",
          scenes: [
            {
              id: "a2-corridor",
              label: "2-р давхрын коридор",
              imageUrl: "/images/tour/a2-corridor.jpg",
              thumbnailUrl: "/images/tour/thumb-a2-corridor.jpg",
              defaultYaw: 0,
              hotspots: [
                {
                  id: "a2-corridor-to-201",
                  type: "nav",
                  position: { yaw: -70, pitch: -10 },
                  targetSceneId: "a2-room201",
                  tooltip: "201-р танхим →",
                },
                {
                  id: "a2-corridor-to-202",
                  type: "nav",
                  position: { yaw: 70, pitch: -10 },
                  targetSceneId: "a2-room202",
                  tooltip: "202-р танхим →",
                },
                {
                  id: "a2-corridor-to-lab",
                  type: "nav",
                  position: { yaw: 0, pitch: -10 },
                  targetSceneId: "a2-lab",
                  tooltip: "Компьютерийн лаб →",
                },
                {
                  id: "a2-corridor-down",
                  type: "nav",
                  position: { yaw: 180, pitch: -15 },
                  targetSceneId: "a1-stairs",
                  tooltip: "↓ 1-р давхар",
                },
              ],
            },
            {
              id: "a2-room201",
              label: "201-р Лекцийн Танхим",
              imageUrl: "/images/tour/a2-room201.jpg",
              thumbnailUrl: "/images/tour/thumb-a2-room201.jpg",
              description: "Том лекцийн танхим, 80 суудалтай",
              hotspots: [
                {
                  id: "a2-201-back",
                  type: "nav",
                  position: { yaw: 180, pitch: -5 },
                  targetSceneId: "a2-corridor",
                  tooltip: "← Коридор",
                },
                {
                  id: "a2-201-info",
                  type: "info",
                  position: { yaw: 20, pitch: 10 },
                  title: "201-р Лекцийн Танхим",
                  description:
                    "80 суудалтай том лекцийн танхим. Хоёр проектор, дуу чимээний системтэй.",
                  details: {
                    roomCode: "A-201",
                    capacity: 80,
                    equipment: ["Проектор x2", "Дуу чимээний систем", "Интерактив самбар"],
                  },
                },
              ],
            },
            {
              id: "a2-room202",
              label: "202-р Лекцийн Танхим",
              imageUrl: "/images/tour/a2-room202.jpg",
              thumbnailUrl: "/images/tour/thumb-a2-room202.jpg",
              description: "Дунд хэмжээний лекцийн танхим, 50 суудалтай",
              hotspots: [
                {
                  id: "a2-202-back",
                  type: "nav",
                  position: { yaw: 180, pitch: -5 },
                  targetSceneId: "a2-corridor",
                  tooltip: "← Коридор",
                },
                {
                  id: "a2-202-info",
                  type: "info",
                  position: { yaw: 30, pitch: 5 },
                  title: "202-р Лекцийн Танхим",
                  description: "50 суудалтай лекцийн танхим.",
                  details: {
                    roomCode: "A-202",
                    capacity: 50,
                    equipment: ["Проектор", "Цагаан самбар"],
                  },
                },
              ],
            },
            {
              id: "a2-lab",
              label: "Компьютерийн Лаб (2-р давхар)",
              imageUrl: "/images/tour/a2-lab.jpg",
              thumbnailUrl: "/images/tour/thumb-a2-lab.jpg",
              description: "30 компьютертэй дадлагын лаб",
              hotspots: [
                {
                  id: "a2-lab-back",
                  type: "nav",
                  position: { yaw: 180, pitch: -5 },
                  targetSceneId: "a2-corridor",
                  tooltip: "← Коридор",
                },
                {
                  id: "a2-lab-info",
                  type: "info",
                  position: { yaw: 0, pitch: 10 },
                  title: "Компьютерийн Дадлагын Лаб",
                  description:
                    "30 ширхэг Dell Optiplex компьютертэй дадлагын лаб. Сүлжээний администраторын тоног төхөөрөмжтэй.",
                  details: {
                    roomCode: "A-203",
                    capacity: 30,
                    department: "Мэдээлэл технологийн тэнхим",
                    equipment: [
                      "Dell Optiplex компьютер x30",
                      "Серверийн rack",
                      "Switch, Router",
                      "Проектор",
                    ],
                  },
                },
              ],
            },
          ],
        },

        // ── 3-р ДАВХАР ──────────────────────────
        {
          id: 3,
          label: "3-р давхар",
          defaultSceneId: "a3-corridor",
          scenes: [
            {
              id: "a3-corridor",
              label: "3-р давхрын коридор",
              imageUrl: "/images/tour/a3-corridor.jpg",
              thumbnailUrl: "/images/tour/thumb-a3-corridor.jpg",
              defaultYaw: 0,
              hotspots: [
                {
                  id: "a3-to-301",
                  type: "nav",
                  position: { yaw: -70, pitch: -10 },
                  targetSceneId: "a3-room301",
                  tooltip: "301-р танхим →",
                },
                {
                  id: "a3-to-302",
                  type: "nav",
                  position: { yaw: 70, pitch: -10 },
                  targetSceneId: "a3-room302",
                  tooltip: "302-р танхим →",
                },
                {
                  id: "a3-to-medialab",
                  type: "nav",
                  position: { yaw: 0, pitch: -10 },
                  targetSceneId: "a3-medialab",
                  tooltip: "Медиа лаб →",
                },
              ],
            },
            {
              id: "a3-room301",
              label: "301-р Лекцийн Танхим",
              imageUrl: "/images/tour/a3-room301.jpg",
              thumbnailUrl: "/images/tour/thumb-a3-room301.jpg",
              hotspots: [
                { id: "a3-301-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "a3-corridor", tooltip: "← Коридор" },
                { id: "a3-301-info", type: "info", position: { yaw: 30, pitch: 5 }, title: "301-р Лекцийн Танхим", description: "60 суудалтай лекцийн танхим.", details: { roomCode: "A-301", capacity: 60, equipment: ["Проектор", "Интерактив самбар"] } },
              ],
            },
            {
              id: "a3-room302",
              label: "302-р Лекцийн Танхим",
              imageUrl: "/images/tour/a3-room302.jpg",
              thumbnailUrl: "/images/tour/thumb-a3-room302.jpg",
              hotspots: [
                { id: "a3-302-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "a3-corridor", tooltip: "← Коридор" },
                { id: "a3-302-info", type: "info", position: { yaw: 30, pitch: 5 }, title: "302-р Лекцийн Танхим", description: "50 суудалтай лекцийн танхим.", details: { roomCode: "A-302", capacity: 50 } },
              ],
            },
            {
              id: "a3-medialab",
              label: "Мультимедиа Лаб",
              imageUrl: "/images/tour/a3-medialab.jpg",
              thumbnailUrl: "/images/tour/thumb-a3-medialab.jpg",
              description: "Мультимедиа технологийн дадлагын лаб",
              hotspots: [
                { id: "a3-media-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "a3-corridor", tooltip: "← Коридор" },
                {
                  id: "a3-media-info",
                  type: "info",
                  position: { yaw: 0, pitch: 10 },
                  title: "Мультимедиа Лаб",
                  description: "Дүрс болон дуу боловсруулалтын мэргэжлийн тоног төхөөрөмжтэй лаб.",
                  details: {
                    roomCode: "A-303",
                    capacity: 20,
                    department: "Мультимедиа технологийн тэнхим",
                    equipment: ["iMac x20", "Adobe Creative Suite", "Камер, гэрэл зургийн тоног төхөөрөмж", "VR headset x4"],
                  },
                },
              ],
            },
          ],
        },

        // ── 4-р ДАВХАР ──────────────────────────
        {
          id: 4,
          label: "4-р давхар",
          defaultSceneId: "a4-corridor",
          scenes: [
            {
              id: "a4-corridor",
              label: "4-р давхрын коридор",
              imageUrl: "/images/tour/a4-corridor.jpg",
              thumbnailUrl: "/images/tour/thumb-a4-corridor.jpg",
              defaultYaw: 0,
              hotspots: [
                { id: "a4-to-dept", type: "nav", position: { yaw: -60, pitch: -10 }, targetSceneId: "a4-department", tooltip: "Тэнхимийн өрөо →" },
                { id: "a4-to-admin", type: "nav", position: { yaw: 60, pitch: -10 }, targetSceneId: "a4-admin", tooltip: "Захиргаа →" },
              ],
            },
            {
              id: "a4-department",
              label: "Тэнхимийн Өрөо",
              imageUrl: "/images/tour/a4-department.jpg",
              thumbnailUrl: "/images/tour/thumb-a4-department.jpg",
              hotspots: [
                { id: "a4-dept-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "a4-corridor", tooltip: "← Коридор" },
                { id: "a4-dept-info", type: "info", position: { yaw: 20, pitch: 5 }, title: "МТ Тэнхимийн Өрөо", description: "Мэдээлэл технологийн тэнхимийн профессор, багш нарын өрөо.", details: { roomCode: "A-401", department: "МТ Тэнхим" } },
              ],
            },
            {
              id: "a4-admin",
              label: "Захиргааны Өрөо",
              imageUrl: "/images/tour/a4-admin.jpg",
              thumbnailUrl: "/images/tour/thumb-a4-admin.jpg",
              hotspots: [
                { id: "a4-admin-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "a4-corridor", tooltip: "← Коридор" },
                { id: "a4-admin-info", type: "info", position: { yaw: 20, pitch: 5 }, title: "Захиргааны Өрөо", description: "Сургуулийн захиргаа болон оюутны асуудал хариуцсан өрөо.", details: { roomCode: "A-402" } },
              ],
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // БАРИЛГА B
    // ─────────────────────────────────────────────
    {
      id: "B",
      name: "Барилга B",
      description:
        "МТЭС-ийн хоёр дахь барилга. Компьютерийн лаб, номын сан болон дадлагын өрөөнүүд.",
      thumbnailUrl: "/images/tour/thumb-building-b.jpg",
      defaultFloorId: 1,

      floors: [
        {
          id: 1,
          label: "1-р давхар",
          defaultSceneId: "b1-entrance",
          scenes: [
            {
              id: "b1-entrance",
              label: "Үүдний танхим (Барилга B)",
              imageUrl: "/images/tour/b1-entrance.jpg",
              thumbnailUrl: "/images/tour/thumb-b1-entrance.jpg",
              defaultYaw: 0,
              hotspots: [
                { id: "b1-to-corridor", type: "nav", position: { yaw: 90, pitch: -5 }, targetSceneId: "b1-corridor", tooltip: "Коридор →" },
                { id: "b1-entrance-info", type: "info", position: { yaw: -20, pitch: 10 }, title: "Барилга B — Үүдний танхим", description: "МТЭС-ийн B барилгын гол орц.", details: { roomCode: "B-Lobby" } },
              ],
            },
            {
              id: "b1-corridor",
              label: "1-р давхрын коридор (B)",
              imageUrl: "/images/tour/b1-corridor.jpg",
              thumbnailUrl: "/images/tour/thumb-b1-corridor.jpg",
              hotspots: [
                { id: "b1-corr-to-entrance", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "b1-entrance", tooltip: "← Үүдний танхим" },
                { id: "b1-corr-to-library", type: "nav", position: { yaw: -60, pitch: -10 }, targetSceneId: "b1-library", tooltip: "Номын сан →" },
              ],
            },
            {
              id: "b1-library",
              label: "Номын Сан",
              imageUrl: "/images/tour/b1-library.jpg",
              thumbnailUrl: "/images/tour/thumb-b1-library.jpg",
              description: "МТЭС-ийн номын сан",
              hotspots: [
                { id: "b1-lib-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "b1-corridor", tooltip: "← Коридор" },
                { id: "b1-lib-info", type: "info", position: { yaw: 0, pitch: 10 }, title: "Номын Сан", description: "5,000 гаруй номтой сургуулийн номын сан. Тусгай унших газар, компьютерийн зам бүхий.", details: { roomCode: "B-110", equipment: ["Компьютер x10", "Принтер", "Скanner"] } },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "2-р давхар",
          defaultSceneId: "b2-corridor",
          scenes: [
            {
              id: "b2-corridor",
              label: "2-р давхрын коридор (B)",
              imageUrl: "/images/tour/b2-corridor.jpg",
              thumbnailUrl: "/images/tour/thumb-b2-corridor.jpg",
              defaultYaw: 0,
              hotspots: [
                { id: "b2-to-b201", type: "nav", position: { yaw: -70, pitch: -10 }, targetSceneId: "b2-room201", tooltip: "B201-р танхим →" },
                { id: "b2-to-lab", type: "nav", position: { yaw: 0, pitch: -10 }, targetSceneId: "b2-lab", tooltip: "Компьютерийн лаб →" },
              ],
            },
            {
              id: "b2-room201",
              label: "B201-р Лекцийн Танхим",
              imageUrl: "/images/tour/b2-room201.jpg",
              thumbnailUrl: "/images/tour/thumb-b2-room201.jpg",
              hotspots: [
                { id: "b2-201-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "b2-corridor", tooltip: "← Коридор" },
                { id: "b2-201-info", type: "info", position: { yaw: 30, pitch: 5 }, title: "B201-р Лекцийн Танхим", description: "70 суудалтай лекцийн танхим.", details: { roomCode: "B-201", capacity: 70, equipment: ["Проектор", "Интерактив самбар"] } },
              ],
            },
            {
              id: "b2-lab",
              label: "Компьютерийн Лаб (B барилга)",
              imageUrl: "/images/tour/b2-lab.jpg",
              thumbnailUrl: "/images/tour/thumb-b2-lab.jpg",
              description: "B барилгын компьютерийн дадлагын лаб",
              hotspots: [
                { id: "b2-lab-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "b2-corridor", tooltip: "← Коридор" },
                { id: "b2-lab-info", type: "info", position: { yaw: 0, pitch: 10 }, title: "Компьютерийн Лаб (B)", description: "25 компьютертэй дадлагын лаб.", details: { roomCode: "B-203", capacity: 25, equipment: ["HP компьютер x25", "Проектор"] } },
              ],
            },
          ],
        },
        {
          id: 3,
          label: "3-р давхар",
          defaultSceneId: "b3-corridor",
          scenes: [
            {
              id: "b3-corridor",
              label: "3-р давхрын коридор (B)",
              imageUrl: "/images/tour/b3-corridor.jpg",
              thumbnailUrl: "/images/tour/thumb-b3-corridor.jpg",
              defaultYaw: 0,
              hotspots: [
                { id: "b3-to-301", type: "nav", position: { yaw: -70, pitch: -10 }, targetSceneId: "b3-room301", tooltip: "B301-р танхим →" },
                { id: "b3-to-302", type: "nav", position: { yaw: 70, pitch: -10 }, targetSceneId: "b3-room302", tooltip: "B302-р танхим →" },
              ],
            },
            {
              id: "b3-room301",
              label: "B301-р Лекцийн Танхим",
              imageUrl: "/images/tour/b3-room301.jpg",
              hotspots: [
                { id: "b3-301-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "b3-corridor", tooltip: "← Коридор" },
                { id: "b3-301-info", type: "info", position: { yaw: 30, pitch: 5 }, title: "B301-р Лекцийн Танхим", description: "60 суудалтай лекцийн танхим.", details: { roomCode: "B-301", capacity: 60 } },
              ],
            },
            {
              id: "b3-room302",
              label: "B302-р Лекцийн Танхим",
              imageUrl: "/images/tour/b3-room302.jpg",
              hotspots: [
                { id: "b3-302-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "b3-corridor", tooltip: "← Коридор" },
                { id: "b3-302-info", type: "info", position: { yaw: 30, pitch: 5 }, title: "B302-р Лекцийн Танхим", description: "50 суудалтай лекцийн танхим.", details: { roomCode: "B-302", capacity: 50 } },
              ],
            },
          ],
        },
        {
          id: 4,
          label: "4-р давхар",
          defaultSceneId: "b4-corridor",
          scenes: [
            {
              id: "b4-corridor",
              label: "4-р давхрын коридор (B)",
              imageUrl: "/images/tour/b4-corridor.jpg",
              thumbnailUrl: "/images/tour/thumb-b4-corridor.jpg",
              defaultYaw: 0,
              hotspots: [
                { id: "b4-to-dept", type: "nav", position: { yaw: -60, pitch: -10 }, targetSceneId: "b4-department", tooltip: "Тэнхимийн өрөо →" },
              ],
            },
            {
              id: "b4-department",
              label: "Электроникийн Тэнхим",
              imageUrl: "/images/tour/b4-department.jpg",
              hotspots: [
                { id: "b4-dept-back", type: "nav", position: { yaw: 180, pitch: -5 }, targetSceneId: "b4-corridor", tooltip: "← Коридор" },
                { id: "b4-dept-info", type: "info", position: { yaw: 20, pitch: 5 }, title: "Электроникийн Тэнхим", description: "МТЭС-ийн электроникийн тэнхимийн профессор нарын өрөо.", details: { roomCode: "B-401", department: "Электроникийн тэнхим" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ── Helper functions ─────────────────────────────────────────

export function getBuilding(buildingId: string) {
  return TOUR_CONFIG.buildings.find((b) => b.id === buildingId);
}

export function getFloor(buildingId: string, floorId: number) {
  return getBuilding(buildingId)?.floors.find((f) => f.id === floorId);
}

export function getScene(buildingId: string, floorId: number, sceneId: string) {
  return getFloor(buildingId, floorId)?.scenes.find((s) => s.id === sceneId);
}

export function getAllScenes(buildingId: string, floorId: number) {
  return getFloor(buildingId, floorId)?.scenes ?? [];
}

export function findSceneGlobally(sceneId: string) {
  for (const building of TOUR_CONFIG.buildings) {
    for (const floor of building.floors) {
      const scene = floor.scenes.find((s) => s.id === sceneId);
      if (scene) return { building, floor, scene };
    }
  }
  return null;
}
