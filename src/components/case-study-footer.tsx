import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function CaseStudyFooter({ next }: { next: { href: string; label: string } }) {
  return (
    <div className="flex flex-col items-start gap-5 border-t border-border/30 pt-8 sm:flex-row sm:items-end sm:justify-between">
      <Link
        href="/#projects"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to all projects
      </Link>

      <Link href={next.href} className="group flex flex-col items-start gap-1 sm:items-end">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Next project
        </span>
        <span className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-xl">
          {next.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}
