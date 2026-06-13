import { cn } from "@/lib/utils";

type ShadowColors = {
  first?: string;
  second?: string;
  third?: string;
  fourth?: string;
  glow?: string;
};

// Stamped text whose shadow stack presses flat on hover. The effect lives in
// globals.css (.text-stamp) as a pure CSS transition: no JS on the hot path,
// hover gated behind (hover: hover), reduced-motion handled in the stylesheet.
export function TextRewind({
  text,
  className,
  shadowColors,
}: {
  text: string;
  className?: string;
  shadowColors?: ShadowColors;
}) {
  const vars = shadowColors
    ? ({
        "--stamp-1": shadowColors.first,
        "--stamp-2": shadowColors.second,
        "--stamp-3": shadowColors.third,
        "--stamp-4": shadowColors.fourth,
        "--stamp-glow": shadowColors.glow,
      } as React.CSSProperties)
    : undefined;

  return (
    <span
      className={cn("text-stamp font-display font-semibold tracking-tight", className)}
      style={vars}
    >
      {text}
    </span>
  );
}
