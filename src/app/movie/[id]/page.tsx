import { Suspense } from "react";
import type { Metadata } from "next";
import { NotFoundState, ErrorState } from "@/components/media/state-blocks";
import { TitleDetail } from "@/components/media/title-detail";
import { displayTitle, getTitleDetails, isReleased, releaseClock } from "@/lib/tmdb/client";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return { title: "Movie" };
  const item = await getTitleDetails("movie", numericId);
  if (!item) return { title: "Movie not found" };
  return {
    title: displayTitle(item),
    description: item.overview,
  };
}

async function MovieContent({ params }: { params: Params }) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16">
          <NotFoundState type="Movie" />
        </div>
      );
    }

    const item = await getTitleDetails("movie", numericId);
    if (!item) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16">
          <NotFoundState type="Movie" />
        </div>
      );
    }

    const { today } = await releaseClock();
    return <TitleDetail item={item} type="movie" released={isReleased(item, today)} />;
  } catch {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ErrorState title="Could not load this movie" />
      </div>
    );
  }
}

export default function MoviePage({ params }: { params: Params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="h-80 animate-pulse rounded-2xl bg-white/5" />
        </div>
      }
    >
      <MovieContent params={params} />
    </Suspense>
  );
}
