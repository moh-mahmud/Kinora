import type { MediaType } from "@/lib/tmdb/types";

/** Documented VidSrc embed host. Override with VIDSRC_EMBED_HOST if needed. */
const DEFAULT_HOST = "https://vidsrc.to";

export function getVidsrcHost() {
  const host = process.env.NEXT_PUBLIC_VIDSRC_EMBED_HOST?.trim() || DEFAULT_HOST;
  return host.replace(/\/$/, "");
}

export type EmbedSourceId = "vidsrc" | "vidsrc-pm" | "vidlink";

export const EMBED_SOURCES: { id: EmbedSourceId; label: string }[] = [
  { id: "vidsrc", label: "VidSrc" },
  { id: "vidsrc-pm", label: "VidSrc PM" },
  { id: "vidlink", label: "VidLink" },
];

export function parseEmbedSource(value: string | undefined): EmbedSourceId {
  return EMBED_SOURCES.some((source) => source.id === value)
    ? (value as EmbedSourceId)
    : "vidsrc";
}

export function buildEmbedUrl(
  source: EmbedSourceId,
  type: MediaType,
  tmdbId: number,
  opts?: { season?: number; episode?: number },
): string {
  const season = opts?.season ?? 1;
  const episode = opts?.episode ?? 1;

  if (source === "vidlink") {
    return type === "movie"
      ? `https://vidlink.pro/movie/${tmdbId}`
      : `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`;
  }

  if (source === "vidsrc-pm") {
    return type === "movie"
      ? `https://vidsrc.pm/embed/movie/${tmdbId}`
      : `https://vidsrc.pm/embed/tv/${tmdbId}/${season}/${episode}`;
  }

  return buildVidsrcEmbedUrl(type, tmdbId, { season, episode });
}

/**
 * Build a VidSrc embed URL from a TMDb id.
 * Patterns from vidsrc.to docs:
 *   /embed/movie/{tmdbId}
 *   /embed/tv/{tmdbId}/{season}/{episode}
 */
export function buildVidsrcEmbedUrl(
  type: MediaType,
  tmdbId: number,
  opts?: { season?: number; episode?: number },
): string {
  const host = getVidsrcHost();
  if (type === "movie") {
    return `${host}/embed/movie/${tmdbId}`;
  }
  const season = opts?.season ?? 1;
  const episode = opts?.episode ?? 1;
  return `${host}/embed/tv/${tmdbId}/${season}/${episode}`;
}
