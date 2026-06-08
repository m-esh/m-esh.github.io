import { certifications } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials I've earned"
          description="The training behind the lifeguarding work."
          accent="blue"
        />

        <ul className="mt-10 flex flex-col border-t border-border/60">
          {certifications.map((cert, i) => (
            <Reveal
              key={cert.name}
              as="li"
              variant="scale"
              delay={i * 0.08}
              className="flex flex-col gap-1 border-b border-border/60 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6"
            >
              <span className="text-base font-medium tracking-tight sm:text-lg">{cert.name}</span>
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                {cert.issuer}
                <span className="font-mono text-xs">{cert.year}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
