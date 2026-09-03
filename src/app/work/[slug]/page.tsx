import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/page-layout";
import { GitHubIcon } from "@/lib/icons";
import {
  getAdjacentProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/data/projects";
import { constructMetadata, projectSchema } from "@/lib/seo";
import { siteConfig } from "@/constants";

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
    title: `${project.title} case study`,
    description: project.description,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(slug);

  const projectSchemaStr = JSON.stringify(
    projectSchema({
      name: project.title,
      description: project.description,
      url: `${siteConfig.url}/work/${project.slug}`,
    })
  );

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: projectSchemaStr }}
      />
      <section className="border-b py-16 md:py-32">
        <Container size="md">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold tracking-tight text-primary-foreground">
                {project.title.charAt(0)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{project.category}</Badge>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {project.statusNote}
              </span>
            </div>
          </div>

          <h1 className="mb-4 text-xl font-semibold tracking-tight md:text-2xl">
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

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button variant="primary" asChild>
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live site
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="secondary" asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="h-4 w-4" />
                  Source code
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
              <h2 className="mb-4 text-xl font-semibold">The problem</h2>
              <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">What I built</h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">{project.role}</p>
              <p className="mb-6 leading-relaxed text-muted-foreground">{project.architecture}</p>
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
              <h2 className="mb-6 text-xl font-semibold">Key decisions</h2>
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
              <h2 className="mb-6 text-xl font-semibold">Challenges</h2>
              <div className="space-y-6">
                {project.challenges.map((c, i) => (
                  <div key={i} className="rounded-lg border bg-card p-5">
                    <h3 className="mb-1 text-sm font-medium text-destructive">Challenge</h3>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{c.challenge}</p>
                    <h3 className="mb-1 border-l-2 border-l-primary pl-3 text-sm font-medium text-foreground">Solution</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.solution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Outcome</h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">{project.statusNote}</p>
              <ul className="space-y-2">
                {project.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {result}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-xl font-semibold">Stack</h2>
              <div className="overflow-hidden rounded-lg border bg-card">
                {project.stack.map((s, i) => (
                  <div
                    key={s.tech}
                    className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6 ${i > 0 ? "border-t" : ""}`}
                  >
                    <span className="w-36 shrink-0 text-sm font-medium text-foreground">{s.tech}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{s.usedFor}</span>
                  </div>
                ))}
              </div>
            </div>

            <nav aria-label="Case study navigation" className="border-t pt-10">
              <Link
                href="/#work"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all work
              </Link>
              <div className="grid gap-4 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/work/${prev.slug}`}
                    className="group rounded-lg border bg-card p-5 transition-colors hover:border-primary/50"
                  >
                    <span className="mb-1 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Previous
                    </span>
                    <span className="font-medium text-foreground">{prev.title}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    href={`/work/${next.slug}`}
                    className="group rounded-lg border bg-card p-5 text-right transition-colors hover:border-primary/50"
                  >
                    <span className="mb-1 flex items-center justify-end gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                      Next
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium text-foreground">{next.title}</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
