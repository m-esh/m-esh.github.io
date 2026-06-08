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

        <div className="mt-10 flex max-w-3xl flex-col gap-6">
          {profile.longBio.map((paragraph, i) => (
            <Reveal
              key={i}
              as="p"
              variant="left"
              delay={i * 0.12}
              className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {paragraph}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
