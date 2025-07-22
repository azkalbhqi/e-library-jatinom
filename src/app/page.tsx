import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-green-50 to-emerald-100 text-gray-800 min-h-screen">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-emerald-700">
          Perpustakaan Digital <br /> Desa Jatinom
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Akses ilmu pengetahuan tanpa batas, langsung dari desamu.
        </p>
        <p className="mt-4 italic text-gray-500 max-w-xl">
          "Buku adalah jendela dunia, dan kita bisa membukanya kapan saja, di mana saja."
        </p>
        <Link href="/books" className="mt-8 px-6 py-3 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition">
          Mulai Membaca!
        </Link>
      </section>

      {/* TENTANG KAMI */}
      <section className="py-16 px-6 bg-white text-center" id="tentang">
        <h2 className="text-3xl font-semibold mb-4">Mengapa Membaca Itu Penting?</h2>
        <p className="max-w-2xl mx-auto text-gray-700">
          Membaca membuka cakrawala berpikir, menambah wawasan, dan memperkaya jiwa. Melalui perpustakaan digital ini, kami ingin mengajak seluruh warga Jatinom untuk kembali mencintai literasi—tanpa batasan waktu dan tempat.
        </p>
      </section>

      {/* QUOTES SECTION */}
      <section className="py-16 px-6 bg-emerald-50 text-center">
        <h2 className="text-3xl font-semibold mb-10">Kata Bijak Hari Ini</h2>
        <blockquote className="max-w-2xl mx-auto italic text-gray-700 text-xl">
          "Siapa pun yang berhenti belajar akan menjadi tua, baik dia berumur dua puluh atau delapan puluh tahun." <br />
          <span className="block mt-2 text-sm text-gray-500">– Henry Ford</span>
        </blockquote>
      </section>

      {/* AJAKAN MEMBACA */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Yuk Mulai Membaca Hari Ini!</h2>
        <p className="max-w-xl mx-auto text-gray-700">
          Perpustakaan digital ini bisa kamu akses dari HP, tablet, atau komputer. Tak perlu ke kota, cukup buka dan baca.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-700 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Perpustakaan Digital Desa Jatinom. Dibuat untuk semua warga yang haus ilmu.</p>
      </footer>
    </main>
  );
}
