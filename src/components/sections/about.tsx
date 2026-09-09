import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index="02" title="About me" />

        {/* Single column, capped at a readable measure. The bio used to sit in
            a two-column grid beside a "Right now" card; without it, running
            the prose the full container width would be far too wide to read. */}
        <Reveal delay={0.08} className="mt-10 flex max-w-3xl flex-col gap-6">
          {profile.longBio.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
