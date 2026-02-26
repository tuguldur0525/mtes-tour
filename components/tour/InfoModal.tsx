"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Hash, Building2, Cpu } from "lucide-react";
import type { InfoHotspot } from "@/types/tour";

interface InfoModalProps {
  hotspot: InfoHotspot | null;
  onCloseAction: () => void;
}

export function InfoModal({ hotspot, onCloseAction }: InfoModalProps) {
  return (
    <AnimatePresence>
      {hotspot && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseAction}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm mx-4"
          >
            <div className="glass-dark rounded-2xl p-5 shadow-2xl border border-navy-600/40">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-bold text-lg leading-snug pr-2">
                  {hotspot.title}
                </h3>
                <button
                  onClick={onCloseAction}
                  className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {hotspot.description}
              </p>

              {/* Details grid */}
              {hotspot.details && (
                <div className="space-y-2">
                  {hotspot.details.roomCode && (
                    <DetailRow
                      icon={<Hash className="w-3.5 h-3.5" />}
                      label="Өрөөний код"
                      value={hotspot.details.roomCode}
                    />
                  )}
                  {hotspot.details.capacity && (
                    <DetailRow
                      icon={<Users className="w-3.5 h-3.5" />}
                      label="Суудлын тоо"
                      value={`${hotspot.details.capacity} суудал`}
                    />
                  )}
                  {hotspot.details.department && (
                    <DetailRow
                      icon={<Building2 className="w-3.5 h-3.5" />}
                      label="Тэнхим"
                      value={hotspot.details.department}
                    />
                  )}
                  {hotspot.details.equipment &&
                    hotspot.details.equipment.length > 0 && (
                      <div className="flex gap-2 pt-1">
                        <Cpu className="w-3.5 h-3.5 text-navy-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Тоног төхөөрөмж
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {hotspot.details.equipment.map((eq) => (
                              <span
                                key={eq}
                                className="px-2 py-0.5 rounded-md bg-navy-700/60 text-gray-300 text-xs border border-navy-600/40"
                              >
                                {eq}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-navy-400 shrink-0">{icon}</span>
      <span className="text-xs text-gray-500 shrink-0">{label}:</span>
      <span className="text-sm text-gray-200 font-medium">{value}</span>
    </div>
  );
}
