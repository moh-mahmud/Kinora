import { Suspense } from "react";
import Link from "next/link";
import { BrowseFilters } from "@/components/media/browse-filters";
import { MediaCard, MediaCardSkeleton } from "@/components/media/media-card";
import { EmptyState, ErrorState } from "@/components/media/state-blocks";
import { browseMedia, getGenres } from "@/lib/tmdb/client";

type BrowseSearchParams = Promise<{
  q?: string;
  type?: string;
  genre?: string;
  page?: string;
}>;

async function BrowseResults({
  searchParams,
}: {
  searchParams: BrowseSearchParams;
}) {
  try {
    const params = await searchParams;
    const query = params.q?.trim() ?? "";
    const typeParam = params.type;
    const type =
      typeParam === "movie" || typeParam === "tv" || typeParam === "all"
        ? typeParam
        : "all";
    const genre = params.genre ? Number(params.genre) : undefined;
    const page = params.page ? Number(params.page) || 1 : 1;

    const [genres, results] = await Promise.all([
      getGenres(),
      browseMedia({ type, genre, query, page }),
    ]);

    return (
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-fade-up space-y-3">
          <p className="text-sm tracking-[0.2em] text-[var(--teal)] uppercase">
            Catalog
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#f4efe6] sm:text-4xl">
            Browse Kinora
          </h1>
          <p className="max-w-2xl text-[#9a958b]">
            Search films and series, filter by genre, then jump straight into a
            title page or the watch room.
          </p>
        </div>

        <BrowseFilters genres={genres} />

        {results.results.length === 0 ? (
          <EmptyState
            title={query ? `No matches for “${query}”` : "No titles found"}
            description="Try a different search, clear filters, or return to the full catalog."
            actionHref="/browse"
            actionLabel="Clear filters"
          />
        ) : (
          <>
            <p className="text-sm text-[#9a958b]">
              Showing {results.results.length} of {results.total_results} titles
              {query ? ` for “${query}”` : ""}
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {results.results.map((item) => (
                <MediaCard
                  key={`${item.media_type}-${item.id}`}
                  item={item}
                  className="w-full shrink"
                />
              ))}
            </div>
            <div className="flex items-center justify-between gap-4 pt-4">
              {page > 1 ? (
                <Link
                  href={`/browse?${new URLSearchParams({
                    ...(query ? { q: query } : {}),
                    ...(type !== "all" ? { type } : {}),
                    ...(genre ? { genre: String(genre) } : {}),
                    page: String(page -01),
                  }).toString()}`}
                  className="text-sm text-[var(--amber)] hover:text-[#f0b65f]"
                >
                  Previous
                </Link>
              ) : (
                <span />
              )}
              <span className="text-sm text-[#9a958b]">
                Page {results.page} of {results.total_pages}
              </span>
              {page < results.total_pages ? (
                <Link
                  href={`/browse?${new URLSearchParams({
                    ...(query ? { q: query } : {}),
                    ...(type !== "all" ? { type } : {}),
                    ...(genre ? { genre: String(genre) } : {}),
                    page: String(page + 1),
                  }).toString()}`}
                  className="text-sm text-[var(--amber)] hover:text-[#f0b65f]"
                >
                  Next
                </Link>
              ) : (
                <span />
              )}
            </div>
          </>
        )}
      </div>
    );
  } catch {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState title="Browse unavailable" />
      </div>
    );
  }
}

function BrowseFallback() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-24 animate-pulse rounded-xl bg-white/5" />
      <div className="h-28 animate-pulse rounded-xl bg-white/5" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <MediaCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default function BrowsePage({
  searchParams,
}: {
  searchParams: BrowseSearchParams;
}) {
  return (
    <Suspense fallback={<BrowseFallback />}>
      <BrowseResults searchParams={searchParams} />
    </Suspense>
  );
}
