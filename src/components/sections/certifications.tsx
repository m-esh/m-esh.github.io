import { Award, HeartPulse, ShieldCheck } from "lucide-react";

import { certifications } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { DisplayCards } from "@/components/ui/display-cards";

const ICONS = [ShieldCheck, HeartPulse, Award];

export function Certifications() {
  const cards = certifications.map((cert, i) => {
    const Icon = ICONS[i % ICONS.length];
    return {
      icon: <Icon />,
      title: cert.name,
      description: cert.issuer,
      date: cert.year,
    };
  });

  return (
    <section id="certifications" className="relative overflow-x-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index="04"
          title="Certifications"
          description="The training behind the lifeguarding work."
        />

        <div className="mt-10">
          <DisplayCards cards={cards} />
        </div>
      </div>
    </section>
  );
}
