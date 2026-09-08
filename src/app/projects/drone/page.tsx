import type { Metadata } from "next";

import { ScrollProgress } from "@/components/scroll-progress";
import { TiltCard } from "@/components/tilt-card";
import { CaseStudyNav } from "@/components/case-study-nav";
import { CaseStudyFooter } from "@/components/case-study-footer";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "drone", label: "The drone" },
  { id: "glove", label: "The glove" },
  { id: "flight", label: "Flight" },
];

export const metadata: Metadata = {
  title: "Gesture-Controlled Drone",
  description:
    "A 3D-printed drone flown with a flex-sensor glove: hand gestures become stick inputs, streamed from an ESP32 on the back of your hand to a Betaflight flight controller.",
};

export default function DronePage() {
  return (
    <>
      <ScrollProgress />

      <CaseStudyNav sections={sections} />

      <main className="flex-1 pt-16">
        {/* Hero. Text column beside the real hardware so the build is visible
            in the first screen instead of a full viewport of prose. */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.15fr_minmax(0,26rem)] lg:px-8">
            <div className="flex flex-col gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Built with a friend · 2026
            </span>
            {/* The hyphen is a break opportunity, so the title kept splitting
                as "Gesture-" / "Controlled Drone". The compound is held
                together from `sm` up, where it fits; below that it must be
                allowed to break or it overflows a phone screen. */}
            <h1 className="text-pretty font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              <span className="whitespace-normal sm:whitespace-nowrap">Gesture-Controlled</span>{" "}
              Drone
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              A drone you fly with your hand instead of sticks: curl your
              fingers and a sensor glove sends the same commands a transmitter
              would, to a 3D-printed aircraft whose ducts keep the props out of
              trouble while it learns to hover.
            </p>
            <dl className="mt-2 grid grid-cols-2 gap-4 pt-5 text-sm sm:max-w-2xl sm:grid-cols-4">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Role
                </dt>
                <dd className="font-medium">Design &amp; build</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Tools
                </dt>
                <dd className="font-medium">CAD, ESP32, Betaflight</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Control
                </dt>
                <dd className="font-medium">Flex-sensor glove</dd>
              </div>
              {/* States only what the footage actually shows, so a reader can
                  tell a demonstrated capability from an intended one. */}
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Demonstrated
                </dt>
                <dd className="font-medium">Lift-off &amp; live channel input</dd>
              </div>
            </dl>
            </div>

            <figure className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/drone/frame-assembled.jpg"
                  alt="The assembled 3D-printed drone frame with four ducted propellers, motors and the flight controller mounted"
                  className="aspect-[3/4] size-full object-cover"
                  decoding="async"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/drone/glove.jpg"
                  alt="The control glove with flex sensors taped along the fingers and its electronics on the back of the hand"
                  className="aspect-[3/4] size-full object-cover"
                  decoding="async"
                />
              </div>
              <figcaption className="text-sm leading-relaxed text-muted-foreground">
                The two halves that have to agree: the printed aircraft, and the
                glove that flies it.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Overview — dual column */}
        <section id="overview" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The idea
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Conventional drone controllers typically use two sticks, and
                learning them is half the battle. We wanted to skip the sticks
                entirely: point your hand, curl your fingers, and have the
                aircraft respond. That turned one project into two builds that
                had to meet in the middle, a custom aircraft and a wearable
                controller, split between me and a friend.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The system
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Three flex sensors and a motion sensor on a glove read your hand
                pose. An ESP32 on the back of the hand converts finger curl and
                orientation into the same channel commands a normal transmitter
                would send, and streams them wirelessly to a receiver board
                riding the drone, where a Betaflight flight controller turns
                them into motor output.
              </p>
            </div>
          </div>
        </section>

        {/* The drone */}
        <section id="drone" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              An airframe printed in one piece
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              The frame was modeled in CAD around the electronics it had to
              carry: four brushless motors inside full prop ducts, a whoop-class
              flight controller in the center, and a mount for the radio board.
              The ducts double as crash protection, which mattered, because a
              drone learning to read hand gestures spends a lot of time landing
              badly.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/drone/frame-assembled.jpg"
                    alt="The assembled 3D-printed drone frame with four ducted propellers and motors installed"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-1 p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    The printed frame
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Motors mounted and wired, with the four prop ducts printed
                    directly into the frame instead of bolted on afterward.
                  </p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/drone/flight-controller.jpg"
                    alt="Close-up of the all-in-one flight controller board mounted in the center of the drone frame"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-1 p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    The brains
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A whoop-class all-in-one flight controller sits dead center,
                    running Betaflight and driving all four motors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The glove */}
        <section id="glove" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              A transmitter you wear
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              The controller is a work glove with three flex sensors taped along
              the fingers, each one a simple voltage divider whose resistance
              changes as the finger bends. The ESP32 reads them alongside its
              motion sensor, maps the raw readings through a calibration curve,
              and sends the result to the drone many times a second.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/drone/glove.jpg"
                    alt="The control glove with flex sensors taped along the fingers and an electronics board on the back of the hand"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-1 p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    The glove
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Flex sensors run down the fingers and the electronics ride
                    the back of the hand, so the controller is light enough to
                    wear and goes wherever your hand does.
                  </p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl bg-card/70">
                <TiltCard className="aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/drone/glove-flex-sensors.jpg"
                    alt="Close-up of the flex sensors and voltage divider resistors wired onto the glove fingers"
                    className="size-full object-cover"
                  />
                </TiltCard>
                <div className="flex flex-col gap-1 p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Sensor wiring
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Each flex sensor pairs with an inline resistor to form a
                    voltage divider, soldered point-to-point and strain-relieved
                    with tape so the wiring survives a clenched fist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flight */}
        <section id="flight" className="relative scroll-mt-16 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Getting it off the bench
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Before anything flew, the glove&apos;s signals had to look like a
              normal radio link to the flight controller. That meant
              calibrating each flex sensor&apos;s range in the firmware, then
              watching the receiver tab in Betaflight Configurator move as
              fingers curled, until every channel tracked the way a real
              transmitter&apos;s would.
            </p>

            <div className="mt-10 flex flex-col overflow-hidden rounded-xl bg-card/70 sm:mx-auto sm:max-w-2xl">
              <video
                src="/projects/drone/betaflight-tuning.mp4"
                className="aspect-[16/10] w-full bg-black object-contain"
                controls
                muted
                playsInline
                preload="metadata"
              />
              <div className="flex flex-col gap-1 p-6">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Betaflight setup
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The receiver tab in Betaflight Configurator, with each bar
                  moving as a finger curls, the same channel mapping any new
                  transmitter goes through.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-10 flex max-w-sm flex-col overflow-hidden rounded-xl bg-card/70">
              <video
                src="/projects/drone/flight-demo.mp4"
                className="aspect-[9/16] w-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
              <div className="flex flex-col gap-1 p-6">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  First lift-off
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Launching from an open palm: props spin up and the drone climbs
                  off the hand under its own power.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="relative py-16 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl pt-8">
              <p className="leading-relaxed text-muted-foreground">
                It lifts off, and the glove&apos;s channels move in Betaflight
                the way a transmitter&apos;s would. Flying it on gestures alone,
                reliably, is still ahead of us. What we built ourselves is the
                frame, the glove, the wiring, and the firmware that turns a
                bending finger into a channel value; the motors, the flight
                controller, and Betaflight itself are off-the-shelf parts we
                integrated. It&apos;s still the most end-to-end project either
                of us has taken on: mechanical design, electronics, firmware,
                and flight tuning all have to work at once, or nothing leaves
                the ground.
              </p>
            </div>
            <div className="mt-8">
              <CaseStudyFooter next={{ href: "/projects/kalimbinator", label: "Kalimbinator" }} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
