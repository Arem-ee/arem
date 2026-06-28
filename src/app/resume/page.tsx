"use client";

import * as React from "react";
import { Download, Printer } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { PageLayout } from "@/components/layout/page-layout";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { resumeData } from "@/data/resume";
import { useAnalyticsStore } from "@/stores/analytics-store";

function ResumePage() {
  const track = useAnalyticsStore((s) => s.track);

  function handleDownload() {
    track({ type: "resume_download", payload: { timestamp: Date.now() } });
    window.print();
  }

  return (
    <PageLayout>
      <section className="border-b py-16 md:py-24 print:border-none print:py-8">
        <Container size="md">
          <FadeIn>
            <div className="no-print mb-8 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Resume</h1>
                <p className="mt-2 text-muted-foreground">Software Engineer &bull; Architect &bull; Leader</p>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                  Download / Print
                </Button>
                <Button variant="ghost" size="icon" onClick={() => window.print()} aria-label="Print resume">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </FadeIn>

          <SlideUp>
            <div className="mb-12">
              <p className="leading-relaxed text-muted-foreground">{resumeData.summary}</p>
            </div>
          </SlideUp>
        </Container>
      </section>

      <section className="py-16 md:py-24 print:py-6" id="resume-content">
        <Container size="md">
          <StaggerContainer className="space-y-12" staggerDelay={0.1}>
            <StaggerItem>
              <h2 className="mb-6 text-2xl font-semibold">Experience</h2>
              <div className="space-y-8">
                {resumeData.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    className="relative border-l-2 border-border pl-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-foreground bg-background" />
                    <div className="mb-1 flex flex-wrap items-baseline gap-2">
                      <h3 className="font-semibold">{exp.role}</h3>
                      <span className="text-sm text-muted-foreground">at {exp.company}</span>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{exp.period} &bull; {exp.location}</p>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((achievement, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-6 text-2xl font-semibold">Education</h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="rounded-lg border bg-card p-5">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.school} &bull; {edu.period}
                    </p>
                    {edu.details && (
                      <p className="mt-1 text-sm text-muted-foreground">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-6 text-2xl font-semibold">Skills</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {resumeData.skills.map((group, i) => (
                  <div key={i} className="rounded-lg border bg-card p-5">
                    <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <Tag key={skill}>{skill}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-6 text-2xl font-semibold">Certifications</h2>
              <div className="space-y-3">
                {resumeData.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-4">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-6 text-2xl font-semibold">Languages</h2>
              <div className="flex flex-wrap gap-4">
                {resumeData.languages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-sm text-muted-foreground">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>
    </PageLayout>
  );
}

export default ResumePage;
