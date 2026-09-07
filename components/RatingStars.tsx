import { Star } from "lucide-react";

export default function RatingStars({
  rating,
  reviewCount,
  size = 14,
}: {
  rating: number;
  reviewCount?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-[var(--color-brass)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            fill={i < Math.round(rating) ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-[var(--color-ink)]">
        {rating.toFixed(1)}
      </span>
      {typeof reviewCount === "number" && (
        <span className="text-sm text-[var(--color-ink-soft)]">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
