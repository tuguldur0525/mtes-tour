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
          <div className="glass rounded-xl overflow-hidden min-h-[320px] opacity-90">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.123456789!2d106.9274!3d47.9202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzEyLjciTiAxMDbCsDU1JzM4LjYiRQ!5e1!3m2!1smn!2smn!4v1234567890"
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="МТЭС байршил"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
