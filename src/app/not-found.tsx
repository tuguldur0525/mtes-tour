import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-navy-700 mb-4">404</p>
      <h1 className="text-2xl font-bold text-white mb-2">Хуудас олдсонгүй</h1>
      <p className="text-gray-400 mb-8">Таны хайсан хуудас байхгүй байна.</p>
      <Link href="/" className="px-6 py-3 rounded-xl bg-navy-600 hover:bg-navy-500 text-white font-medium transition-colors">
        Нүүр хуудас руу буцах
      </Link>
    </div>
  );
}
