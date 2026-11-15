import Image from "next/image";
import { profileUrl } from "@/lib/tmdb/images";
import type { CastMember } from "@/lib/tmdb/types";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function CastList({ cast }: { cast: CastMember[] }) {
  if (!cast.length) {
    return (
      <p className="text-sm text-[#9a958b]">
        Cast information is unavailable for this title.
      </p>
    );
  }

  return (
    <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {cast.slice(0, 12).map((member) => {
        const photo = profileUrl(member.profile_path);
        return (
          <div key={`${member.id}-${member.character}`} className="w-[110px] shrink-0">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-[#171a24] ring-1 ring-white/8">
              {photo ? (
                <Image
                  src={photo}
                  alt={member.name}
                  fill
                  sizes="110px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#1c2430] to-[#12141c] px-2 text-center">
                  <span className="font-display text-2xl font-semibold text-[var(--amber)]">
                    {initials(member.name)}
                  </span>
                </div>
              )}
            </div>
            <p className="mt-2 line-clamp-1 text-sm font-medium text-[#f4efe6]">
              {member.name}
            </p>
            <p className="line-clamp-1 text-xs text-[#9a958b]">{member.character}</p>
          </div>
        );
      })}
    </div>
  );
}
