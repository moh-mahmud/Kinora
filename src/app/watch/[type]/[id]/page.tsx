import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { NotFoundState, ErrorState, EmptyState } from "@/components/media/state-blocks";
import { EpisodeGuide } from "@/components/media/episode-guide";
import { WatchPlayer } from "@/components/watch/player";
import { buttonVariants } from "@/components/ui/button";
import {
  displayTitle,
  getTitleDetails,
  getTvSeason,
  isReleased,
  mediaHref,
  releaseClock,
  releaseYear,
} from "@/lib/tmdb/client";
import { rethrowNextError } from "@/lib/rethrow";
import type { MediaType } from "@/lib/tmdb/types";
import {
  EMBED_SOURCES,
  buildEmbedUrl,
  parseEmbedSource,
} from "@/lib/vidsrc";
import { cn } from "@/lib/utils";

type Params = Promise<{ type: string; id: string }>;
type SearchParams = Promise<{
  season?: string;
  episode?: string;
  source?: string;
}>;

function parseType(value: string): MediaType | null {
  return value === "movie" || value === "tv" ? value : null;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { type: typeParam, id } = await params;
  const type = parseType(typeParam);
  const numericId = Number(id);
  if (!type || !Number.isFinite(numericId)) return { title: "Watch" };
  const item = await getTitleDetails(type, numericId);
  if (!item) return { title: "Watch" };
  return { title: `Watch ${displayTitle(item)}` };
}

async function WatchContent({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  try {
    const [{ type: typeParam, id }, query] = await Promise.all([
      params,
      searchParams,
    ]);
    const type = parseType(typeParam);
    const numericId = Number(id);

    if (!type || !Number.isFinite(numericId)) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16">
          <NotFoundState type="Title" />
        </div>
      );
    }

    const requestedSeason = query.season ? Number(query.season) : 1;
    const season =
      Number.isFinite(requestedSeason) && requestedSeason >= 0
        ? requestedSeason
        : 1;
    const requestedEpisode = query.episode ? Number(query.episode) : 1;
    const episode =
      Number.isFinite(requestedEpisode) && requestedEpisode > 0
        ? requestedEpisode
        : 1;

    const [item, seasonDetails] = await Promise.all([
      getTitleDetails(type, numericId),
      type === "tv" ? getTvSeason(numericId, season) : Promise.resolve(null),
    ]);
    if (!item) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16">
          <NotFoundState type="Title" />
        </div>
      );
    }
    const title = displayTitle(item);
    const source = parseEmbedSource(query.source);
    const { today } = await releaseClock();

    if (!isReleased(item, today)) {
      return (
        <div className="mx-auto max-w-3xl px-4 py-16">
          <EmptyState
            title={`${title} is not available yet`}
            description={`VidSrc only has a stream after a title is released${releaseYear(item) ? ` (${releaseYear(item)})` : ""}. Pick a movie that is already out.`}
            actionHref="/browse?type=movie"
            actionLabel="Browse released movies"
          />
        </div>
      );
    }

    const embedUrl = buildEmbedUrl(source, type, numericId, {
      season,
      episode,
    });
    const watchQuery = (next: {
      source?: string;
      season?: number;
      episode?: number;
    }) => {
      const params = new URLSearchParams();
      const nextSource = next.source ?? source;
      if (nextSource !== "vidsrc") params.set("source", nextSource);
      if (type === "tv") {
        params.set("season", String(next.season ?? season));
        params.set("episode", String(next.episode ?? episode));
      }
      const qs = params.toString();
      return `/watch/${type}/${numericId}${qs ? `?${qs}` : ""}`;
    };

    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-fade-up flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href={mediaHref({ ...item, media_type: type })}
              className="inline-flex items-center gap-1.5 text-sm text-[#9a958b] hover:text-[#f4efe6]"
            >
              <ArrowLeft className="size-4" />
              Back to details
            </Link>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#f4efe6] sm:text-3xl">
              Watching {title}
            </h1>
            <p className="mt-1 text-sm text-[#9a958b]">
              {type === "tv"
                ? `Season ${season} · Episode ${episode}`
                : "If this source says the media is unavailable, try another."}
            </p>
          </div>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-white/15",
            )}
          >
            Home
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {EMBED_SOURCES.map((option) => (
            <Link
              key={option.id}
              href={watchQuery({ source: option.id })}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm",
                option.id === source
                  ? "border-[var(--amber)]/50 bg-[var(--amber)]/15 text-[var(--amber)]"
                  : "border-white/10 text-[#c9c3b8] hover:border-white/20",
              )}
            >
              {option.label}
            </Link>
          ))}
        </div>

        <WatchPlayer src={embedUrl} title={title} />

        {type === "tv" && (
          <EpisodeGuide
            seasons={item.seasons ?? []}
            season={seasonDetails}
            activeEpisode={episode}
            seasonHref={(seasonNumber) =>
              watchQuery({ season: seasonNumber, episode: 1 })
            }
            episodeHref={(episodeNumber) =>
              watchQuery({ episode: episodeNumber })
            }
          />
        )}

        <p className="text-xs leading-relaxed text-[#6f6a62]">
          Playback comes from a third-party embed keyed by the TMDb id.
          A source can still say the media is unavailable when it has no file
          for that title. Kinora does not host video.
        </p>
      </div>
    );
  } catch (error) {
    rethrowNextError(error);
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ErrorState title="Watch page unavailable" />
      </div>
    );
  }
}

export default function WatchPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="aspect-video animate-pulse rounded-xl bg-white/5" />
        </div>
      }
    >
      <WatchContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
