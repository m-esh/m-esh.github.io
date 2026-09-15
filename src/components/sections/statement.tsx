import { Reveal } from "@/components/reveal";

// A single line of type, sitting between the objects and the person who makes
// them. No card, no border, no icon — the scale and the space around it are
// the whole design. "hold" carries the one accent, since it's the word the
// sentence turns on.
export function Statement() {
  return (
    <section
      aria-label="Statement"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="max-w-5xl text-balance font-display text-[clamp(2.25rem,7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            Ideas are better when you can{" "}
            <span className="text-primary">hold</span> them
          </p>
        </Reveal>
      </div>
    </section>
  );
}
