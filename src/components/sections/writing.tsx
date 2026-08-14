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
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionTitle
              label="Writing"
              title="Tutorials and field notes."
              description="Notes on self-custody, multisig wallets, and DAO tooling. Each post ships with code you can run."
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-b">
              {blogPosts.map((post, i) => (
                <FadeIn
                  key={post.slug}
                  from={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.05}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex gap-5 border-t py-9 transition-colors first:border-t-0"
                    aria-label={`Read ${post.title}`}
                  >
                    <span className="whisper-label mt-1.5 shrink-0 text-muted-foreground/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
                          {post.title}
                        </h3>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {post.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/60">
                        <span>{post.date}</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
                        <span>{post.readingTime}</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
                        <span>{post.tags.slice(0, 2).join(" / ")}</span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { WritingSection };