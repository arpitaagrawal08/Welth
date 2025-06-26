'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f0ede3] flex flex-col items-center justify-center text-[#2f2f2f] p-6 relative overflow-hidden">
      {/* Background clouds */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/ghibli-clouds.png')] bg-cover opacity-20 animate-clouds" />

      {/* Floating leaf */}
      <div className="absolute w-20 h-20 top-10 right-10 animate-leaf">
        🍃
      </div>

      <div className="z-10 flex flex-col items-center text-center">
        {/* Cow illustration placeholder */}
        <div className="text-7xl mb-6">🐄</div>
        <h1 className="text-3xl sm:text-5xl font-semibold mb-4">
          Lost in the Meadow...
        </h1>
        <p className="max-w-md text-[#555] mb-6 text-lg">
          Just like our little cow, this page couldn’t find its way.
        </p>
        <Link
          href="/"
          className="bg-[#88c9bf] hover:bg-[#74b1a9] text-white px-6 py-2.5 rounded-full shadow-md transition">
          Take Me Home 🏡
        </Link>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#a4cf9c] to-transparent" />
    </div>
  );
}
