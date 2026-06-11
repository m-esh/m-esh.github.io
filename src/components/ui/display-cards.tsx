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

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-32 w-[15rem] select-none flex-col justify-between rounded-xl border-2 border-border/60 bg-card/70 px-4 py-3 backdrop-blur-sm transition-all duration-700",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[15rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",
        "grayscale-[60%] hover:grayscale-0 hover:border-primary/50 hover:bg-card",
        "sm:h-36 sm:w-[24rem] sm:px-5 sm:py-4 sm:after:w-[24rem]",
        className
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
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center pb-10 pt-4 opacity-100 sm:pb-16">
      {cards.map((cardProps, index) => (
        <DisplayCard
          key={index}
          {...cardProps}
          className={cn(
            "[grid-area:stack]",
            index === 0 && "hover:-translate-y-10",
            index === 1 && "translate-x-6 translate-y-8 hover:-translate-y-1 sm:translate-x-16 sm:translate-y-10",
            index === 2 && "translate-x-12 translate-y-16 hover:translate-y-9 sm:translate-x-32 sm:translate-y-20"
          )}
        />
      ))}
    </div>
  );
}
