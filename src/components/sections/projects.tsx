"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Search, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { GitHubIcon } from "@/lib/icons";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { projects } from "@/data";
import { useProjectFilterStore } from "@/stores/project-filter-store";
import type { ProjectCategory } from "@/types";

const categories: (ProjectCategory | "All")[] = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "DevOps",
  "AI",
  "Mobile",
];

function ProjectsSection() {
  const { search, category, sort, setSearch, setCategory, setSort } =
    useProjectFilterStore();

  const filtered = React.useMemo(() => {
    let result = [...projects];

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "popular":
        result.sort((a, b) => (b.metrics ? 1 : 0) - (a.metrics ? 1 : 0));
        break;
    }

    return result;
  }, [search, category, sort]);

  return (
    <section id="projects" className="border-t py-24 md:py-32">
      <Container size="xl">
        <SectionTitle
          label="Projects"
          title="Work that speaks."
          description="Real products and tools I&apos;ve designed, built, and shipped."
          className="mb-12"
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-48 rounded-lg border bg-card pl-9 pr-3 text-sm outline-none transition-colors focus:border-foreground/40"
              />
            </div>

            <div className="flex items-center gap-1 rounded-lg border bg-card px-3 py-1.5 text-sm">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value as "recent" | "popular" | "featured")
                }
                className="bg-transparent text-sm outline-none"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No projects match your search criteria.
          </p>
        ) : (
          <StaggerContainer
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {filtered.map((project) => (
              <StaggerItem key={project.title}>
                <Link href={`/projects/${project.slug}`}>
                  <motion.div
                    className="group rounded-xl border bg-card p-6 shadow-sm transition-shadow"
                    whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
                  >
                    <motion.div
                      className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <line x1="3" x2="21" y1="9" y2="9" />
                        <line x1="9" x2="9" y1="21" y2="9" />
                      </svg>
                    </motion.div>

                    <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {project.metrics && (
                      <p className="mb-4 text-xs font-medium uppercase tracking-wider text-foreground/60">
                        {project.metrics}
                      </p>
                    )}

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <motion.div
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Tag>{tech}</Tag>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                      {project.liveUrl && (
                        <Button variant="primary" size="sm" asChild>
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="secondary" size="sm" asChild>
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GitHubIcon className="h-3.5 w-3.5" />
                            Source
                          </Link>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </Container>
    </section>
  );
}

export { ProjectsSection };
