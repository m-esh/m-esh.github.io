import { Mail } from "lucide-react";

import { LinkedInIcon } from "@/components/icons";

import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";

const socials = [{ label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedInIcon }];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="animate-fade-up text-balance text-[clamp(3rem,9vw,6.5rem)] font-normal leading-[1.0] tracking-[-0.02em]">
          Contact me
        </h2>

        <div
          style={{ animationDelay: "0.1s" }}
          className="animate-fade-up mt-12 flex flex-wrap items-center gap-8"
        >
          <Magnetic>
            <Button size="lg" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail /> Email me directly
              </a>
            </Button>
          </Magnetic>

          <div className="flex items-center gap-6">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon className="size-4" /> {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-20 flex max-w-6xl flex-col items-center gap-2 border-t px-6 pt-8 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} {profile.name}.</p>
        <p>Toronto, Canada</p>
      </footer>
    </section>
  );
}
