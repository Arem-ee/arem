"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialLink } from "@/components/cards/social-link";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/lib/icons";
import { useCounter } from "@/hooks";
import { socialLinks } from "@/constants";
import { stats } from "@/data";
import { cn } from "@/lib/utils";

const headlineWords = ["Products", "engineered", "to", "scale."];

const greetings = [
  { text: "Hello", lang: "English" },
  { text: "Bonjour", lang: "French" },
  { text: "Hola", lang: "Spanish" },
  { text: "Hallo", lang: "German" },
  { text: "Ciao", lang: "Italian" },
  { text: "Olá", lang: "Portuguese" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "你好", lang: "Chinese" },
  { text: "Bawo", lang: "Yoruba" },
];

function HelloCycler() {
  const [index, setIndex] = React.useState(0);

  const next = () => setIndex((i) => (i + 1) % greetings.length);

  return (
    <motion.button
      onClick={next}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Click to see hello in another language"
      title="Click to cycle through 10 languages"
    >
      <span aria-hidden="true">👋</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={greetings[index].lang}
          className="inline-flex items-baseline gap-1.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {greetings[index].text}
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            / {greetings[index].lang}
          </span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

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
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 500], [1, 0.1]);
  const imageOpacity = useTransform(scrollY, [280, 500], [1, 0]);
  const borderRadius = useTransform(scrollY, [0, 500], ["0%", "50%"]);

  return (
    <section id="hero" className="relative">
      <motion.div
        className="fixed inset-0 z-40 bg-background"
        style={{
          scale,
          opacity: imageOpacity,
          borderRadius,
          transformOrigin: "top left",
        }}
      >
        <Image
          src="/images/profile-hero.png"
          alt="Arem — Senior Software Engineer"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="relative z-10 pt-[100svh]">
        <div className="relative overflow-hidden pb-24 md:pb-32">
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
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
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
                </div>
                <HelloCycler />
              </motion.div>

              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
                  },
                }}
              >
                <h1 className="overflow-hidden text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {headlineWords.map((word, i) => (
                    <motion.span
                      key={i}
                      className={cn(
                        "inline-block mr-[0.3em]",
                        word === "scale." && "text-muted-foreground"
                      )}
                      variants={{
                        hidden: { opacity: 0, y: 60 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0.25, 0.1, 0.25, 1],
                          },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
                <motion.p
                  className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  Senior Software Engineer with a decade of experience building
                  systems that millions rely on. I architect, build, and ship
                  products that move the needle.
                </motion.p>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
