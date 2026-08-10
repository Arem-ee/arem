import type { NavItem, SiteConfig } from "@/types";
import { socialLinks } from "@/data/socials";

export const siteConfig: SiteConfig = {
  name: "arem.is-a.dev",
  title: "Arem - Web3 Technical Writer & Builder",
  description:
    "Web3 technical writer and builder. Electrical engineering student at the University of Ilorin. I write about self-custody and DAO tooling, and I build products end to end.",
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
    jobTitle: "Web3 Technical Writer & Builder",
    image: "/images/og.jpg",
    sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.twitter],
  },
  keywords: [
    "web3 technical writer",
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
