import { notFound } from "next/navigation";
import { Metadata } from "next";

type Book = {
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

async function getBook(slug: string): Promise<Book | null> {
  const res = await fetch("http://localhost:3000/data/books.json", {
    cache: "no-store"
  });

  if (!res.ok) return null;

  const books: Book[] = await res.json();

  return (
    books.find((b) => slugify(b.title) === slug) || null
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const book = await getBook(params.slug);
  if (!book) return {};
  return {
    title: `${book.title} - E-Library`,
  };
}

export default async function BookDetail({
  params,
}: {
  params: { slug: string };
}) {
  const book = await getBook(params.slug);

  if (!book) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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

          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mt-4"
          >
            📖 Read / Download
          </a>
        </div>
      </div>
    </div>
  );
}
