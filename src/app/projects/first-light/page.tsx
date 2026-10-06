import type { Metadata } from "next";

import { ScrollProgress } from "@/components/scroll-progress";
import { CaseStudyNav } from "@/components/case-study-nav";
import { CaseStudyFooter } from "@/components/case-study-footer";

const sections = [
  { id: "watch", label: "Watch" },
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
];

export const metadata: Metadata = {
  title: "iPhone Commercial",
  description:
    "A concept ad for the iPhone 16 Pro Max, modeled in Blender and cut in DaVinci Resolve. Not an Apple production.",
};

export default function FirstLightPage() {
  return (
    <>
      <ScrollProgress />

      <CaseStudyNav sections={sections} />

      <main className="flex-1 pt-16">
        {/* Hero: text only, single column. Unlike the physical builds this
            page has no photograph to sit beside it — the video is the whole
            project, so it gets a full-width slot of its own immediately
            below instead of being squeezed into a side column at 16:9. */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6 lg:px-8">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Case Study · May 2025
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              iPhone Commercial
            </h1>
            {/* "Not an Apple production" is load-bearing, not throat-clearing:
                the video itself is styled as an Apple launch ad and features
                the Apple logo, so the page has to be unambiguous that this is
                a personal exercise, not official or commissioned work. */}
            <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A concept ad for the iPhone 16 Pro Max, not an Apple
              production. Modeled and animated in Blender, a tool I taught
              myself for this, then cut and graded in DaVinci Resolve, which
              I already knew.
            </p>
            <dl className="mt-2 grid grid-cols-3 gap-4 pt-5 text-sm sm:max-w-md">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Role
                </dt>
                <dd className="font-medium">Model, animate, edit &amp; grade</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Tools
                </dt>
                <dd className="font-medium">Blender, DaVinci Resolve</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Length
                </dt>
                <dd className="font-medium">0:40</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Watch */}
        <section id="watch" className="relative scroll-mt-16 py-8 sm:py-10">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="overflow-hidden rounded-xl bg-black">
              <video
                src="/projects/first-light/ad.mp4"
                poster="/projects/first-light/poster.jpg"
                className="aspect-video w-full"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="flex max-w-2xl flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The idea
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                An English class assignment gave me the brief: make a
                product ad. That&apos;s all school contributed. Everything
                I&apos;d built before this lived in the real world: CAD, 3D
                printing, a robot you could drive. This was the same kind of
                thinking, but entirely on a screen: model something from
                scratch, light it, move a camera around it, and cut it like a
                real launch video.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Blender, then DaVinci
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              I&apos;d used DaVinci Resolve before, but never Blender. I
              taught myself from online videos and modeled, lit, and
              animated the phone, the lens stack, and the camera moves
              there. The render went to DaVinci Resolve for the cut, the
              grade, and the title cards. Start to finish, the whole thing
              came together in about 12 hours.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="relative py-16 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl pt-8">
              <p className="leading-relaxed text-muted-foreground">
                First thing I&apos;ve finished that never touched a 3D
                printer. Same instinct, aimed at a screen instead of a
                bench.
              </p>
            </div>
            <div className="mt-8">
              <CaseStudyFooter next={{ href: "/projects/sightline", label: "Sightline" }} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
