import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { NotFoundState, ErrorState } from "@/components/media/state-blocks";
import { WatchPlayer } from "@/components/watch/player";
import { buttonVariants } from "@/components/ui/button";
import {
  displayTitle,
  getTitleDetails,
  mediaHref,
} from "@/lib/tmdb/client";
import type { MediaType } from "@/lib/tmdb/types";
import { buildVidsrcEmbedUrl } from "@/lib/vidsrc";
import { cn } from "@/lib/utils";

type Params = Promise<{ type: string; id: string }>;
type SearchParams = Promise<{ season?: string; episode?: string }>;

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

    const item = await getTitleDetails(type, numericId);
    if (!item) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16">
          <NotFoundState type="Title" />
        </div>
      );
    }

    const season = query.season ? Number(query.season) || 1 : 1;
    const episode = query.episode ? Number(query.episode) || 1 : 1;
    const title = displayTitle(item);
    const embedUrl = buildVidsrcEmbedUrl(type, numericId, {
      season,
      episode,
    });

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
                ? `Season ${season} · Episode ${episode} · VidSrc embed`
                : "VidSrc embed powered by TMDb id"}
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

        <WatchPlayer src={embedUrl} title={title} />

        {type === "tv" && (
          <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="w-full text-sm text-[#9a958b]">Quick episode jump</p>
            {[1, 2, 3, 4, 5].map((ep) => (
              <Link
                key={ep}
                href={`/watch/tv/${numericId}?season=${season}&episode=${ep}`}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm",
                  ep === episode
                    ? "border-[var(--amber)]/50 bg-[var(--amber)]/15 text-[var(--amber)]"
                    : "border-white/10 text-[#c9c3b8] hover:border-white/20",
                )}
              >
                Ep {ep}
              </Link>
            ))}
          </div>
        )}

        <p className="text-xs leading-relaxed text-[#6f6a62]">
          Playback is embedded from VidSrc using documented{" "}
          <code className="rounded bg-white/5 px-1">/embed/{"{type}/{tmdbId}"}</code>{" "}
          URLs. Availability depends on the upstream provider. Kinora does not
          host video files.
        </p>
      </div>
    );
  } catch {
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
