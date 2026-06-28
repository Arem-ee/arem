"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring } from "framer-motion";

import { Navbar } from "@/components/layout/navbar";
import { Skeleton, ProjectCardSkeleton, ArticleCardSkeleton } from "@/components/skeleton";

const HeroSection = dynamic(
  () => import("@/components/sections/hero").then((m) => ({ default: m.HeroSection })),
  { ssr: true }
);

const AboutSection = dynamic(
  () => import("@/components/sections/about").then((m) => ({ default: m.AboutSection })),
  { ssr: true }
);

const ExperienceSection = dynamic(
  () => import("@/components/sections/experience").then((m) => ({ default: m.ExperienceSection })),
  { ssr: true }
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/projects").then((m) => ({ default: m.ProjectsSection })),
  {
    ssr: true,
    loading: () => (
      <section className="border-t py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton className="mb-4 h-6 w-24" />
          <Skeleton className="mb-4 h-10 w-96" />
          <Skeleton className="mb-16 h-5 w-[500px]" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

const SkillsSection = dynamic(
  () => import("@/components/sections/skills").then((m) => ({ default: m.SkillsSection })),
  { ssr: true }
);

const WritingSection = dynamic(
  () => import("@/components/sections/writing").then((m) => ({ default: m.WritingSection })),
  {
    ssr: true,
    loading: () => (
      <section className="border-t py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <Skeleton className="mb-4 h-6 w-24" />
          <Skeleton className="mb-4 h-10 w-96" />
          <Skeleton className="mb-16 h-5 w-[500px]" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

const TestimonialsSection = dynamic(
  () => import("@/components/sections/testimonials").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: true }
);

const GitHubReposSection = dynamic(
  () => import("@/components/sections/github-repos").then((m) => ({ default: m.GitHubReposSection })),
  {
    ssr: true,
    loading: () => (
      <section className="border-t py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton className="mb-4 h-6 w-24" />
          <Skeleton className="mb-4 h-10 w-96" />
          <Skeleton className="mb-16 h-5 w-[500px]" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

const ContactSection = dynamic(
  () => import("@/components/sections/contact").then((m) => ({ default: m.ContactSection })),
  { ssr: true }
);

const FooterSection = dynamic(
  () => import("@/components/sections/footer").then((m) => ({ default: m.FooterSection })),
  { ssr: true }
);

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-foreground"
      style={{ scaleX }}
      role="progressbar"
      aria-valuenow={Math.round(scrollYProgress.get() * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="pt-16" role="main">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <WritingSection />
        <TestimonialsSection />
        <GitHubReposSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
