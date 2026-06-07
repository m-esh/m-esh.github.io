import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ZoomStatement } from "@/components/sections/zoom-statement";
import { Experience } from "@/components/sections/experience";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <ZoomStatement />
        <Experience />
        <ProjectsShowcase />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
