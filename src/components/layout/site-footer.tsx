import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#07080c]/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-[#f4efe6]">
            Kinora
          </p>
          <p className="mt-1 max-w-md text-sm text-[#9a958b]">
            A cinematic stream for nights when the lights go down. Metadata from
            TMDb. Playback embeds via VidSrc.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[#9a958b]">
          <Link href="/browse" className="hover:text-[#f4efe6]">
            Browse
          </Link>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#f4efe6]"
          >
            TMDb
          </a>
          <a
            href="https://vidsrc.to/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#f4efe6]"
          >
            VidSrc
          </a>
        </div>
      </div>
    </footer>
  );
}
