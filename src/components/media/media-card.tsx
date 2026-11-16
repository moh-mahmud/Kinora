import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import {
  displayTitle,
  mediaHref,
  releaseYear,
} from "@/lib/tmdb/client";
import { posterUrl } from "@/lib/tmdb/images";
import type { MediaSummary } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

export function MediaCard({
  item,
  className,
  priority = false,
}: {
  item: MediaSummary;
  className?: string;
  priority?: boolean;
}) {
  const href = mediaHref(item);
  const poster = posterUrl(item.poster_path, "w342");
  const year = releaseYear(item);
  const title = displayTitle(item);
  const rating = Number(item.vote_average);
  const ratingLabel = Number.isFinite(rating) ? rating.toFixed(1) : "—";

  return (
    <Link
      href={href}
      className={cn(
        "group relative block w-[140px] shrink-0 snap-start sm:w-[160px] lg:w-[176px]",
        className,
      )}
      data-slot="media-card"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-[#12141c] ring-1 ring-white/8 transition duration-300 group-hover:-translate-y-1 group-hover:ring-[var(--amber)]/50">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="176px"
            priority={priority}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#171a24] px-3 text-center text-xs text-[#9a958b]">
            No poster
          </div>
        )}
        <div className="poster-sheen pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 pt-8 opacity-0 transition group-hover:opacity-100">
          <div className="flex items-center gap-1 text-xs text-[#f4efe6]">
            <Star className="size-3 fill-[var(--amber)] text-[var(--amber)]" />
            {ratingLabel}
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-0.5">
        <p className="line-clamp-1 text-sm font-medium text-[#f4efe6]">{title}</p>
        <p className="text-xs text-[#9a958b]">
          {year ?? "—"}
          {item.media_type ? ` · ${item.media_type === "tv" ? "TV" : "Film"}` : ""}
        </p>
      </div>
    </Link>
  );
}

export function MediaCardSkeleton() {
  return (
    <div className="w-[140px] shrink-0 sm:w-[160px] lg:w-[176px]">
      <div className="aspect-[2/3] animate-pulse rounded-lg bg-white/5" />
      <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-white/5" />
      <div className="mt-1 h-3 w-1/2 animate-pulse rounded bg-white/5" />
    </div>
  );
}
