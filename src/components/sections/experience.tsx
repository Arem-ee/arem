"use client";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { experiences } from "@/data";

function ExperienceSection() {
  return (
    <section id="experience" className="border-t py-24 md:py-36">
      <Container size="lg">
        <div className="grid gap-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionTitle
              label="Experience"
              title="What I have done."
              description="Work history, current and previous, with the stack each role ran."
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-7">
            <div className="relative">
              <div
                className="absolute left-[3px] top-1 h-[calc(100%-8px)] w-px bg-primary"
                aria-hidden="true"
              />
              <div className="space-y-16 md:space-y-20">
                {experiences.map((exp, i) => (
                  <FadeIn key={i} from="left" delay={i * 0.06}>
                    <div className="relative pl-10">
                      <span
                        className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight text-foreground">
                            {exp.role}
                          </h3>
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="whisper-label mt-2 inline-block decoration-primary underline-offset-4 transition-colors hover:underline"
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
                      <p className="text-xs leading-[1.8] text-muted-foreground sm:text-[13px]">
                        {exp.summary}
                      </p>
                      <ul className="mt-7 space-y-4">
                        {exp.achievements.map((achievement, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-xs leading-[1.8] text-muted-foreground sm:text-[13px]"
                          >
                            <span
                              className="mt-2.5 h-1 w-2 shrink-0 rounded-[1px] bg-primary/60"
                              aria-hidden="true"
                            />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
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