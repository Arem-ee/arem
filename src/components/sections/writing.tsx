"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { blogPosts } from "@/data/blog";

function WritingSection() {
  return (
    <section id="writing" className="border-t py-24 md:py-48">
      <Container size="lg">
        <div className="grid gap-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionTitle
              label="Writing"
              title="Tutorials and field notes."
              description="Notes on self-custody, multisig wallets, and DAO tooling. Each post ships with code you can run."
              folio="07"
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-7">
            <div className="border-b">
              {blogPosts.map((post, i) => (
                <FadeIn
                  key={post.slug}
                  from={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.04}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex gap-5 border-t py-13 transition-colors first:border-t-0"
                    aria-label={`Read ${post.title}`}
                  >
                    <span className="whisper-label mt-1.5 shrink-0 text-muted-foreground/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-base font-medium tracking-tight text-foreground decoration-primary underline-offset-4 transition-colors group-hover:underline sm:text-lg">
                          {post.title}
                        </h3>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-colors duration-300 group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-4 max-w-prose text-xs leading-[1.8] text-muted-foreground sm:text-[13px]">
                        {post.summary}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
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