import Image from "next/image";
import Link from "next/link";

export default function TileCard({ tile }) {
  return (
    <Link
      href={`/tiles/${tile.id}`}
      className="relative block overflow-hidden py-6 rounded-2xl group"
    >
      {/* Image */}
      <div className="relative w-full h-[300px]">
        <Image
          src={tile.image}
          alt={tile.title}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* Text Content */}
      <div className="absolute bottom-4 left-4 text-white">
        <h2 className="text-lg font-bold">{tile.title}</h2>
        <p className="text-sm opacity-80 capitalize">{tile.category}</p>
      </div>

      {/* Arrow Icon */}
      <div className="absolute bottom-4 right-4 text-white text-xl">
        ↗
      </div>
    </Link>
  );
}