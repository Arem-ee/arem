import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/page-layout";
import { GitHubIcon } from "@/lib/icons";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/data/projects";
import { constructMetadata, projectSchema } from "@/lib/seo";
import { siteConfig } from "@/constants";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return constructMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projectSchemaStr = JSON.stringify(
    projectSchema({
      name: project.title,
      description: project.description,
      url: `${siteConfig.url}/projects/${project.slug}`,
    })
  );

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: projectSchemaStr }}
      />
      <section className="border-b py-24 md:py-32">
        <Container size="md">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <Badge>{project.category}</Badge>
            {project.featured && (
              <span className="text-xs font-medium uppercase tracking-wider text-amber-500">
                Featured
              </span>
            )}
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">
            {project.description}
          </p>

          {project.metrics && (
            <p className="mb-6 text-sm font-medium uppercase tracking-wider text-foreground/60">
              {project.metrics}
            </p>
          )}

          <div className="mb-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          <div className="flex gap-3">
            {project.liveUrl && (
              <Button variant="primary" asChild>
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="secondary" asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="h-4 w-4" />
                  Source Code
                </Link>
              </Button>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="md">
          <div className="space-y-16">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">The Problem</h2>
              <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Goals</h2>
              <ul className="space-y-2">
                {project.goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Architecture</h2>
              <p className="leading-relaxed text-muted-foreground">{project.architecture}</p>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-semibold">Technical Decisions</h2>
              <div className="space-y-6">
                {project.technicalDecisions.map((td, i) => (
                  <div key={i} className="rounded-lg border bg-card p-5">
                    <h3 className="mb-2 font-medium">{td.decision}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{td.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-semibold">Challenges & Solutions</h2>
              <div className="space-y-6">
                {project.challenges.map((c, i) => (
                  <div key={i} className="rounded-lg border bg-card p-5">
                    <h3 className="mb-1 text-sm font-medium text-destructive">Challenge</h3>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{c.challenge}</p>
                    <h3 className="mb-1 text-sm font-medium text-emerald-500">Solution</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.solution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Results</h2>
              <ul className="space-y-2">
                {project.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {result}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Lessons Learned</h2>
              <ul className="space-y-2">
                {project.lessonsLearned.map((lesson, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
