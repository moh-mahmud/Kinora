"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/browse?type=movie", label: "Movies" },
  { href: "/browse?type=tv", label: "TV" },
];

export function SiteHeader({ demoMode = false }: { demoMode?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/browse?q=${encodeURIComponent(trimmed)}` : "/browse");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07080c]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-baseline gap-1.5">
          <span className="font-display text-2xl font-bold tracking-tight text-[#f4efe6] transition-colors group-hover:text-[var(--amber)]">
            Kinora
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-[var(--teal)] sm:inline">
            Stream
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith("/browse") && link.href.startsWith("/browse");
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm text-[#9a958b] transition-colors hover:text-[#f4efe6]",
                  active && "bg-white/5 text-[#f4efe6]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form onSubmit={onSearch} className="ml-auto hidden max-w-sm flex-1 items-center gap-2 md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#9a958b]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies & TV"
              className="h-9 border-white/10 bg-white/5 pl-9 text-[#f4efe6] placeholder:text-[#6f6a62]"
              aria-label="Search movies and TV"
            />
          </div>
        </form>

        {demoMode && (
          <span className="hidden rounded-md border border-[var(--amber)]/30 bg-[var(--amber)]/10 px-2 py-1 text-[10px] font-medium tracking-wide text-[var(--amber)] uppercase lg:inline">
            Demo catalog
          </span>
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-[#07080c]/95 px-4 py-4 md:hidden">
          <form onSubmit={onSearch} className="mb-4 flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies & TV"
              className="border-white/10 bg-white/5"
            />
            <Button type="submit" className="bg-[var(--amber)] text-[#1a1208] hover:bg-[#f0b65f]">
              Go
            </Button>
          </form>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-[#f4efe6] hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
