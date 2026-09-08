import { Mail } from "lucide-react";

import { LinkedInIcon } from "@/components/icons";

import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { TextRewind } from "@/components/ui/text-rewind";
import { LocalTime } from "@/components/site-status";
import { CopyEmail } from "@/components/copy-email";

const socials = [{ label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedInIcon }];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="animate-fade-up text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          <TextRewind text="Contact me" />
        </h2>

        <p
          style={{ animationDelay: "0.06s" }}
          className="animate-fade-up mx-auto mt-5 max-w-xl text-balance leading-relaxed text-muted-foreground"
        >
          If you&apos;re working on something mechanical, electronic, or somewhere in
          between, I&apos;d like to hear about it. Questions about any of these
          projects are welcome too.
        </p>

        <div
          style={{ animationDelay: "0.12s" }}
          className="animate-fade-up mt-9 flex flex-col items-center gap-6"
        >
          <Magnetic>
            <Button size="lg" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden /> Email me directly
              </a>
            </Button>
          </Magnetic>

          {/* Selectable plain text, plus a copy button that never replaces it. */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="select-all font-mono text-sm text-muted-foreground">
              {profile.email}
            </span>
            <CopyEmail email={profile.email} />
          </div>

          <div className="flex items-center gap-6">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring inline-flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon className="size-4" aria-hidden /> {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-3 border-t border-border/30 px-6 pt-8 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left lg:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <LocalTime className="text-xs" />
      </footer>
    </section>
  );
}
