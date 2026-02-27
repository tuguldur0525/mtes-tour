import type { Metadata } from "next";
import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Холбоо Барих",
  description: "МТЭС-ийн хаяг, утас, цахим шуудан болон байршлын мэдээлэл",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Холбоо Барих</h1>
          <p className="text-gray-400">
            МТЭС-тэй холбоо барих мэдээлэл болон байршлын зураглал.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                label: "Хаяг",
                value:
                  "Улаанбаатар хот, Сүхбаатар дүүрэг, Оюутны гудамж 14/3, МУИС-ийн 7, 8-р байр",
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
                className="glass rounded-xl p-4 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-navy-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                  <p className="text-gray-200 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="glass rounded-xl overflow-hidden min-h-72 relative">
            <iframe
              className="w-full h-full min-h-72"
              src="https://maps.app.goo.gl/6JutEW4sfdvNm1EJ8"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay pin and info */}
            <div className="absolute top-4 right-4 bg-white/95 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-red-500" />
              <div className="text-xs">
                <p className="font-semibold text-gray-900">47.9202, 106.9274</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
