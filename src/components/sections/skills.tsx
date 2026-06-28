"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Tag } from "@/components/ui/tag";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { skillCategories } from "@/data";

const skillProficiencies: Record<string, number> = {
  React: 95,
  "Next.js": 93,
  TypeScript: 90,
  "Tailwind CSS": 88,
  "Framer Motion": 80,
  "Node.js": 85,
  PostgreSQL: 82,
  Redis: 70,
  GraphQL: 78,
  "REST APIs": 90,
  AWS: 80,
  Docker: 75,
  Kubernetes: 65,
  "CI/CD": 82,
  Terraform: 60,
  "System Design": 92,
  Architecture: 88,
  "Team Leadership": 85,
  "Technical Writing": 78,
};

function AnimatedProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
      <motion.div
        className="h-full rounded-full bg-foreground"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="border-t py-24 md:py-32">
      <Container size="xl">
        <SectionTitle
          label="Skills"
          title="Technologies I work with."
          description="The tools, languages, and platforms I use to build production systems."
          align="center"
          className="mb-16"
        />

        <StaggerContainer
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.08}
        >
          {skillCategories.map((category) => (
            <StaggerItem key={category.category}>
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      className="space-y-1"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="flex items-center justify-between">
                        <Tag className="transition-colors hover:border-foreground/40">
                          {skill}
                        </Tag>
                        <span className="text-[11px] font-medium tabular-nums text-muted-foreground">
                          {skillProficiencies[skill] ?? 70}%
                        </span>
                      </div>
                      <AnimatedProgressBar
                        value={skillProficiencies[skill] ?? 70}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

export { SkillsSection };
