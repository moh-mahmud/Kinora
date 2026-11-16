import { unstable_rethrow } from "next/navigation";

/** Let Next.js prerender signals escape our demo-catalog fallbacks. */
export function rethrowNextError(error: unknown) {
  unstable_rethrow(error);
}
