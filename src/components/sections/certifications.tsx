import { certifications } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          title="Certifications"
          description="The training behind the lifeguarding work."
        />

        <ul className="mt-10 flex flex-col divide-y divide-border/60 border-t">
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6"
            >
              <span className="text-base tracking-tight sm:text-lg">{cert.name}</span>
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                {cert.issuer}
                <span className="text-xs tracking-[0.06em]">{cert.year}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
