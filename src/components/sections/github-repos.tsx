"use client";

import * as React from "react";
import { Star, GitFork } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Tag } from "@/components/ui/tag";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { featuredRepos } from "@/data/github";

function GitHubReposSection() {
  return (
    <section id="github" className="border-t py-24 md:py-32">
      <Container size="xl">
        <SectionTitle
          label="Open Source"
          title="Code I contribute to."
          description="Some of my open-source projects and tools I&apos;ve built for the community."
          className="mb-16"
        />

        <StaggerContainer
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.06}
        >
          {featuredRepos.map((repo) => (
            <StaggerItem key={repo.name}>
              <motion.a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border bg-card p-6 shadow-sm transition-shadow"
                whileHover={{ y: -4, boxShadow: "0 10px 35px rgba(0,0,0,0.1)" }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-muted-foreground"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-sm font-medium">{repo.name}</span>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {repo.description}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <Tag key={topic}>{topic}</Tag>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground/60" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    {repo.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" />
                    {repo.forks.toLocaleString()}
                  </span>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

export { GitHubReposSection };
