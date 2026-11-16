import Image from "next/image";
import Link from "next/link";
import { backdropUrl } from "@/lib/tmdb/images";
import type { SeasonDetails, SeasonSummary } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

export function EpisodeGuide({
  seasons,
  season,
  activeEpisode,
  seasonHref,
  episodeHref,
}: {
  seasons: SeasonSummary[];
  season: SeasonDetails | null;
  activeEpisode?: number;
  seasonHref: (seasonNumber: number) => string;
  episodeHref: (episodeNumber: number) => string;
}) {
  const ordered = [...seasons].sort(
    (a, b) => a.season_number - b.season_number,
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold text-[#f4efe6]">
          Episodes
        </h2>
        {season ? (
          <p className="text-sm text-[#9a958b]">
            {season.name || `Season ${season.season_number}`}
            {season.episodes.length
              ? ` · ${season.episodes.length} episode${season.episodes.length === 1 ? "" : "s"}`
              : ""}
          </p>
        ) : null}
      </div>

      {ordered.length > 0 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ordered.map((item) => {
            const selected = season?.season_number === item.season_number;
            const label =
              item.season_number === 0
                ? "Specials"
                : item.name || `Season ${item.season_number}`;
            return (
              <Link
                key={`${item.id ?? "season"}-${item.season_number}`}
                href={seasonHref(item.season_number)}
                className={cn(
                  "shrink-0 rounded-md border px-3 py-1.5 text-sm",
                  selected
                    ? "border-[var(--amber)]/50 bg-[var(--amber)]/15 text-[var(--amber)]"
                    : "border-white/10 text-[#c9c3b8] hover:border-white/20",
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      ) : null}

      {!season || season.episodes.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-6 text-sm text-[#9a958b]">
          Episode list is unavailable for this season.
        </p>
      ) : (
        <ol className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
          {season.episodes.map((episode) => {
            const still = backdropUrl(episode.still_path, "w300");
            const playing = activeEpisode === episode.episode_number;
            return (
              <li key={episode.id || episode.episode_number}>
                <Link
                  href={episodeHref(episode.episode_number)}
                  className={cn(
                    "flex gap-4 px-3 py-3 transition-colors hover:bg-white/[0.04] sm:px-4",
                    playing && "bg-[var(--amber)]/10",
                  )}
                >
                  <div className="relative hidden h-16 w-28 shrink-0 overflow-hidden rounded-md bg-[#12141c] sm:block">
                    {still ? (
                      <Image
                        src={still}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-xs text-[#6f6a62]">
                        {episode.episode_number}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#f4efe6]">
                      <span className="mr-2 text-[#9a958b]">
                        {episode.episode_number}
                      </span>
                      {episode.name || `Episode ${episode.episode_number}`}
                      {playing ? (
                        <span className="ml-2 text-xs font-normal text-[var(--amber)]">
                          Now playing
                        </span>
                      ) : null}
                    </p>
                    {episode.overview ? (
                      <p className="mt-1 line-clamp-2 text-sm text-[#9a958b]">
                        {episode.overview}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
