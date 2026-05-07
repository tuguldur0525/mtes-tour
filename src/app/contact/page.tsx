import type { Metadata } from "next";
import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Холбоо Барих",
  description: "МТЭС-ийн хаяг, утас, цахим шуудан болон байршлын мэдээлэл",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* ✅ Header (same as About page) */}
      <div className="bg-gradient-to-b from-navy-800/50 to-transparent py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Холбоо Барих</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Та МТЭС-тэй холбогдохын тулд доорх хаяг, утас, цахим шуудангийн
            мэдээллийг ашиглах боломжтой. Мөн сургуулийн байршлыг газрын зураг
            дээрээс харан, очих чиглэлээ хялбар тодорхойлоорой.
          </p>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                label: "Хаяг",
                value:
                  "Улаанбаатар хот, Сүхбаатар дүүрэг, Оюутны гудамж 14/3, МУИС хичээлийн 7-р байр",
              },
              { icon: Phone, label: "Утас", value: "+976 7575-4400" },
              { icon: Mail, label: "Цахим шуудан", value: "info@mtes.edu.mn" },
              { icon: Globe, label: "Вэбсайт", value: "www.site.num.edu.mn" },
              {
                icon: Clock,
                label: "Цагийн хуваарь",
                value: "Даваа-Баасан: 08:00-17:00",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="glass rounded-xl p-5 flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-700 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-navy-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="text-gray-200 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="glass rounded-xl overflow-hidden min-h-[320px] opacity-99 relative">
            {/* Dark overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{ background: "rgba(13,27,42,0.3)" }}
            />
            <iframe
              src="https://www.google.com/maps?q=%D0%9C%D0%A3%D0%98%D0%A1+%D1%85%D0%B8%D1%87%D1%8D%D1%8D%D0%BB%D0%B8%D0%B9%D0%BD+7-%D1%80+%D0%B1%D0%B0%D0%B9%D1%80&z=14&output=embed"
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="МУИС хичээлийн 7-р байр"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
