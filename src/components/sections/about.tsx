import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index="01" title="About me" />

        <Reveal delay={0.08} className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            {profile.longBio.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-2xl bg-card/70 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Right now
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                <li className="text-sm leading-snug">Mech Division Vice Lead, FRC 7902</li>
                <li className="text-sm leading-snug">Lifeguard, City of Toronto</li>
                <li className="text-sm leading-snug">Grade 11 · Markham, ON</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
