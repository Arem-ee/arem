"use client";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { projects } from "@/data";
import type { ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusDot: Record<ProjectStatus, string> = {
  launched: "bg-primary",
  shipped: "bg-foreground",
  "did-not-win": "bg-muted-foreground",
  postponed: "bg-muted-foreground/50",
};

const statusLabel: Record<ProjectStatus, string> = {
  launched: "Launched",
  shipped: "Shipped",
  "did-not-win": "Did not win",
  postponed: "Postponed",
};

function StatusBoardRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <FadeIn delay={index * 0.05}>
      <div className="group grid gap-3 border-t py-8 transition-colors hover:bg-surface md:grid-cols-12 md:gap-6">
        <div className="flex items-start gap-3 md:col-span-3">
          <span
            className={cn(
              "mt-1.5 h-2 w-2 shrink-0 rounded-full",
              statusDot[project.status]
            )}
            aria-hidden="true"
          />
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {statusLabel[project.status]}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground/80">
              {project.statusNote}
            </p>
          </div>
        </div>

        <div className="md:col-span-6">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-3 md:col-span-3">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="font-mono text-xs text-muted-foreground/80"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
              >
                Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary hover:text-foreground"
              >
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function ProjectsSection() {
  return (
    <section id="work" className="border-b py-16 md:py-32">
      <Container size="xl">
        <SectionTitle
          label="Selected work"
          title="Shipped, paused, or shelved."
          description="Four projects, with their current status. The status column is part of the information, not decoration."
          className="mb-8 md:mb-12"
        />

        <div className="border-b">
          {projects.map((project, i) => (
            <StatusBoardRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export { ProjectsSection };
