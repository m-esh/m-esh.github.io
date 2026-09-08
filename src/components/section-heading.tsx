import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  align = "left",
  index,
  className,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Editorial index label, e.g. "01". Rendered as "01 —" above the title. */
  index?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {/* Full-strength primary, not /80: at 12px the faded variant measured
          4.32:1, just under the 4.5 AA floor for small text. */}
      {index && (
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          {index}
        </span>
      )}
      <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
