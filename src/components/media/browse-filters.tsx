"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Genre } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

export function BrowseFilters({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const type = searchParams.get("type") ?? "all";
  const genre = searchParams.get("genre") ?? "";

  function pushParams(next: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value || value === "all") params.delete(key);
      else params.set(key, value);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/browse?${params.toString()}`);
    });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    pushParams({ q: query.trim() || undefined });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#9a958b]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or synopsis"
            className="h-11 border-white/10 bg-white/5 pl-9"
          />
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="h-11 bg-[var(--amber)] px-5 text-[#1a1208] hover:bg-[#f0b65f]"
        >
          Search
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {[
          { value: "all", label: "All" },
          { value: "movie", label: "Movies" },
          { value: "tv", label: "TV" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => pushParams({ type: option.value })}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm transition",
              type === option.value
                ? "border-[var(--amber)]/50 bg-[var(--amber)]/15 text-[var(--amber)]"
                : "border-white/10 bg-white/5 text-[#c9c3b8] hover:border-white/20",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => pushParams({ genre: undefined })}
          className={cn(
            "shrink-0 rounded-md border px-3 py-1.5 text-sm transition",
            !genre
              ? "border-[var(--teal)]/50 bg-[var(--teal)]/15 text-[#8fd4ca]"
              : "border-white/10 bg-white/5 text-[#c9c3b8] hover:border-white/20",
          )}
        >
          Any genre
        </button>
        {genres.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => pushParams({ genre: String(item.id) })}
            className={cn(
              "shrink-0 rounded-md border px-3 py-1.5 text-sm transition",
              genre === String(item.id)
                ? "border-[var(--teal)]/50 bg-[var(--teal)]/15 text-[#8fd4ca]"
                : "border-white/10 bg-white/5 text-[#c9c3b8] hover:border-white/20",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
