"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { experiences } from "@/data";

function ExperienceSection() {
  const lineRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="border-t py-24 md:py-36">
      <Container size="lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionTitle
              label="Experience"
              title="What I have done."
              description="Work history, current and previous, with the stack each role ran."
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div ref={lineRef} className="relative">
              <motion.div
                className="absolute left-[3px] top-1 h-[calc(100%-8px)] w-px origin-top bg-border"
                style={{ scaleY: lineScale }}
                aria-hidden="true"
              />
              <div className="space-y-14">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    className="relative pl-10"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.08,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <span
                      className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
                          {exp.role}
                        </h3>
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="whisper-label mt-1.5 inline-block transition-colors hover:text-primary"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <p className="whisper-label mt-1.5">{exp.company}</p>
                        )}
                      </div>
                      <span className="whisper-label shrink-0 text-muted-foreground/60">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {exp.summary}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {exp.achievements.map((achievement, j) => (
                        <motion.li
                          key={j}
                          className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: i * 0.08 + j * 0.06 + 0.15,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                        >
                          <span
                            className="mt-2 h-1 w-2 shrink-0 rounded-[1px] bg-primary/60"
                            aria-hidden="true"
                          />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { ExperienceSection };