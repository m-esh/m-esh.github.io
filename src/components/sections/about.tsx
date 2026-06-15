import { GraduationCap, LifeBuoy, Wrench } from "lucide-react";

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

          <div className="grid grid-cols-2 gap-3">
            <div className="glass col-span-2 flex items-center gap-3 rounded-xl p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Wrench className="size-5" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Right now
                </p>
                <p className="mt-1 text-sm leading-snug">Mech Division Vice Lead, FRC 7902</p>
              </div>
            </div>
            <div className="glass flex flex-col gap-3 rounded-xl p-5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <LifeBuoy className="size-5" />
              </span>
              <p className="text-sm leading-snug">Lifeguard, City of Toronto</p>
            </div>
            <div className="glass flex flex-col gap-3 rounded-xl p-5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <GraduationCap className="size-5" />
              </span>
              <p className="text-sm leading-snug">Grade 11 · Markham, ON</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
