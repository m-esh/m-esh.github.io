"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type LiquidButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  tone?: "gold" | "metal";
};

export function LiquidButton({
  className,
  asChild = false,
  tone = "gold",
  children,
  ...props
}: LiquidButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="liquid-button"
      className={cn(
        "group/lb relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-base font-medium",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        tone === "gold"
          ? "bg-primary text-primary-foreground shadow-[0_8px_30px_-8px_oklch(0.78_0.2_95/0.7)] hover:shadow-[0_12px_40px_-8px_oklch(0.78_0.2_95/0.85)]"
          : "border border-border bg-card/60 text-foreground backdrop-blur-sm hover:border-border/80",
        className
      )}
      {...props}
    >
      {/* moving sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover/lb:translate-x-full"
      />
      {/* liquid blob highlight */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover/lb:opacity-100",
          tone === "gold"
            ? "bg-[radial-gradient(60%_120%_at_50%_-10%,oklch(1_0_0/0.45),transparent_70%)]"
            : "bg-[radial-gradient(60%_120%_at_50%_-10%,oklch(0.78_0.2_95/0.18),transparent_70%)]"
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Comp>
  );
}
