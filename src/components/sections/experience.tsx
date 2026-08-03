"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations";
import { experiences } from "@/data";

function ExperienceSection() {
  const lineRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="border-t py-16 md:py-32">
      <Container size="md">
        <FadeIn>
          <SectionTitle
            label="Experience"
            title="What I have done."
            description="Work history, current and previous, with the stack each role ran."
            className="mb-16"
          />
        </FadeIn>

        <div ref={lineRef} className="relative space-y-8 md:space-y-10">
          <motion.div
            className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px origin-top bg-border"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="relative pl-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <motion.div
                className="absolute left-[13px] top-[5px] h-3 w-3 rounded-full border-2 border-foreground bg-background"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.15 + 0.2,
                }}
              />
              <motion.div
                className="rounded-xl border bg-card p-6 shadow-sm"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>
                  <Badge variant="secondary" className="w-fit shrink-0">
                    {exp.duration}
                  </Badge>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {exp.summary}
                </p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, j) => (
                    <motion.li
                      key={j}
                      className="flex gap-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.15 + j * 0.08 + 0.3,
                      }}
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                      <span className="text-muted-foreground">
                        {achievement}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { ExperienceSection };
