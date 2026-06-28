import type { NavItem, SiteConfig } from "@/types";
import { socialLinks } from "@/data/socials";

export const siteConfig: SiteConfig = {
  name: "arem.dev",
  title: "Arem — Senior Software Engineer & Product Engineer",
  description:
    "Senior Software Engineer with 10+ years of experience building high-performance web applications at scale. Specializing in React, Next.js, TypeScript, and system design.",
  url: "https://arem.dev",
  ogImage: "/images/og.jpg",
  links: {
    github: socialLinks.github,
    linkedin: socialLinks.linkedin,
    twitter: socialLinks.twitter,
  },
  author: {
    name: "Arem",
    email: socialLinks.email,
    jobTitle: "Senior Software Engineer",
    image: "/images/og.jpg",
    sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.twitter],
  },
  keywords: [
    "senior software engineer",
    "react developer",
    "next.js developer",
    "typescript",
    "frontend architect",
    "web development",
    "portfolio",
    "system design",
  ],
};

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
];

export { socialLinks };
