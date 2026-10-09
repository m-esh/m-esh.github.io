import type { Metadata } from "next";

import { ScrollProgress } from "@/components/scroll-progress";
import { TiltCard } from "@/components/tilt-card";
import { CaseStudyNav } from "@/components/case-study-nav";
import { CaseStudyFooter } from "@/components/case-study-footer";

const sections = [
  { id: "look", label: "Look" },
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "process", label: "Process" },
];

export const metadata: Metadata = {
  title: "Sightline",
  description:
    "A top-down stealth shooter inspired by Ready or Not, built solo in Java with Greenfoot for a grade 11 Intro to Computer Science class. My first full game.",
};

export default function SightlinePage() {
  return (
    <>
      <ScrollProgress />

      <CaseStudyNav sections={sections} />

      <main className="flex-1 pt-16">
        {/* Hero: text only, single column. Both real images are landscape
            (a title card and a gameplay screenshot), so they get their own
            full-width "Look" section right below instead of being cropped
            into a side column. */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6 lg:px-8">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Case Study · June 2026
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Sightline
            </h1>
            <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A stealth shooter built solo in Java with Greenfoot for my
              grade 11 Intro to Computer Science class, my first full game.
              Eleven enemies share a dark house with you, and a flashlight
              decides who sees who first.
            </p>
            <dl className="mt-2 grid grid-cols-3 gap-4 pt-5 text-sm sm:max-w-md">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Role
                </dt>
                <dd className="font-medium">Code &amp; design</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Tools
                </dt>
                <dd className="font-medium">Java, Greenfoot</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Built for
                </dt>
                <dd className="font-medium">Grade 11 Intro to CS</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Look */}
        <section id="look" className="relative scroll-mt-16 py-8 sm:py-10">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/sightline/poster.jpg"
                    alt="Sightline title screen: two SWAT operators breaching a dark doorway with a flashlight beam, tagline 'Fear what you cannot see'"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-2 p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Title screen
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    The game&apos;s own title card. Like every sprite and
                    background in Sightline, it&apos;s AI-generated art
                    (ChatGPT), not photography or hand-drawn work.
                  </p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/sightline/gameplay.jpg"
                    alt="Gameplay screenshot of Sightline: a cone-shaped flashlight beam is the only lit area in an otherwise black screen, revealing part of a wooden room, with HP and Ammo readouts at the top"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-2 p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Actual gameplay
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    What you actually see while playing: everything outside
                    the flashlight cone, walls, furniture, enemies, is
                    simply black until it crosses the beam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The idea
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                I&apos;d been playing a lot of Ready or Not, a slow, tense
                SWAT game where you clear a room one doorway at a time and
                the dark does half the work. The assignment called for
                something top-down, so I couldn&apos;t copy its camera, just
                the feeling: not knowing what&apos;s on the other side of a
                wall until it&apos;s too late.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The build
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Just me, start to finish. One world, one house, eleven
                enemies, placed by hand in the Greenfoot editor before I
                pulled their positions into code. Past that there was
                nothing to work from, the walls, the player, the flashlight
                all had to be written from scratch.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Two sightlines, not one
            </h2>
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-muted-foreground">
              From above, a wall can&apos;t block your view the way it does
              at eye level, you can just see over it. Darkness and a
              flashlight were the closest thing I could build to a wall
              that actually blocks sight. The name is literal: two vision
              systems run at once, yours and theirs, and the game is just
              what happens when they cross.
            </p>

            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  Your flashlight
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  A black overlay follows you around and turns toward the
                  mouse, with a flashlight-shaped hole cut into it. Anything
                  outside that cone doesn&apos;t exist as far as you can
                  tell, walls, furniture, an enemy standing right next to
                  you.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  Their sightline
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Every enemy fires an invisible ray at you, every single
                  frame, and it dies the instant it hits a wall. If it
                  reaches you clean, they spot you and open fire. Get close
                  enough before that happens and clicking stabs them
                  instead, no ammo spent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Built in Greenfoot
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Every enemy is a Grunt, built off one shared Enemy class that
              keeps track of how many are left and decides when I&apos;ve
              actually won. A couple of pieces I didn&apos;t write myself:
              two utility classes for movement and on-screen text came from
              my teacher, and I leaned on Claude to work through the
              raycasting system for enemy vision, since that was new to me.
              The art is all AI-generated through ChatGPT, and the gunshot
              and stab sounds are pulled straight from CS:GO, with music
              from Trauma Team (Atlus, 2010). There&apos;s still one bug I
              never fully fixed, you can get stuck in a wall sometimes, and
              the only way out is to aim at it and move around erratically
              until it lets go.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="relative py-16 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl pt-8">
              <p className="leading-relaxed text-muted-foreground">
                Picking one mechanic and building everything else around it
                turned out to be the easy part. Getting the raycasting, the
                collision, and eleven enemies to all behave at once was the
                actual class.
              </p>
            </div>
            <div className="mt-8">
              <CaseStudyFooter next={{ href: "/projects/drone", label: "Gesture-Controlled Drone" }} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
