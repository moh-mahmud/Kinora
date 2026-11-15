# Kinora

Kinora is a cinematic movie and TV streaming site built with Next.js. It loads metadata and artwork from [TMDb](https://www.themoviedb.org/) and plays titles through documented [VidSrc](https://vidsrc.to/) embed URLs.

## Features

- Home hero plus rows for trending, popular, top rated, and genres
- Browse and search for movies and TV
- Title detail pages with poster, overview, cast, and similar titles
- Watch page with an embedded VidSrc player (by TMDb id)
- Works without API keys via a built-in demo catalog

## Stack

- Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Dev server defaults to **http://127.0.0.1:43127**.

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `TMDB_API_KEY` | No* | TMDb v3 API key |
| `TMDB_READ_ACCESS_TOKEN` | No* | TMDb v4 read access token (Bearer). Preferred when both are set. |
| `NEXT_PUBLIC_VIDSRC_EMBED_HOST` | No | Embed host, default `https://vidsrc.to` |

\*If neither TMDb credential is set, Kinora serves the demo catalog so the app still runs.

Get TMDb keys at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

## Scripts

```bash
npm run dev      # http://127.0.0.1:43127
npm run build
npm run start    # production on port 43127
npm run lint
```

## VidSrc embeds

Kinora does not scrape or host video. Watch pages iframe documented patterns:

- Movies: `{host}/embed/movie/{tmdbId}`
- TV: `{host}/embed/tv/{tmdbId}/{season}/{episode}`

## Notes

This product is for personal / educational use. Respect TMDb attribution guidelines and VidSrc terms when deploying publicly.
