"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring } from "framer-motion";

import { Navbar } from "@/components/layout/navbar";
import { Skeleton } from "@/components/skeleton";

const HeroSection = dynamic(
  () => import("@/components/sections/hero").then((m) => ({ default: m.HeroSection })),
  { ssr: true }
);

const AboutSection = dynamic(
  () => import("@/components/sections/about").then((m) => ({ default: m.AboutSection })),
  { ssr: true }
);

const HowIWorkSection = dynamic(
  () => import("@/components/sections/how-i-work").then((m) => ({ default: m.HowIWorkSection })),
  { ssr: true }
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/projects").then((m) => ({ default: m.ProjectsSection })),
  {
    ssr: true,
    loading: () => (
      <section className="border-b py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton className="mb-4 h-4 w-28" />
          <Skeleton className="mb-4 h-10 w-80" />
          <Skeleton className="mb-16 h-5 w-[420px]" />
          <div className="space-y-10 border-b">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-none" />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

const MeetAremSection = dynamic(
  () => import("@/components/sections/meet-arem").then((m) => ({ default: m.MeetAremSection })),
  {
    ssr: true,
    loading: () => (
      <section className="border-b py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-12">
            <Skeleton className="aspect-[4/5] h-80 w-full max-w-sm rounded-2xl lg:col-span-5" />
            <div className="space-y-6 lg:col-span-6 lg:col-start-7">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-96" />
              <Skeleton className="h-5 w-[420px]" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

const CapabilitiesSection = dynamic(
  () => import("@/components/sections/capabilities").then((m) => ({ default: m.ServicesSection })),
  { ssr: true }
);

const ExperienceSection = dynamic(
  () => import("@/components/sections/experience").then((m) => ({ default: m.ExperienceSection })),
  { ssr: true }
);

const WritingSection = dynamic(
  () => import("@/components/sections/writing").then((m) => ({ default: m.WritingSection })),
  {
    ssr: true,
    loading: () => (
      <section className="border-t py-24 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <Skeleton className="mb-4 h-4 w-28" />
          <Skeleton className="mb-4 h-10 w-80" />
          <Skeleton className="mb-16 h-5 w-[420px]" />
          <div className="space-y-9 border-b">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-none" />
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

const Konami = dynamic(
  () => import("@/components/konami").then((m) => ({ default: m.Konami })),
  { ssr: false }
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
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-primary"
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
      <main id="main-content" className="pt-12" role="main">
        <HeroSection />
        <AboutSection />
        <HowIWorkSection />
        <ProjectsSection />
        <MeetAremSection />
        <CapabilitiesSection />
        <ExperienceSection />
        <WritingSection />
        <ContactSection />
      </main>
      <FooterSection />
      <Konami />
    </>
  );
}