import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MediaCard, MediaCardSkeleton } from "@/components/media/media-card";
import type { MediaSummary } from "@/lib/tmdb/types";

export function MediaRow({
  title,
  items,
  href,
  delayMs = 0,
}: {
  title: string;
  items: MediaSummary[];
  href?: string;
  delayMs?: number;
}) {
  if (!items.length) {
    return (
      <section className="space-y-4" style={{ animationDelay: `${delayMs}ms` }}>
        <h2 className="font-display text-xl font-semibold tracking-tight text-[#f4efe6] sm:text-2xl">
          {title}
        </h2>
        <p className="text-sm text-[#9a958b]">Nothing in this row yet. Try another category.</p>
      </section>
    );
  }

  return (
    <section
      className="animate-row-in space-y-4"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight text-[#f4efe6] sm:text-2xl">
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm text-[var(--amber)] hover:text-[#f0b65f]"
          >
            See all
            <ChevronRight className="size-4" />
          </Link>
        )}
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-thin sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {items.map((item) => (
          <MediaCard key={`${item.media_type}-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
}

export function MediaRowSkeleton({ title }: { title: string }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold tracking-tight text-[#f4efe6] sm:text-2xl">
        {title}
      </h2>
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 7 }).map((_, index) => (
          <MediaCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
