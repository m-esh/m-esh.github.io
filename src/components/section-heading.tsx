"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const ACCENT_CLASSES = {
  pink: "border-primary/30 bg-primary/10 text-primary",
  yellow: "border-glow/30 bg-glow/10 text-glow",
  cyan: "border-glow-secondary/30 bg-glow-secondary/10 text-glow-secondary",
  blue: "border-accent/40 bg-accent/15 text-accent-foreground",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  accent = "pink",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  accent?: keyof typeof ACCENT_CLASSES;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex max-w-2xl flex-col gap-3",
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
        {title}
      </h2>
      {description && (
        <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
