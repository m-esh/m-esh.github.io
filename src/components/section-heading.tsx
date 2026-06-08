import { cn } from "@/lib/utils";

const ACCENT_CLASSES = {
  green: "border-primary/30 bg-primary/10 text-primary",
  yellow: "border-glow/30 bg-glow/10 text-glow",
  cyan: "border-glow-secondary/30 bg-glow-secondary/10 text-glow-secondary",
  blue: "border-accent/40 bg-accent/15 text-accent-foreground",
  purple: "border-purple/30 bg-purple/10 text-purple",
} as const;

const ACCENT_GRADIENT_COLORS = {
  green: "var(--color-primary)",
  yellow: "var(--color-glow)",
  cyan: "var(--color-glow-secondary)",
  blue: "var(--color-accent-foreground)",
  purple: "var(--color-purple)",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  accent = "green",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  accent?: keyof typeof ACCENT_CLASSES;
  className?: string;
}) {
  const words = title.split(" ");
  const tip = words.pop() ?? "";
  const lead = words.join(" ");

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3 animate-fade-up",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.18em]",
          ACCENT_CLASSES[accent]
        )}
      >
        {eyebrow}
      </span>
      <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {lead && <>{lead} </>}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(135deg, var(--color-foreground) 35%, ${ACCENT_GRADIENT_COLORS[accent]} 100%)`,
          }}
        >
          {tip}
        </span>
      </h2>
      {description && (
        <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
