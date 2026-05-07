"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  MapPin,
  Users,
  Layers,
  Eye,
  Compass,
} from "lucide-react";
import { TOUR_CONFIG } from "@/lib/tour.config";
import type { TourBuilding } from "@/types/tour";

export default function HomePage() {
  const [comingSoon, setComingSoon] = useState<TourBuilding | null>(null);

  const totalScenes = TOUR_CONFIG.buildings.reduce(
    (sum, b) => sum + b.floors.reduce((fs, f) => fs + f.scenes.length, 0),
    0,
  );

  const buildingCount = TOUR_CONFIG.buildings.length;
  const floorCount = TOUR_CONFIG.buildings.reduce(
    (sum, b) => sum + b.floors.length,
    0,
  );

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-[#0d2137] to-[#0a1628]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy-600/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-700/15 rounded-full blur-3xl animate-pulse-slow [animation-delay:1.5s]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(46,117,182,1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,117,182,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 sm:py-10 pt-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-navy-200">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            МУИС — Мэдээллийн Технологи, Электроникийн Сургууль
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in">
            МТЭС-ийн{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-400 to-blue-400">
              360°
            </span>{" "}
            Виртуал Аялал
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
            Хүссэн газраасаа МТЭС-ийн барилга, лаборатори, танхимуудыг харж,
            дотоод орчинтой танилцаарай
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:200ms]">
            <Link
              href="/tour?building=A"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-navy-600 hover:bg-navy-500 text-white font-semibold text-lg transition-all duration-300 shadow-xl shadow-navy-900/50 hover:shadow-navy-600/40 hover:scale-105"
            >
              <Eye className="w-5 h-5" />
              Аялал Эхлүүлэх
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-gray-200 font-semibold text-lg hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Сургуулийн Тухай
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up [animation-delay:400ms]">
            {[
              {
                icon: Building2,
                value: String(buildingCount),
                label: "Барилга",
              },
              { icon: Layers, value: String(floorCount - 3), label: "Давхар" },
              { icon: MapPin, value: `${totalScenes}+`, label: "Байрлал" },
              { icon: Compass, value: "360°", label: "Панорама" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass rounded-xl p-4 text-center">
                <Icon className="w-5 h-5 text-navy-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-1 text-gray-500 animate-bounce sm:flex">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-gray-500" />
          <span className="text-xs text-center">Доошоо гүйлгэ</span>
        </div>
      </section>

      {/* ── Buildings section ─────────────────── */}
      <section className="py-24 bg-gradient-to-b from-[#0a1628] to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Барилгуудаас Сонгох
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Монгол улсын их сургуулийн хичээлийн байр тус бүр өөр өөр давхар,
              орчинтой. Та доорх сонголтоос хүссэн барилгаа сонгон виртуал
              аяллаа эхлүүлээрэй.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto auto-rows-fr">
            {TOUR_CONFIG.buildings.map((building) => {
              const sceneCount = building.floors.reduce(
                (s, f) => s + f.scenes.length,
                0,
              );

              const cardInner = (
                <div className="flex flex-col h-full">
                  <div className="h-64 relative overflow-hidden rounded-t-2xl">
                    {building.thumbnailUrl ? (
                      <img
                        src={building.thumbnailUrl}
                        alt={building.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                        <Building2 className="w-20 h-20 text-navy-500 group-hover:text-navy-400 transition-colors" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-800/30 to-navy-900/30" />
                    {building.comingSoon ? (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-amber-500/80 text-xs text-white font-semibold">
                        Тун удахгүй
                      </div>
                    ) : null}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-navy-200 transition-colors">
                      {building.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {building.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        {building.floors.length - 1} давхар
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {sceneCount} байрлал
                      </span>
                    </div>
                    <div className="mt-auto">
                      {building.comingSoon ? (
                        <div className="flex items-center text-amber-400/80 text-sm font-medium">
                          Хөгжүүлэлт явагдаж байна
                        </div>
                      ) : (
                        <div className="flex items-center text-navy-400 text-sm font-medium group-hover:text-navy-300 transition-colors">
                          Аялал эхлүүлэх
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );

              return building.comingSoon ? (
                <button
                  key={building.id}
                  onClick={() => setComingSoon(building)}
                  className="group relative overflow-hidden rounded-2xl glass border border-navy-600/30 hover:border-amber-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-navy-900/50 text-left w-full h-full"
                >
                  {cardInner}
                </button>
              ) : (
                <Link
                  key={building.id}
                  href={`/tour?building=${building.id}&floor=0`}
                  className="group relative overflow-hidden rounded-2xl glass border border-navy-600/30 hover:border-navy-500/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-navy-900/50 h-full"
                >
                  {cardInner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────── */}
      <section className="py-24 bg-navy-900 border-t border-navy-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Онцлогууд</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🖥️",
                title: "Desktop & Mobile",
                desc: "Компьютер болон утасны аль алинд бүрэн ажилладаг.",
              },
              {
                icon: "📱",
                title: "Gyroscope дэмжлэг",
                desc: "Гар утасны хөдөлгүүр мэдрэгчээр эргэн тойрноо харах.",
              },
              {
                icon: "🗺️",
                title: "Давхрын Зураглал",
                desc: "Та одоо хаана байгаагаа floor map-аас харна.",
              },
              {
                icon: "ℹ️",
                title: "Мэдээллийн Цонхнууд",
                desc: "Өрөө тус бүрийн дэлгэрэнгүй мэдээлэл — тоног, багтаамж.",
              },
              {
                icon: "🔗",
                title: "Холбоос хуваалцах",
                desc: "Тодорхой байрлалд шууд очих URL-г хуулж хуваалцана.",
              },
              {
                icon: "🥽",
                title: "VR Горим",
                desc: "Google Cardboard-той VR headset-ээ ашиглах боломжтой.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="glass rounded-xl p-6 hover:border-navy-500/50 transition-colors"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Coming Soon Modal ─────────────────── */}
      {comingSoon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "rgba(7,16,36,0.85)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setComingSoon(null)}
        >
          <div
            className="relative flex flex-col items-center gap-5 px-10 py-10 rounded-2xl text-center shadow-2xl"
            style={{
              background: "rgba(31,78,121,0.6)",
              border: "1px solid rgba(99,155,255,0.2)",
              maxWidth: 380,
              margin: "0 16px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{
                background: "rgba(99,155,255,0.12)",
                border: "1px solid rgba(99,155,255,0.25)",
              }}
            >
              🏗️
            </div>
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: "rgba(99,155,255,0.8)" }}
              >
                Тун удахгүй
              </p>
              <h2 className="text-xl font-bold text-white mb-2">
                {comingSoon.name}
              </h2>
              <p className="text-sm" style={{ color: "rgba(180,195,220,0.8)" }}>
                Энэ барилгын 360° виртуал аялал хөгжүүлэлтийн шатанд байгаа ба
                удахгүй нээгдэх болно.
              </p>
            </div>
            <button
              onClick={() => setComingSoon(null)}
              className="mt-1 px-6 py-2 rounded-lg text-sm font-medium text-white transition-colors"
              style={{
                background: "rgba(99,155,255,0.2)",
                border: "1px solid rgba(99,155,255,0.35)",
              }}
            >
              Буцах
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
