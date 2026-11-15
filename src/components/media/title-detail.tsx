import Image from "next/image";
import Link from "next/link";
import { Clock, Play, Star } from "lucide-react";
import { CastList } from "@/components/media/cast-list";
import { MediaRow } from "@/components/home/media-row";
import { buttonVariants } from "@/components/ui/button";
import {
  displayTitle,
  releaseYear,
  watchHref,
} from "@/lib/tmdb/client";
import { backdropUrl, posterUrl } from "@/lib/tmdb/images";
import type { MediaDetails, MediaType } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

export function TitleDetail({
  item,
  type,
}: {
  item: MediaDetails;
  type: MediaType;
}) {
  const title = displayTitle(item);
  const year = releaseYear(item);
  const poster = posterUrl(item.poster_path, "w500");
  const backdrop = backdropUrl(item.backdrop_path, "w1280");
  const runtime =
    type === "movie"
      ? item.runtime
      : item.episode_run_time?.[0];
  const playHref = watchHref(type, item.id);

  return (
    <div>
      <section className="relative -mt-16 min-h-[52vh] overflow-hidden">
        {backdrop ? (
          <Image
            src={backdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-ken object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-[#12141c]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/75 to-[#07080c]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080c]/90 via-[#07080c]/40 to-transparent" />
      </section>

      <div className="relative mx-auto -mt-40 max-w-7xl px-4 pb-16 sm:-mt-48 sm:px-6 lg:px-8">
        <div className="animate-fade-up grid gap-8 lg:grid-cols-[220px_1fr]">
          <div className="relative mx-auto aspect-[2/3] w-48 overflow-hidden rounded-xl bg-[#12141c] shadow-2xl ring-1 ring-white/10 sm:w-56 lg:mx-0 lg:w-full">
            {poster ? (
              <Image
                src={poster}
                alt={title}
                fill
                sizes="220px"
                className="object-cover"
                priority
              />
            ) : null}
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm tracking-[0.2em] text-[var(--teal)] uppercase">
                {type === "tv" ? "Series" : "Film"}
                {year ? ` · ${year}` : ""}
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#f4efe6] sm:text-5xl">
                {title}
              </h1>
              {item.tagline ? (
                <p className="mt-2 text-lg text-[#c9c3b8] italic">{item.tagline}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[#c9c3b8]">
              <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2.5 py-1">
                <Star className="size-3.5 fill-[var(--amber)] text-[var(--amber)]" />
                {item.vote_average.toFixed(1)}
              </span>
              {runtime ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2.5 py-1">
                  <Clock className="size-3.5" />
                  {runtime} min
                </span>
              ) : null}
              {type === "tv" && item.number_of_seasons ? (
                <span className="rounded-md bg-white/5 px-2.5 py-1">
                  {item.number_of_seasons} season
                  {item.number_of_seasons === 1 ? "" : "s"}
                </span>
              ) : null}
            </div>

            {item.genres?.length ? (
              <div className="flex flex-wrap gap-2">
                {item.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/browse?genre=${genre.id}&type=${type}`}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[#c9c3b8] hover:border-[var(--teal)]/40 hover:text-[#8fd4ca]"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <p className="max-w-3xl text-base leading-relaxed text-[#c9c3b8]">
              {item.overview}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={playHref}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 gap-2 bg-[var(--amber)] px-6 text-base font-semibold text-[#1a1208] hover:bg-[#f0b65f]",
                )}
              >
                <Play className="size-4 fill-current" />
                Watch on Kinora
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-10">
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-[#f4efe6]">
              Cast
            </h2>
            <CastList cast={item.credits?.cast ?? []} />
          </section>

          <MediaRow
            title="More like this"
            items={(item.similar?.results ?? []).map((similar) => ({
              ...similar,
              media_type: type,
              title: similar.title || similar.name || "Untitled",
            }))}
          />
        </div>
      </div>
    </div>
  );
}
