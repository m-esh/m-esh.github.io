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

    // The first tick has to happen in an effect, not in render: the clock is a
    // client-only value, and putting it in the SSR markup would guarantee a
    // hydration mismatch on every load.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 10_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={cn("font-mono tabular-nums", className)} suppressHydrationWarning>
      {time ?? "—:——"} <span className="text-muted-foreground">Toronto</span>
    </span>
  );
}
