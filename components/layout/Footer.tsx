import Link from "next/link";
import { MapPin, Phone, Mail, Eye } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-700/50 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-navy-600 flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold">МТЭС Виртуал Аялал</span>
            </div>
            <p className="text-sm leading-relaxed">
              Мэдээлэл Технологи Электроникийн Сургуулийн (МТЭС) 360° виртуал кампус аялал.
              Монгол Улсын Их Сургуулийн харьяа.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Холбоосууд</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/tour", label: "360° Виртуал Аялал" },
                { href: "/about", label: "Сургуулийн Тухай" },
                { href: "/contact", label: "Холбоо Барих" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://mitis.edu.mn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  МТЭС-ийн Албан Сайт ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Холбоо Барих</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-navy-400 mt-0.5 shrink-0" />
                <span>Монгол Улс, Улаанбаатар, СХД, Их сургуулийн гудамж-1</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-navy-400 shrink-0" />
                <span>+976 7730-3000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-navy-400 shrink-0" />
                <span>info@mitis.edu.mn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-700/50 text-center text-xs text-gray-500">
          © 2026 МТЭС — МУИС. Бакалаврын дипломын ажил. Мультимедиа Технологи.
        </div>
      </div>
    </footer>
  );
}
