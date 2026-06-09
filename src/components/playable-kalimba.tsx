"use client";

import * as React from "react";
import { Play, Square } from "lucide-react";

import { cn } from "@/lib/utils";

type Tine = { note: string; freq: number };

// Ascending left-to-right, matching how the build re-arranged the tines
// so the drum could sweep them lowest to highest.
const TINES: Tine[] = [
  { note: "D4", freq: 293.66 },
  { note: "F4", freq: 349.23 },
  { note: "G4", freq: 392.0 },
  { note: "A4", freq: 440.0 },
  { note: "C5", freq: 523.25 },
  { note: "D5", freq: 587.33 },
  { note: "F5", freq: 698.46 },
  { note: "G5", freq: 783.99 },
];

// [tine index, start time in ms] — a sketch of the opening phrase
const PHRASE: [number, number][] = [
  [3, 0],
  [4, 350],
  [5, 700],
  [6, 1050],
  [5, 1500],
  [4, 1850],
  [3, 2200],
  [2, 2900],
  [3, 3250],
  [4, 3600],
  [3, 4100],
  [2, 4450],
  [1, 4800],
  [0, 5500],
];

const PHRASE_LENGTH_MS = 7200;

function pluckNote(ctx: AudioContext, freq: number) {
  const now = ctx.currentTime;

  const out = ctx.createGain();
  out.gain.setValueAtTime(0.0001, now);
  out.gain.exponentialRampToValueAtTime(0.4, now + 0.006);
  out.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

  // Fundamental: kalimba tines are close to a pure sine
  const fundamental = ctx.createOscillator();
  fundamental.type = "sine";
  fundamental.frequency.value = freq;

  // Inharmonic high partial gives the metallic "tick" of the pluck
  const partial = ctx.createOscillator();
  partial.type = "sine";
  partial.frequency.value = freq * 4.2;
  const partialGain = ctx.createGain();
  partialGain.gain.setValueAtTime(0.15, now);
  partialGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  fundamental.connect(out);
  partial.connect(partialGain);
  partialGain.connect(out);
  out.connect(ctx.destination);

  fundamental.start(now);
  partial.start(now);
  fundamental.stop(now + 1.7);
  partial.stop(now + 0.3);
}

export function PlayableKalimba() {
  const ctxRef = React.useRef<AudioContext | null>(null);
  const timeoutsRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const [playing, setPlaying] = React.useState(false);
  // Bumping a tine's counter remounts its bar, retriggering the pluck animation
  const [plucks, setPlucks] = React.useState<number[]>(() => TINES.map(() => 0));

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  };

  const pluck = React.useCallback((index: number) => {
    pluckNote(getCtx(), TINES[index].freq);
    setPlucks((prev) => {
      const next = [...prev];
      next[index] += 1;
      return next;
    });
  }, []);

  const stopPhrase = React.useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setPlaying(false);
  }, []);

  const playPhrase = () => {
    if (playing) {
      stopPhrase();
      return;
    }
    getCtx();
    setPlaying(true);
    timeoutsRef.current = PHRASE.map(([index, at]) =>
      setTimeout(() => pluck(index), at)
    );
    timeoutsRef.current.push(setTimeout(() => setPlaying(false), PHRASE_LENGTH_MS));
  };

  React.useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach(clearTimeout);
      void ctxRef.current?.close();
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-card/70 p-6 sm:p-10">
        {/* Bridge bar */}
        <div className="mx-auto h-2 max-w-md rounded-full bg-muted-foreground/30" />

        <div className="mx-auto mt-0 flex max-w-md items-start justify-center gap-2 sm:gap-3">
          {TINES.map((tine, i) => (
            <button
              key={tine.note}
              type="button"
              onMouseDown={() => pluck(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pluck(i);
                }
              }}
              aria-label={`Pluck tine ${i + 1}, note ${tine.note}`}
              className="group flex flex-col items-center gap-2"
            >
              <span
                key={plucks[i]}
                style={{ height: `${150 - i * 11}px` }}
                className={cn(
                  "block w-3 origin-top rounded-b-full bg-gradient-to-b from-muted-foreground/80 to-muted-foreground/40 transition-colors group-hover:from-foreground group-hover:to-muted-foreground/70 sm:w-3.5",
                  plucks[i] > 0 && "animate-tine"
                )}
              />
              <span className="font-mono text-[0.64rem] text-muted-foreground">
                {tine.note}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={playPhrase}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          {playing ? <Square className="size-3.5" /> : <Play className="size-3.5" />}
          {playing ? "Stop" : "Play the phrase"}
        </button>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Synthesized in your browser, so it&apos;s a sketch of the real thing.
          The video above has the genuine article.
        </p>
      </div>
    </div>
  );
}
