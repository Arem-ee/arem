"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { experiences } from "@/data";

function ExperienceSection() {
  return (
    <section id="experience" className="border-t py-24 md:py-40">
      <Container size="lg">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionTitle
              label="Experience"
              title="What I have done."
              description="Work history, current and previous, with the stack each role ran."
              folio="06"
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-7">
            <div className="relative">
              <div
                className="absolute left-[3px] top-1 h-[calc(100%-8px)] w-px bg-border"
                aria-hidden="true"
              />
              <div className="space-y-16 md:space-y-20">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    className="relative pl-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.06,
                      ease: [0.22, 0.1, 0.25, 1],
                    }}
                  >
                    <span
                      className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-foreground">
                          {exp.role}
                        </h3>
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="whisper-label mt-2 inline-block transition-colors hover:text-primary"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <p className="whisper-label mt-2">{exp.company}</p>
                        )}
                      </div>
                      <span className="whisper-label shrink-0 text-muted-foreground/60">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm leading-[1.8] text-muted-foreground">
                      {exp.summary}
                    </p>
                    <ul className="mt-6 space-y-3.5">
                      {exp.achievements.map((achievement, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-sm leading-[1.75] text-muted-foreground"
                        >
                          <span
                            className="mt-2.5 h-1 w-2 shrink-0 rounded-[1px] bg-primary/60"
                            aria-hidden="true"
                          />
                          {achievement}
                        </li>
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