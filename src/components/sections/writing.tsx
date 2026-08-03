"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { blogPosts } from "@/data/blog";

function WritingSection() {
  return (
    <section id="writing" className="border-b py-16 md:py-32">
      <Container size="md">
        <SectionTitle
          label="Writing"
          title="Tutorials and field notes."
          description="Notes on self-custody, multisig wallets, and DAO tooling. Each post ships with code you can run."
          className="mb-8 md:mb-12"
        />

        <div className="border-b">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block border-t py-6 transition-colors hover:bg-surface"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {post.summary}
                </p>
                <div className="mt-3 flex items-center gap-3 font-mono text-xs text-muted-foreground/80">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span>{post.readingTime}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
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
