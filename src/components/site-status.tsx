"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Live local time in Toronto. Rendered only after mount so the server and
// client markup agree (the clock would otherwise differ and trip hydration).
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Toronto",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 10_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={cn("font-mono tabular-nums", className)} suppressHydrationWarning>
      {time ?? "—:——"} <span className="text-muted-foreground/70">Toronto</span>
    </span>
  );
}

// Pulsing "presence" pill — the small classy signal that the person is reachable.
export function AvailabilityBadge({
  label = "Open to opportunities",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300",
        className
      )}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
      </span>
      {label}
    </span>
  );
}
