import { GraduationCap, LifeBuoy, Wrench } from "lucide-react";

import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index="02" title="About me" />

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

          <div className="glass flex flex-col gap-4 rounded-xl p-5">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Right now
            </p>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-center gap-3 text-sm leading-snug">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Wrench className="size-4" />
                </span>
                Mech Division Vice Lead, FRC 7902
              </li>
              <li className="flex items-center gap-3 text-sm leading-snug">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <LifeBuoy className="size-4" />
                </span>
                Lifeguard, City of Toronto
              </li>
              <li className="flex items-center gap-3 text-sm leading-snug">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <GraduationCap className="size-4" />
                </span>
                Grade 12 · Markham, ON
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
