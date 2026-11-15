import type { MediaType } from "@/lib/tmdb/types";

/** Documented VidSrc embed host. Override with VIDSRC_EMBED_HOST if needed. */
const DEFAULT_HOST = "https://vidsrc.to";

export function getVidsrcHost() {
  const host = process.env.NEXT_PUBLIC_VIDSRC_EMBED_HOST?.trim() || DEFAULT_HOST;
  return host.replace(/\/$/, "");
}

/**
 * Build a VidSrc embed URL from a TMDb id.
 * Patterns from vidsrc.to docs:
 *   /embed/movie/{tmdbId}
 *   /embed/tv/{tmdbId}
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
