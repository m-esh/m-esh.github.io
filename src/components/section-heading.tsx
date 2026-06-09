import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow: _eyebrow,
  title,
  description,
  align = "left",
  accent: _accent,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3 animate-fade-up",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
