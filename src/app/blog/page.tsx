import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/layout/page-layout";
import { blogPosts } from "@/data/blog";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export const metadata: Metadata = constructMetadata({
  title: "Blog",
  description: "Thoughts on frontend architecture, system design, and building products that scale.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <PageLayout>
      <section className="border-b py-24 md:py-32">
        <Container size="md">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts on frontend architecture, system design, and building products that scale.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="md">
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-foreground/20 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{formatDisplayDate(post.date)}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                    <span>{post.readingTime}</span>
                  </div>
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold group-hover:text-foreground/80">
                      {post.title}
                    </h2>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.summary}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
