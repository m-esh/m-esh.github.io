import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
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
      <h2 className="text-balance text-[clamp(2.5rem,6vw,3.5rem)] font-normal leading-[1.13] tracking-[-0.02em]">
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
