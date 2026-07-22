"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type DisplayCardProps = {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
};

const BASE = [
  "",
  "translate-x-6 translate-y-8 sm:translate-x-16 sm:translate-y-10",
  "translate-x-12 translate-y-16 sm:translate-x-32 sm:translate-y-20",
];

const HOVER = ["hover:-translate-y-10", "hover:-translate-y-1", "hover:translate-y-9"];

// Tapped open: fan the cards into a vertical stack with enough gap (card
// height + ~24px) that every line of every card clears the one behind it.
const PRESSED = [
  "-translate-y-[152px] translate-x-0 sm:-translate-y-[168px]",
  "translate-y-0 translate-x-0",
  "translate-y-[152px] translate-x-0 sm:translate-y-[168px]",
];

function DisplayCard({
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  index,
  pressed,
}: DisplayCardProps & { index: number; pressed: boolean }) {
  return (
    <div
      className={cn(
        // Solid bg + opacity dim instead of backdrop-blur + grayscale: three
        // stacked filtered layers forced expensive repaints while scrolling.
        // transform/opacity only (no border-color) keeps the fan-out on the
        // GPU compositor — animating border-color alongside it caused jank.
        "glass relative flex h-32 w-[15rem] select-none flex-col justify-between rounded-xl px-4 py-3 transform-gpu transition-[transform,opacity,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [grid-area:stack]",
        "sm:h-36 sm:w-[24rem] sm:px-5 sm:py-4",
        pressed
          ? cn(PRESSED[index], "opacity-100 border-primary/40")
          : // Glass cards overlap in the stack, so the hovered one goes opaque
            // and jumps the z-order — otherwise the others show through it.
            cn(
              BASE[index],
              HOVER[index],
              "opacity-100 hover:z-10 hover:bg-card hover:border-primary/50"
            )
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary [&_svg]:size-4">
            {icon}
          </span>
        )}
        <p className="text-base font-semibold tracking-tight sm:text-lg">{title}</p>
      </div>
      <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
      <p className="font-mono text-xs text-muted-foreground">{date}</p>
    </div>
  );
}

export function DisplayCards({ cards }: { cards: DisplayCardProps[] }) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <div
      className={cn(
        "grid touch-pan-y place-items-center [grid-template-areas:'stack'] transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        pressed ? "pb-[120px] pt-[112px] sm:pb-32 sm:pt-28" : "pb-10 pt-4 sm:pb-16"
      )}
      onClick={() => {
        // Mouse already gets the fan-out via hover — only tap toggles it.
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        setPressed((p) => !p);
      }}
    >
      {cards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} index={index} pressed={pressed} />
      ))}
    </div>
  );
}
