import type { Metadata } from "next";
import {
  GraduationCap,
  Cpu,
  Users,
  Award,
  BookOpen,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Сургуулийн Тухай",
  description:
    "МТЭС-ийн тухай мэдээлэл — тэнхимүүд, сургалтын хөтөлбөр, танилцуулга",
};

const DEPARTMENTS = [
  {
    icon: Cpu,
    name: "Мэдээлэл, компьютерын ухааны тэнхим",
    code: "МКУТ",
    programs: [
      "Компьютерын ухаан",
      "Мултимедиа технологи",
      "Программ хангамж",
      "Мэдээллийн систем",
      "Мэдээллийн технологи",
    ],
  },
  {
    icon: GraduationCap,
    name: "Электроник, холбооны инженерчлэлийн тэнхим",
    code: "ЭХИТ",
    programs: [
      "Компьютерын сүлжээ",
      "Холбооны технологи",
      "Электроникийн инженерчлэл",
    ],
  },
  {
    icon: Layers,
    name: "Хрэглээний математикийн тэнхим",
    code: "ХМТ",
    programs: ["Статистик", "Хэрэглээний математик"],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-navy-800/50 to-transparent py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Сургуулийн Тухай
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Мэдээлэл Технологи Электроникийн Сургууль (МТЭС) нь Монгол Улсын Их
            Сургуулийн (МУИС) харьяа, мэдээллийн технологийн чиглэлийн тэргүүлэх
            их дээд сургуулийн нэг юм.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Users, value: "3,000+", label: "Оюутан" },
            { icon: BookOpen, value: "10", label: "Хөтөлбөр" },
            { icon: Award, value: "80+", label: "Профессор" },
            { icon: GraduationCap, value: "2013", label: "Байгуулагдсан он" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="glass rounded-xl p-5 text-center">
              <Icon className="w-6 h-6 text-navy-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Departments */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Тэнхимүүд</h2>
          <div className="space-y-4">
            {DEPARTMENTS.map(({ icon: Icon, name, code, programs }) => (
              <div key={code} className="glass rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-700 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-navy-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-navy-700 text-navy-300 font-mono">
                        {code}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {programs.map((p) => (
                        <span
                          key={p}
                          className="text-xs px-3 py-1 rounded-full bg-navy-800/60 text-gray-400 border border-navy-700/40"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
