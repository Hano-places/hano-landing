import { ArrowDown02Icon, ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const ICONS = { right: ArrowRight02Icon, left: ArrowLeft02Icon, down: ArrowDown02Icon } as const;

/** The site's arrow (Hugeicons), in place of text arrows like → ← ↓. Follows the text colour. */
export function Arrow({ dir = "right", size = 18 }: { dir?: keyof typeof ICONS; size?: number }) {
  return (
    <HugeiconsIcon
      icon={ICONS[dir]}
      size={size}
      color="currentColor"
      strokeWidth={2}
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "-0.2em", flexShrink: 0 }}
    />
  );
}
