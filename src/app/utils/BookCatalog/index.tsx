"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Book = {
  title: string;
  author: string;
  link: string;
  image: string;
  desc: string;
  category: string;
};

const slugify = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  

const BookCatalog: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then(setBooks)
      .catch((err) => console.error("Failed to load books:", err));
  }, []);

  const categories = ["Semua", ...Array.from(new Set(books.map((book) => book.category)))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">


      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari Buku atau Penulis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border text-gray-500 p-2 rounded w-full md:w-1/3"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredBooks.map((book, index) => (
          <div key={index} className="border rounded-lg shadow p-4">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-fit object-cover rounded mb-4"
              loading="lazy"
            />

            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="grow">
                {book.desc.length > 100 ? `${book.desc.slice(0, 100)}...` : book.desc}
            </p>
            <p className="text-xs text-indigo-600 mt-1 italic">{book.category}</p>
            <div className="flex justify-between">
            <Link
                href={`/books/${slugify(book.title)}`}
                className="inline-block mt-3 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                Lihat Buku
            </Link>
            <Link
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                Baca / Unduh
            </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <p className="mt-6 text-center text-gray-500">Buku tidak ditemukan</p>
      )}
    </div>
  );
};

export default BookCatalog;
