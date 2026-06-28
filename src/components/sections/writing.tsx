"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { articles } from "@/data";

function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function WritingSection() {
  return (
    <section id="writing" className="border-t py-24 md:py-32">
      <Container size="md">
        <SectionTitle
          label="Writing"
          title="Thoughts on engineering."
          description="Articles about frontend architecture, system design, and building products that scale."
          className="mb-16"
        />

        <StaggerContainer className="grid gap-4" staggerDelay={0.06}>
          {articles.map((article) => (
            <StaggerItem key={article.title}>
              <Link href={`/blog/${article.slug}`}>
                <motion.div
                  className="group rounded-xl border bg-card p-6 shadow-sm transition-shadow"
                  whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}
                >
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{formatDisplayDate(article.date)}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                    <span>{article.readingTime}</span>
                  </div>
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="text-base font-semibold">{article.title}</h3>
                    <motion.div
                      whileHover={{ x: 3, y: -3 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                    </motion.div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {article.summary}
                  </p>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

export { WritingSection };
