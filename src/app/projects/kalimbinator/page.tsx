import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ScrollProgress } from "@/components/scroll-progress";

export const metadata: Metadata = {
  title: "Kalimbinator · Mehrdad Shariatmadari",
  description:
    "A hand-crank music box, built around a re-tuned kalimba and a custom 3D-printed drum, that plays the opening of the tenor saxophone solo from Omar Thomas' Come Sunday.",
};

export default function KalimbinatorPage() {
  return (
    <>
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6 lg:px-8">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to portfolio
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6 lg:px-8">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Independent Study · 2026
            </span>
            <h1 className="text-balance text-[clamp(3rem,9vw,6.5rem)] font-normal leading-[1.0] tracking-[-0.02em]">
              Kalimbinator
            </h1>
            <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A hand-crank music box that plays the opening of the tenor saxophone
              solo from Omar Thomas&apos; <em>Come Sunday</em>, built around a
              re-tuned kalimba and a drum I designed and 3D printed to pluck out
              the notes in sequence.
            </p>
            <dl className="mt-2 grid grid-cols-3 gap-4 pt-5 text-sm sm:max-w-md">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Role
                </dt>
                <dd className="font-medium">Design, build &amp; tune</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Tools
                </dt>
                <dd className="font-medium">CAD, 3D printing</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Power
                </dt>
                <dd className="font-medium">Hand-crank</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Overview — dual column */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-balance text-3xl font-normal leading-[1.17] tracking-[-0.01em] sm:text-4xl">
                The idea
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                I wanted to build a device that could play a piece of music on its
                own. Rather than reaching for motors and microcontrollers to
                automate it, I looked to traditional music boxes for inspiration:
                mechanical instruments that turn the simple act of cranking a
                handle into a melody. That became the starting point for the
                Kalimbinator, a music box re-engineered around a kalimba to play
                the first phrase of the tenor solo from <em>Come Sunday</em>.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-balance text-3xl font-normal leading-[1.17] tracking-[-0.01em] sm:text-4xl">
                The approach
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                I sourced a kalimba sized to fit my printer&apos;s build plate,
                disassembled it, and reworked its tines to the exact notes the
                solo needed. From there, the project became a CAD problem: design
                a drum and housing that could pluck those tines in the right order
                as it&apos;s turned by hand, then print, tune, and assemble the
                whole thing into a working instrument.
              </p>
            </div>
          </div>
        </section>

        {/* CAD render + demo */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance text-3xl font-normal leading-[1.17] tracking-[-0.01em] sm:text-4xl">
              Six iterations to get the geometry right
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              The final assembly is a hand crank turning a drum studded with pegs,
              housed in a shell sized to wrap around the kalimba and hold it at an
              angle. Getting there took six rounds of CAD prototyping, working
              through how each peg needed to be placed and angled to strike its
              tine cleanly without the drum&apos;s pegs needing to extend so far
              that they&apos;d flex or catch.
            </p>

            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              <figure className="flex flex-col gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/kalimbinator/cad-render.png"
                  alt="3D rendered CAD model of the Kalimbinator showing the hand crank, peg drum, and kalimba housing"
                  className="aspect-[16/10] w-full bg-white object-contain"
                />
                <figcaption className="flex flex-col gap-2 border-t pt-4">
                  <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    CAD render
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    The final model: a hand crank drives a peg-studded drum that
                    plucks the kalimba&apos;s tines in sequence as it rotates,
                    housed in a shell sized to wrap around the instrument and
                    hold it at an angle.
                  </p>
                </figcaption>
              </figure>

              <figure className="flex flex-col gap-4">
                <video
                  src="/projects/kalimbinator/demo.mp4"
                  className="aspect-[16/10] w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
                <figcaption className="flex flex-col gap-2 border-t pt-4">
                  <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    The build, working
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Turning the crank rotates the drum, drawing each peg across a
                    tine in order and plucking out the opening notes of the solo,
                    just like the music boxes that inspired it.
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Process — numbered rows instead of icon feature cards */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance text-3xl font-normal leading-[1.17] tracking-[-0.01em] sm:text-4xl">
              How it came together
            </h2>

            <ol className="mt-10 flex flex-col divide-y divide-border/40">
              <li className="grid gap-4 py-8 sm:grid-cols-[48px_1fr]">
                <span className="font-mono text-sm font-medium text-muted-foreground">01</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg tracking-[-0.01em]">Re-tuning the kalimba</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    I disassembled a kalimba sized to fit my printer&apos;s build
                    plate, transposed the solo from tenor saxophone into concert
                    pitch, and rebuilt it with only the tines the piece required.
                    Each one was tuned to match, then arranged from lowest to
                    highest so the drum could be angled without the pegs needing to
                    extend too far.
                  </p>
                </div>
              </li>

              <li className="grid gap-4 py-8 sm:grid-cols-[48px_1fr]">
                <span className="font-mono text-sm font-medium text-muted-foreground">02</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg tracking-[-0.01em]">Modeling the mechanism</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Working from the sheet music, I mapped each note onto the drum
                    in CAD and worked through six prototypes before landing on a
                    model that matched the real kalimba&apos;s geometry and held
                    every peg at the angle it needed to play cleanly.
                  </p>
                </div>
              </li>

              <li className="grid gap-4 py-8 sm:grid-cols-[48px_1fr]">
                <span className="font-mono text-sm font-medium text-muted-foreground">03</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg tracking-[-0.01em]">Printing &amp; assembly</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    The full housing and drum came out of a single six-hour print,
                    and the assembly was mostly a matter of gluing the pieces into
                    place. After test-running it, I noticed a gap between the drum
                    and the kalimba and printed a separate spacer to close it so
                    the pegs could reach the tines properly.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Closing */}
        <section className="relative py-16 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl pt-8">
              <p className="leading-relaxed text-muted-foreground">
                The Kalimbinator doesn&apos;t play perfectly, but it plays, and
                that was the point: a chance to take two things I care about,
                engineering and music, and find a real connection between them.
                Between the CAD work, the tuning, and the print-and-fit cycles, it
                pulled together a lot of what I&apos;d picked up through robotics
                and design into one instrument I can turn the crank on and hear
                come to life.
              </p>
            </div>
            <div className="mt-8 flex flex-col items-start gap-3 border-t border-border/30 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Want to see what else I&apos;ve been building?
              </p>
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to all projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
