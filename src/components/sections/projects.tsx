"use client";

import Link from "next/link";
import {
  GraduationCap,
  EyeOff,
  ClipboardCheck,
  Car,
  Search,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { projects } from "@/data";
import type { ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusColor: Record<ProjectStatus, string> = {
  launched: "bg-primary",
  shipped: "bg-primary",
  "did-not-win": "bg-foreground",
  postponed: "bg-blue-accent",
};

const statusLabel: Record<ProjectStatus, string> = {
  launched: "Launched",
  shipped: "Shipped",
  "did-not-win": "Did not win",
  postponed: "Postponed",
};

const projectIcons: Record<string, LucideIcon> = {
  propeida: GraduationCap,
  redact: EyeOff,
  auditon: ClipboardCheck,
  "ergo-automotive": Car,
  aletheia: Search,
  "mobile-landing-page": Smartphone,
};

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const Icon = projectIcons[project.slug] ?? GraduationCap;

  return (
    <FadeIn from={index % 2 === 0 ? "left" : "right"} delay={index * 0.04}>
      <div className="group relative border-t transition-colors duration-300 hover:bg-primary/[0.07]">
        <span
          className="absolute left-0 top-0 h-full w-[3px] bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div className="grid gap-6 py-10 pl-6 md:grid-cols-12 md:gap-6 md:py-14">
          <div className="flex items-start gap-4 md:col-span-3">
            <span
              className={cn(
                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                statusColor[project.status]
              )}
              aria-hidden="true"
            />
            <div className="space-y-1.5">
              <p className="whisper-label">{statusLabel[project.status]}</p>
              <p className="text-xs leading-relaxed text-muted-foreground/70">
                {project.statusNote}
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1">
                <Link
                  href={`/work/${project.slug}`}
                  className="decoration-primary underline-offset-4 hover:underline"
                >
                  {project.title}
                </Link>
              </h3>
            </div>
            <p className="mt-4 max-w-prose text-xs leading-[1.8] text-muted-foreground sm:text-[13px]">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-4 md:col-span-3">
            <ul className="flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
              {project.technologies.map((tech) => (
                <li key={tech} className="text-[11px] text-muted-foreground/60">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-5 md:justify-end">
              <Link
                href={`/work/${project.slug}`}
                className="whisper-label decoration-primary underline-offset-4 transition-colors hover:underline"
              >
                Case study
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="whisper-label decoration-primary underline-offset-4 transition-colors hover:underline"
                >
                  Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="whisper-label text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function ProjectsSection() {
  return (
    <section id="work" className="border-b py-24 md:py-36">
      <Container size="xl">
        <SectionTitle
          label="Selected work"
          title="Shipped, paused, or shelved."
          description="Six projects, with their current status. The status column is part of the information, not decoration. This is a small slice of what I've actually built. I keep most client work private, this is just what I can show."
          className="mb-16 md:mb-24"
        />

        <div className="border-b">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export { ProjectsSection };