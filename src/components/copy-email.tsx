"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

// The address itself is rendered as plain selectable text next to this button,
// so copying never depends on the Clipboard API succeeding.
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setFailed(false);
    } catch {
      // Insecure context or permission denied — say so instead of silently
      // pretending it worked.
      setCopied(false);
      setFailed(true);
    }
    timer.current = setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 2400);
  };

  const label = copied ? "Email address copied" : failed ? "Press Ctrl or Cmd + C to copy" : "Copy email address";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className={cn(
          "focus-ring inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-2.5 py-1.5",
          "font-mono text-xs text-muted-foreground transition-colors duration-[var(--motion-base)]",
          "hover:border-primary/40 hover:text-foreground",
          className
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-primary" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
        {copied ? "Copied" : failed ? "Press ⌘C" : "Copy"}
      </button>
      {/* Announced to screen readers without moving focus. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : failed ? "Copy failed. Select the address and copy manually." : ""}
      </span>
    </>
  );
}
