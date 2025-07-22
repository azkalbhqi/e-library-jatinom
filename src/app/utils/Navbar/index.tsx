import Link from "next/link";

const Navbar = () => {
  return (
    <div className="py-5 px-10 flex justify-between items-center bg-white shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">
        Perpustakaan Digital Jatinom
      </h1>
      <div className="space-x-6 flex items-center">
        {[
          { href: "/", label: "Home" },
          { href: "/books", label: "Books" },
        ].map((item, idx) => (
          <Link key={idx} href={item.href}>
            <span className="relative group text-gray-700 font-medium transition duration-300">
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
