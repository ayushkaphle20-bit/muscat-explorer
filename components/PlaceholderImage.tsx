"use client";

import { useState } from "react";

const PALETTES = [
  ["#123C3B", "#1C5654"],
  ["#BB5836", "#9C4527"],
  ["#A3823C", "#7C6129"],
  ["#1C5654", "#0D2827"],
  ["#9C4527", "#6E2F19"],
];

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function PlaceholderImage({
  seed,
  label,
  src,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  seed: string;
  label?: string;
  src?: string;
  className?: string;
  aspect?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  if (src && !imgFailed) {
    return (
      <div className={`relative overflow-hidden ${aspect} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label || "Muscat Explorer photo"}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  const idx = hashSeed(seed) % PALETTES.length;
  const [c1, c2] = PALETTES[idx];
  const gradId = `g-${hashSeed(seed)}`;

  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={label || "Muscat Explorer placeholder image"}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${gradId})`} />
        <path d="M0 230 Q60 180 130 210 T260 200 T400 220 V300 H0 Z" fill="rgba(0,0,0,0.15)" />
        <path d="M0 260 Q80 220 180 245 T400 250 V300 H0 Z" fill="rgba(0,0,0,0.18)" />
        <circle cx="330" cy="70" r="26" fill="rgba(255,255,255,0.18)" />
      </svg>
      <div className="absolute inset-0 flex items-end p-3">
        <span className="rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
          Demo image
        </span>
      </div>
    </div>
  );
}
