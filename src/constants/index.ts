import type { NavItem, SiteConfig } from "@/types";
import { socialLinks } from "@/data/socials";

export const siteConfig: SiteConfig = {
  name: "arem.is-a.dev",
  title: "Arem - Fullstack Developer & AI Engineer",
  description:
    "Fullstack developer and AI engineer. I build products end to end, from architecture to shipped code. Based in Nigeria, studying electrical engineering at the University of Ilorin.",
  url: "https://arem.is-a.dev",
  ogImage: "/images/profile-hero.png",
  links: {
    github: socialLinks.github,
    linkedin: socialLinks.linkedin,
    twitter: socialLinks.twitter,
  },
  author: {
    name: "Arem",
    email: socialLinks.email,
    jobTitle: "Fullstack Developer & AI Engineer",
    image: "/images/og.jpg",
    sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.twitter],
  },
  keywords: [
    "fullstack developer",
    "AI engineer",
    "technical writing portfolio",
    "self-custody crypto",
    "multisig wallet tutorial",
    "DAO treasury management",
    "smart contract education",
    "crypto wallet security",
    "Solidity",
    "Ethereum",
    "on-chain verification",
    "timelock contracts",
    "developer portfolio",
    "electrical engineering student",
    "React",
    "Next.js",
    "TypeScript",
  ],
};

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Writing", href: "/#writing" },
  { label: "Beyond Code", href: "/beyond-code" },
  { label: "Contact", href: "/#contact" },
];

export { socialLinks };
