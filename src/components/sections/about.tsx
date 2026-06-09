import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="About me"
          description="The short version: I keep people safe, I build robots, and I'm chasing a future in mechatronics engineering."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            {profile.longBio.map((paragraph, i) => (
              <Reveal
                key={i}
                as="p"
                variant="left"
                delay={i * 0.12}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal variant="scale" delay={0.15} className="flex flex-col gap-3">
            <div className="rounded-2xl bg-card/70 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Right now
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                <li className="text-sm leading-snug">FRC 7902 — Mech Division Vice Lead</li>
                <li className="text-sm leading-snug">City of Toronto — Lifeguard</li>
                <li className="text-sm leading-snug">Grade 11 · Markham, ON</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card/70 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                What I work with
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                <li className="text-sm leading-snug">Fusion 360 / CAD</li>
                <li className="text-sm leading-snug">3D printing & physical prototyping</li>
                <li className="text-sm leading-snug">Competition robotics (FRC, VEX)</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
