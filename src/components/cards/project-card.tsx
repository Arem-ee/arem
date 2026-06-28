import * as React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { GitHubIcon } from "@/lib/icons";

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  technologies: string[];
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
}

function ProjectCard({
  title,
  description,
  technologies,
  metrics,
  liveUrl,
  githubUrl,
  className,
  ...props
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl border bg-card p-6 shadow-sm transition-colors hover:border-foreground/20",
        className
      )}
      {...props}
    >
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

      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {metrics && (
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-foreground/60">
          {metrics}
        </p>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="flex gap-3">
        {liveUrl && (
          <Button variant="primary" size="sm" asChild>
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </Link>
          </Button>
        )}
        {githubUrl && (
          <Button variant="secondary" size="sm" asChild>
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <GitHubIcon className="h-3.5 w-3.5" />
              Source
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export { ProjectCard };
