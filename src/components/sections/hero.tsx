"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialLink } from "@/components/cards/social-link";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/lib/icons";
import { useCounter, useParallax } from "@/hooks";
import { socialLinks } from "@/constants";
import { stats } from "@/data";
import { cn } from "@/lib/utils";

const headlineWords = ["Products", "engineered", "to", "scale."];

function AnimatedCounter({
  end,
  suffix = "",
}: {
  end: number;
  suffix?: string;
}) {
  const { ref, display } = useCounter({ end, suffix });
  return (
    <span ref={ref} className="text-3xl font-bold tracking-tight">
      {display}
    </span>
  );
}

function HeroSection() {
  const { ref: parallaxRef, y: parallaxY } = useParallax(0.3);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-12 pb-24 md:pt-14 md:pb-32 lg:pt-16 lg:pb-40"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <Container size="xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                  animate={{ opacity: [0.75, 0.3, 0.75], scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Available for opportunities
              </span>
            </motion.div>

            <div className="space-y-4">
              <h1 className="overflow-hidden text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    className={cn(
                      "inline-block mr-[0.3em]",
                      word === "scale." && "text-muted-foreground"
                    )}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.12,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Senior Software Engineer with a decade of experience building
                systems that millions rely on. I architect, build, and ship
                products that move the needle.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="primary" size="lg" asChild>
                  <Link href="#projects">
                    View Work
                    <ArrowDown className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" size="lg" asChild>
                  <Link href="#contact">Contact Me</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <SocialLink
                href={socialLinks.github}
                label="GitHub"
                icon={<GitHubIcon className="h-4 w-4" />}
              />
              <SocialLink
                href={socialLinks.linkedin}
                label="LinkedIn"
                icon={<LinkedInIcon className="h-4 w-4" />}
              />
              <SocialLink
                href={socialLinks.twitter}
                label="Twitter"
                icon={<TwitterIcon className="h-4 w-4" />}
              />
            </motion.div>
          </div>

          <motion.div
            ref={parallaxRef}
            className="relative mx-auto w-[320px] lg:mx-0 lg:w-[520px] lg:justify-self-end"
            style={{ y: parallaxY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[320px] lg:min-h-[420px]">
              <Image
                src="/images/profile-hero.png"
                alt="hero visual"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 520px, 520px"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <motion.div
            className="flex w-full items-center justify-between gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
          >
            {stats.map((stat) => {
              const numValue = parseInt(stat.value);
              return (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 text-center"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                    },
                  }}
                >
                  <AnimatedCounter end={numValue} suffix="+" />
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
