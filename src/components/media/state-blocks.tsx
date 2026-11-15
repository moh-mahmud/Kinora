import Link from "next/link";
import { AlertCircle, Film, SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  actionHref = "/browse",
  actionLabel = "Browse catalog",
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
      <SearchX className="size-10 text-[#9a958b]" />
      <h2 className="mt-4 font-display text-xl font-semibold text-[#f4efe6]">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-[#9a958b]">{description}</p>
      <Link
        href={actionHref}
        className={cn(
          buttonVariants(),
          "mt-6 bg-[var(--amber)] text-[#1a1208] hover:bg-[#f0b65f]",
        )}
      >
        {actionLabel}
      </Link>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this content. Check your connection or try again shortly.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--destructive)]/30 bg-[var(--destructive)]/5 px-6 py-16 text-center">
      <AlertCircle className="size-10 text-[var(--destructive)]" />
      <h2 className="mt-4 font-display text-xl font-semibold text-[#f4efe6]">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-[#9a958b]">{description}</p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "mt-6 border-white/15",
        )}
      >
        Back to home
      </Link>
    </div>
  );
}

export function NotFoundState({ type = "title" }: { type?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
      <Film className="size-10 text-[#9a958b]" />
      <h2 className="mt-4 font-display text-xl font-semibold text-[#f4efe6]">
        {type} not found
      </h2>
      <p className="mt-2 max-w-md text-sm text-[#9a958b]">
        This entry is missing from the catalog. Browse something else while we
        keep the lights warm.
      </p>
      <Link
        href="/browse"
        className={cn(
          buttonVariants(),
          "mt-6 bg-[var(--amber)] text-[#1a1208] hover:bg-[#f0b65f]",
        )}
      >
        Browse catalog
      </Link>
    </div>
  );
}
