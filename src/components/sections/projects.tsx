"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Search, ArrowUpDown, X, ArrowRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { GitHubIcon } from "@/lib/icons";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { projects } from "@/data";
import { getProjectImage } from "@/data/assets";
import { useProjectFilterStore } from "@/stores/project-filter-store";
import type { Project, ProjectCategory } from "@/types";

const categories: (ProjectCategory | "All")[] = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "DevOps",
  "AI",
  "Mobile",
];

function ProjectLightbox({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border bg-card shadow-2xl"
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 10, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative aspect-video w-full overflow-hidden border-b bg-muted">
          <Image
            src={getProjectImage(project.slug)}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Tag>{project.category}</Tag>
            {project.metrics && (
              <span className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                {project.metrics}
              </span>
            )}
          </div>

          <h2 className="mb-3 text-2xl font-bold tracking-tight">{project.title}</h2>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
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

          <Button variant="outline" size="sm" asChild>
            <Link href={`/projects/${project.slug}`} onClick={onClose}>
              Full case study
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-colors hover:bg-background"
          aria-label="Close project details"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

function TiltCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200,
    damping: 22,
  });

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="group [perspective:1000px]">
      <motion.button
        onClick={onOpen}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="block w-full cursor-pointer rounded-xl border bg-card p-6 text-left shadow-sm transition-shadow group-hover:shadow-lg"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="dialog"
      >
        <div style={{ transform: "translateZ(30px)" }}>
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
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
          </div>

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
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
            View details
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </motion.button>
    </div>
  );
}

function ProjectsSection() {
  const [active, setActive] = React.useState<Project | null>(null);
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
    <section id="projects" className="border-t py-16 md:py-32">
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
                <TiltCard
                  project={project}
                  onOpen={() => setActive(project)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </Container>

      <AnimatePresence>
        {active && (
          <ProjectLightbox project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export { ProjectsSection };
