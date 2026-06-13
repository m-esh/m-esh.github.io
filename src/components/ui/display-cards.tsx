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

// While pressed (touch hold), fan the cards apart vertically so all three read.
const PRESSED = [
  "-translate-y-16 sm:-translate-y-20",
  "translate-x-6 sm:translate-x-16",
  "translate-x-12 translate-y-16 sm:translate-x-32 sm:translate-y-20",
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
        "relative flex h-32 w-[15rem] select-none flex-col justify-between rounded-xl border-2 border-border/60 bg-card px-4 py-3 transition-[transform,opacity,border-color] duration-500 [grid-area:stack]",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[15rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",
        "sm:h-36 sm:w-[24rem] sm:px-5 sm:py-4 sm:after:w-[24rem]",
        pressed
          ? cn(PRESSED[index], "opacity-100 border-primary/40")
          : cn(BASE[index], HOVER[index], "opacity-80 hover:opacity-100 hover:border-primary/50")
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="relative inline-flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary [&_svg]:size-4">
            {icon}
          </span>
        )}
        <p className="text-base font-semibold tracking-tight sm:text-lg">{title}</p>
      </div>
      <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
      <p className="font-mono text-xs text-muted-foreground/70">{date}</p>
    </div>
  );
}

export function DisplayCards({ cards }: { cards: DisplayCardProps[] }) {
  const [pressed, setPressed] = React.useState(false);

  const release = () => setPressed(false);

  return (
    <div
      className="grid touch-pan-y place-items-center pb-10 pt-4 [grid-template-areas:'stack'] sm:pb-16"
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") setPressed(true);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
    >
      {cards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} index={index} pressed={pressed} />
      ))}
    </div>
  );
}
