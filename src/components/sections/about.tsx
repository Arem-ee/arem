"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";
import { strengths } from "@/data";

const strengthIcons: Record<string, React.ReactNode> = {
  Lightbulb: (
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
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  Layers: (
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
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0l8.57-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  ),
  Zap: (
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
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  Users: (
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

function AboutSection() {
  return (
    <section id="about" className="border-t py-24 md:py-32">
      <Container size="xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <SectionTitle
              label="About"
              title="Engineer by trade, builder by nature."
              description="I've spent the last decade working across startups and scale-ups, shipping products that balance technical excellence with real business impact."
            />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                My career started in a small agency where I learned to ship fast
                and wear many hats. That foundation taught me that great
                engineering isn&apos;t just about writing clean code &mdash; it&apos;s about
                understanding the problem, the user, and the business.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Today, I focus on building systems that scale &mdash; from
                micro-frontend architectures serving millions to developer
                tooling that makes teams more productive. I believe in
                craftsmanship, clear communication, and shipping work that
                stands the test of time.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                When I&apos;m not coding, I&apos;m mentoring engineers, contributing to
                open source, or writing about what I&apos;ve learned.
              </motion.p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {strengths.map((strength) => (
              <StaggerItem key={strength.title}>
                <motion.div
                  className="group rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    {strengthIcons[strength.icon]}
                  </div>
                  <h3 className="mb-2 text-base font-semibold">
                    {strength.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {strength.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}

export { AboutSection };
