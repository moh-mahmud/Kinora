import { Suspense } from "react";
import type { Metadata } from "next";
import { NotFoundState, ErrorState } from "@/components/media/state-blocks";
import { TitleDetail } from "@/components/media/title-detail";
import { displayTitle, getTitleDetails } from "@/lib/tmdb/client";

type Params = Promise<{ id: string }>;

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

async function TvContent({ params }: { params: Params }) {
  try {
    const { id } = await params;
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

    return <TitleDetail item={item} type="tv" />;
  } catch {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ErrorState title="Could not load this show" />
      </div>
    );
  }
}

export default function TvPage({ params }: { params: Params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="h-80 animate-pulse rounded-2xl bg-white/5" />
        </div>
      }
    >
      <TvContent params={params} />
    </Suspense>
  );
}
