"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { blogPosts } from "@/data/blog";

function WritingSection() {
  return (
    <section id="writing" className="border-t py-24 md:py-36">
      <Container size="lg">
        <SectionTitle
          label="Writing"
          title="Tutorials and field notes."
          description="Notes on self-custody, multisig wallets, and DAO tooling. Each post ships with code you can run."
          className="mb-16 md:mb-24"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {blogPosts.map((post, i) => (
            <FadeIn
              key={post.slug}
              from={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.05}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-colors hover:border-foreground/20"
                aria-label={`Read ${post.title}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground/80 sm:text-lg">
                    {post.title}
                  </h3>
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 flex-1 text-[13px] leading-[1.8] text-muted-foreground">
                  {post.summary}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground/60">
                  <span>{post.date}</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
                  <span>{post.readingTime}</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
                  <span>{post.tags.slice(0, 2).join(" / ")}</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { WritingSection };