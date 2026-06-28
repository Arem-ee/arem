"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { Navbar } from "@/components/layout/navbar";
import { FooterSection } from "@/components/sections/footer";

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

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="pt-16" role="main">
        {children}
      </main>
      <FooterSection />
    </>
  );
}

export { PageLayout };
