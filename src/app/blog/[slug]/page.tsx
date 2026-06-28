import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { PageLayout } from "@/components/layout/page-layout";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
import { constructMetadata, articleSchema } from "@/lib/seo";
import { siteConfig } from "@/constants";
import { getBlogImage } from "@/data/assets";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return constructMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleSchemaStr = JSON.stringify(
    articleSchema({
      title: post.title,
      description: post.summary,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedAt: post.date,
    })
  );

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchemaStr }}
      />
      <section className="border-b py-24 md:py-32">
        <Container size="md">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">{post.summary}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="md">
          {post.coverImage && (
            <div className="relative mb-12 aspect-video overflow-hidden rounded-xl border bg-muted">
              <Image
                src={getBlogImage(post.slug)}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
          <article className="prose-custom max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </Container>
      </section>
    </PageLayout>
  );
}
