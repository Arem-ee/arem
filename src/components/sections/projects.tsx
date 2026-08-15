"use client";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import Image from "next/image";
import { projects } from "@/data";
import type { ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusDot: Record<ProjectStatus, string> = {
  launched: "bg-primary",
  shipped: "bg-foreground",
  "did-not-win": "bg-muted-foreground",
  postponed: "bg-muted-foreground/40",
};

const statusLabel: Record<ProjectStatus, string> = {
  launched: "Launched",
  shipped: "Shipped",
  "did-not-win": "Did not win",
  postponed: "Postponed",
};

const rowRhythm = [
  "py-14 md:py-20",
  "py-9 md:py-12",
  "py-16 md:py-24",
  "py-10 md:py-14",
  "py-14 md:py-20",
  "py-11 md:py-16",
];

function StatusBoardRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <FadeIn from={index % 2 === 0 ? "left" : "right"} delay={index * 0.04}>
      <div
        className={cn(
          "group grid gap-4 border-t transition-colors md:grid-cols-12 md:gap-6",
          rowRhythm[index % rowRhythm.length]
        )}
      >
        <span className="whisper-label mt-1 hidden text-muted-foreground/40 md:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex items-start gap-3 md:col-span-3">
          <span
            className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", statusDot[project.status])}
            aria-hidden="true"
          />
          <div className="space-y-1">
            <p
              className={cn(
                "whisper-label",
                project.status === "did-not-win" && "text-muted-foreground/60"
              )}
            >
              {statusLabel[project.status]}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground/70">
              {project.statusNote}
            </p>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="flex items-center gap-3.5">
            {project.logo && (
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 object-contain"
              />
            )}
            <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
              {project.title}
            </h3>
          </div>
          <p className="mt-4 max-w-prose text-xs leading-[1.8] text-muted-foreground sm:text-[13px]">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-4 md:col-span-3">
          <ul className="flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[10px] text-muted-foreground/60"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-5 md:justify-end">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="whisper-label transition-colors hover:text-primary"
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
    </FadeIn>
  );
}

function ProjectsSection() {
  return (
    <section id="work" className="border-b py-24 md:py-48">
      <Container size="xl">
        <SectionTitle
          label="Selected work"
          title="Shipped, paused, or shelved."
          description="Six projects, with their current status. The status column is part of the information, not decoration."
          folio="03"
          className="mb-20 md:mb-28"
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