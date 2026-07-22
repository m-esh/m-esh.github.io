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
        "transition-[transform,box-shadow,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-0.5 active:scale-[0.96] active:duration-150 active:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        tone === "gold"
          ? cn(
              "bg-primary text-primary-foreground",
              "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.5),inset_0_-2px_6px_0_oklch(0.28_0.06_163/0.35),0_8px_30px_-8px_oklch(0.63_0.15_163/0.7)]",
              "hover:shadow-[inset_0_1px_0_0_oklch(1_0_0/0.55),inset_0_-2px_6px_0_oklch(0.28_0.06_163/0.35),0_12px_40px_-8px_oklch(0.63_0.15_163/0.85)]",
              "active:shadow-[inset_0_1px_2px_0_oklch(0.28_0.06_163/0.4),inset_0_-1px_2px_0_oklch(1_0_0/0.35),0_4px_16px_-8px_oklch(0.63_0.15_163/0.7)]"
            )
          : cn(
              "border border-white/15 bg-white/8 text-foreground backdrop-blur-xl backdrop-saturate-150",
              "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.25),inset_0_-4px_10px_-4px_oklch(0_0_0/0.35),0_8px_24px_-12px_oklch(0_0_0/0.5)]",
              "hover:border-white/25 hover:bg-white/12",
              "active:bg-white/[0.06] active:shadow-[inset_0_1px_4px_0_oklch(0_0_0/0.3),inset_0_-1px_0_0_oklch(1_0_0/0.15)]"
            ),
        className
      )}
      {...props}
    >
      {/* specular highlight: light catching the top edge of the glass */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 via-white/5 to-transparent opacity-80 transition-opacity duration-300 group-active/lb:opacity-40"
      />
      {/* moving sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover/lb:translate-x-full group-active/lb:translate-x-full group-active/lb:duration-500"
      />
      {/* liquid blob highlight */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover/lb:opacity-100 group-active/lb:opacity-100",
          tone === "gold"
            ? "bg-[radial-gradient(60%_120%_at_50%_-10%,oklch(1_0_0/0.45),transparent_70%)]"
            : "bg-[radial-gradient(60%_120%_at_50%_-10%,oklch(1_0_0/0.18),transparent_70%)]"
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Comp>
  );
}
