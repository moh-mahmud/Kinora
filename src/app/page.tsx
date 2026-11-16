import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { MediaRow, MediaRowSkeleton } from "@/components/home/media-row";
import { ErrorState } from "@/components/media/state-blocks";
import { rethrowNextError } from "@/lib/rethrow";
import { getHomeCatalog } from "@/lib/tmdb/client";

async function HomeContent() {
  try {
    const catalog = await getHomeCatalog();

    return (
      <>
        <Hero item={catalog.hero} />
        <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {catalog.usingMockData && (
            <p className="animate-fade-up rounded-lg border border-[var(--amber)]/25 bg-[var(--amber)]/10 px-4 py-3 text-sm text-[#f0d2a0]">
              Running on the Kinora demo catalog. Add{" "}
              <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">
                TMDB_API_KEY
              </code>{" "}
              or{" "}
              <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">
                TMDB_READ_ACCESS_TOKEN
              </code>{" "}
              to load live TMDb data.
            </p>
          )}
          <MediaRow
            title="Trending this week"
            items={catalog.trending}
            href="/browse"
            delayMs={40}
          />
          <MediaRow
            title="Popular movies"
            items={catalog.popularMovies}
            href="/browse?type=movie"
            delayMs={100}
          />
          <MediaRow
            title="Top rated films"
            items={catalog.topRatedMovies}
            href="/browse?type=movie"
            delayMs={160}
          />
          <MediaRow
            title="Popular TV"
            items={catalog.popularTv}
            href="/browse?type=tv"
            delayMs={220}
          />
          <MediaRow
            title="Critically loved series"
            items={catalog.topRatedTv}
            href="/browse?type=tv"
            delayMs={280}
          />
          {catalog.genres.slice(0, 4).map((genre, index) => (
            <MediaRow
              key={genre.id}
              title={genre.name}
              items={catalog.byGenre[genre.id] ?? []}
              href={`/browse?genre=${genre.id}`}
              delayMs={320 + index * 60}
            />
          ))}
        </div>
      </>
    );
  } catch (error) {
    rethrowNextError(error);
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState
          title="Home feed unavailable"
          description="We hit a snag loading the catalog. Refresh the page or browse the demo titles once the service settles."
        />
      </div>
    );
  }
}

function HomeFallback() {
  return (
    <>
      <div className="relative -mt-16 min-h-[70vh] animate-pulse bg-[#12141c]" />
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <MediaRowSkeleton title="Trending this week" />
        <MediaRowSkeleton title="Popular movies" />
        <MediaRowSkeleton title="Top rated films" />
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeContent />
    </Suspense>
  );
}
