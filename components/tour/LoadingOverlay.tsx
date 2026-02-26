"use client";
import { motion } from "framer-motion";

export function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-navy-900/90 backdrop-blur-sm"
    >
      <div className="relative mb-6">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-full border-2 border-navy-700" />
        {/* Spinning arc */}
        <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-navy-400 border-t-transparent animate-spin" />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-navy-400 animate-pulse" />
        </div>
      </div>
      <p className="text-white font-medium text-sm">Зураг ачаалж байна...</p>
      <p className="text-gray-500 text-xs mt-1">360° панорама бэлдэж байна</p>
    </motion.div>
  );
}
