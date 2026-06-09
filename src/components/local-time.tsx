"use client";

import * as React from "react";

const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  hour: "numeric",
  minute: "2-digit",
});

export function LocalTime() {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return <span className="font-mono tabular-nums">{time} local</span>;
}
