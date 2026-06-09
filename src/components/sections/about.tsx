import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading title="About me" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
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

          <div className="flex flex-col gap-10">
            <div className="border-t pt-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Right now
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li className="text-sm leading-snug">FRC 7902, Mech Division Vice Lead</li>
                <li className="text-sm leading-snug">City of Toronto, Lifeguard</li>
                <li className="text-sm leading-snug">Grade 11 · Markham, ON</li>
              </ul>
            </div>

            <div className="border-t pt-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                What I work with
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li className="text-sm leading-snug">Fusion 360 / CAD</li>
                <li className="text-sm leading-snug">3D printing & physical prototyping</li>
                <li className="text-sm leading-snug">Competition robotics (FRC, VEX)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
