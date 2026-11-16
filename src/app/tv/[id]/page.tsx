import { Suspense } from "react";
import type { Metadata } from "next";
import { NotFoundState, ErrorState } from "@/components/media/state-blocks";
import { TitleDetail } from "@/components/media/title-detail";
import { displayTitle, getTitleDetails, getTvSeason, isReleased, releaseClock } from "@/lib/tmdb/client";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ season?: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return { title: "TV show" };
  const item = await getTitleDetails("tv", numericId);
  if (!item) return { title: "Show not found" };
  return {
    title: displayTitle(item),
    description: item.overview,
  };
}

async function TvContent({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  try {
    const [{ id }, query] = await Promise.all([params, searchParams]);
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16">
          <NotFoundState type="Show" />
        </div>
      );
    }

    const item = await getTitleDetails("tv", numericId);
    if (!item) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16">
          <NotFoundState type="Show" />
        </div>
      );
    }

    const requested = query.season ? Number(query.season) : 1;
    const seasonNumber =
      Number.isFinite(requested) && requested >= 0 ? requested : 1;
    const { today } = await releaseClock();
    const season = await getTvSeason(numericId, seasonNumber);

    return (
      <TitleDetail
        item={item}
        type="tv"
        season={season}
        released={isReleased(item, today)}
      />
    );
  } catch {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ErrorState title="Could not load this show" />
      </div>
    );
  }
}

export default function TvPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="h-80 animate-pulse rounded-2xl bg-white/5" />
        </div>
      }
    >
      <TvContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
