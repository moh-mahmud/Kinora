"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WatchPlayer({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [nonce, setNonce] = useState(0);

  if (error) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#12141c] px-6 text-center">
        <AlertTriangle className="size-8 text-[var(--amber)]" />
        <div>
          <p className="font-medium text-[#f4efe6]">Player could not load</p>
          <p className="mt-1 text-sm text-[#9a958b]">
            The embed source may be blocked or temporarily unavailable. Try again
            or open the source directly.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              setError(false);
              setLoading(true);
              setNonce((n) => n + 1);
            }}
            className="bg-[var(--amber)] text-[#1a1208] hover:bg-[#f0b65f]"
          >
            Retry
          </Button>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "border-white/15")}
          >
            Open source
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_80px_rgb(0_0_0/0.45)]">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#07080c]">
          <div className="flex items-center gap-2 text-sm text-[#9a958b]">
            <Loader2 className="size-5 animate-spin text-[var(--amber)]" />
            Loading player…
          </div>
        </div>
      )}
      <iframe
        key={`${src}-${nonce}`}
        src={src}
        title={`Watch ${title}`}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </div>
  );
}
