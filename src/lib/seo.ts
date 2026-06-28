import type { Metadata } from "next";
import { siteConfig } from "@/constants";

export function constructMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;
  const resolvedTitle = title
    ? `${title} | ${siteConfig.author.name}`
    : siteConfig.title;
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedOgImage = ogImage
    ? `${siteConfig.url}${ogImage}`
    : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: siteConfig.author.name,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: siteConfig.author.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedOgImage],
      creator: siteConfig.links.twitter?.split("/").pop() ?? "@alexmorgan",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: { canonical: url },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    givenName: siteConfig.author.name.split(" ")[0],
    familyName: siteConfig.author.name.split(" ").pop(),
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.author.image}`,
    email: siteConfig.author.email,
    jobTitle: siteConfig.author.jobTitle,
    sameAs: siteConfig.author.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.author.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: personSchema(),
  };
}

export function articleSchema({
  title,
  description,
  url,
  publishedAt,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    author: {
      "@type": "Person",
      name: authorName ?? siteConfig.author.name,
      url: siteConfig.url,
    },
    datePublished: publishedAt,
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

export function projectSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "WebApplication",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

export function jsonLd(...schemas: Record<string, unknown>[]) {
  return schemas.map((schema) => ({
    __html: JSON.stringify(schema),
  }));
}
