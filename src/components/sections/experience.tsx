"use client";

import { SectionHeading } from "@/components/section-heading";
import { OrbitalTimeline } from "@/components/orbital-timeline";

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          title="Where I've worked"
          description="Robotics, manufacturing, lifeguarding, school life. Tap a node to explore the orbit."
        />

        <div className="mt-14">
          <OrbitalTimeline />
        </div>
      </div>
    </section>
  );
}
