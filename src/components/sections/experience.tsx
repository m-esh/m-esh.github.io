"use client";

import { SectionHeading } from "@/components/section-heading";
import { OrbitalTimeline } from "@/components/orbital-timeline";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index="03"
          title="Experience & Leadership"
          description="Robotics, manufacturing, lifeguarding, music, tutoring. Select a node to read the role."
        />

        <div className="mt-10">
          <OrbitalTimeline />
        </div>
      </div>
    </section>
  );
}
