"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";

type Book = {
  drive_id: string;
  title: string;
  author: string;
  link: string;
  image: string;
  desc: string;
  category: string;
};

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function BookDetail() {
  const { slug } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch("/data/books.json");
        const books: Book[] = await res.json();

        const found = books.find(
          (b) => slugify(b.title) === slug
        );

        setBook(found || null);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch books", err);
        setBook(null);
        setLoading(false);
      }
    }

    fetchBook();
  }, [slug]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!book) {
    return <div className="p-6 text-center text-gray-500">Buku tidak ditemukan</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
      href="/"
      className="inline-block text-blue-600 hover:underline mb-6"
    >
      ← Back to home
    </Link>
      <div className="grid md:grid-cols-2 gap-8">
      <img
        src={book.image}
        alt={book.title}
        className="rounded shadow w-full h-auto object-cover"
      />

        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-2">by {book.author}</p>
          <p className="text-sm text-indigo-500 italic mb-4">{book.category}</p>
          <p className="mb-4 text-gray-700">{book.desc}</p>

          <div className="flex justify-between">
            <Link
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mt-4"
            >
              📖 Read
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}${book.drive_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mt-4"
            >
              📖 Download
            </Link>
          </div>
        </div>
          
      </div>
    </div>
  );
}
