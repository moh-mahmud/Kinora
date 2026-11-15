import Image from "next/image";
import Link from "next/link";
import { Info, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  displayTitle,
  mediaHref,
  releaseYear,
  watchHref,
} from "@/lib/tmdb/client";
import { backdropUrl } from "@/lib/tmdb/images";
import type { MediaSummary } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

export function Hero({ item }: { item: MediaSummary }) {
  const title = displayTitle(item);
  const year = releaseYear(item);
  const backdrop = backdropUrl(item.backdrop_path, "w1280");
  const type = item.media_type ?? "movie";
  const detailHref = mediaHref(item);
  const playHref = watchHref(type, item.id);

  return (
    <section className="relative -mt-16 min-h-[88vh] w-full overflow-hidden">
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
      <div className="hero-vignette absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(232_165_75/0.12),transparent_40%)]" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-end px-4 pt-28 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="animate-fade-up max-w-2xl">
          <p className="font-display text-4xl font-bold tracking-tight text-[#f4efe6] sm:text-6xl lg:text-7xl">
            Kinora
          </p>
          <h1 className="mt-4 max-w-xl text-2xl font-medium tracking-tight text-[#f4efe6]/95 sm:text-3xl">
            {title}
            {year ? (
              <span className="ml-2 text-lg font-normal text-[#9a958b]">
                {year}
              </span>
            ) : null}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#c9c3b8] sm:text-lg">
            {item.overview.length > 180
              ? `${item.overview.slice(0, 177)}…`
              : item.overview}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={playHref}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-2 bg-[var(--amber)] px-6 text-base font-semibold text-[#1a1208] hover:bg-[#f0b65f]",
              )}
            >
              <Play className="size-4 fill-current" />
              Watch now
            </Link>
            <Link
              href={detailHref}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 gap-2 border-white/20 bg-white/5 px-6 text-base text-[#f4efe6] hover:bg-white/10",
              )}
            >
              <Info className="size-4" />
              Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
