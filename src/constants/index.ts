import type { NavItem, SiteConfig } from "@/types";
import { socialLinks } from "@/data/socials";

export const siteConfig: SiteConfig = {
  name: "arem.dev",
  title: "Arem - Web3 Technical Writer & Builder",
  description:
    "Web3 technical writer and builder. Electrical engineering student at the University of Ilorin. I write about self-custody and DAO tooling, and I build products end to end.",
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
    jobTitle: "Web3 Technical Writer & Builder",
    image: "/images/og.jpg",
    sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.twitter],
  },
  keywords: [
    "web3",
    "technical writer",
    "multisig wallets",
    "self-custody",
    "dao tooling",
    "ethereum",
    "solidity",
    "react",
    "next.js",
    "electrical engineering",
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
