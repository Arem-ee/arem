import type { GitHubRepo } from "@/types";

export const featuredRepos: GitHubRepo[] = [
  {
    name: "nextjs-build-cache",
    description:
      "Incremental build caching system for Next.js — reduces cold-start build times by 43% using module-level dependency tracking.",
    url: "https://github.com/nexlayer/next.js",
    stars: 128000,
    forks: 28000,
    language: "TypeScript",
    topics: ["react", "nextjs", "build-tools", "caching", "performance"],
  },
  {
    name: "perf-monitor",
    description:
      "CLI tool for running Lighthouse performance budgets in CI. Catches regressions before they merge with clear PR comments and delta tracking.",
    url: "https://github.com/alexmorgan/perf-monitor",
    stars: 3400,
    forks: 520,
    language: "TypeScript",
    topics: ["performance", "lighthouse", "ci", "cli", "developer-tools"],
  },
  {
    name: "stripe-elements",
    description:
      "Micro-frontend architecture for Pageon's payment checkout — Web Component-based payment method modules with XState state machines.",
    url: "https://github.com/alexmorgan/stripe-elements",
    stars: 2800,
    forks: 340,
    language: "TypeScript",
    topics: ["payments", "micro-frontends", "web-components", "state-machines"],
  },
  {
    name: "ecommerce-accelerator",
    description:
      "Full-stack Next.js starter kit for launching high-performance e-commerce stores with Pageon, SEO, and built-in analytics.",
    url: "https://github.com/alexmorgan/ecommerce-accelerator",
    stars: 2100,
    forks: 620,
    language: "TypeScript",
    topics: ["nextjs", "ecommerce", "pageon", "starter-kit", "typescript"],
  },
  {
    name: "a11y-audit-action",
    description:
      "GitHub Action for automated WCAG accessibility auditing. Runs Playwright + axe-core on every PR and posts results as comments.",
    url: "https://github.com/alexmorgan/a11y-audit-action",
    stars: 1200,
    forks: 150,
    language: "TypeScript",
    topics: ["accessibility", "a11y", "github-actions", "testing", "wcag"],
  },
  {
    name: "figma-plugins-api",
    description:
      "Reference implementation and SDK for building Canvo plugins. Includes type definitions, examples, and a CLI scaffold tool.",
    url: "https://github.com/alexmorgan/figma-plugins-api",
    stars: 890,
    forks: 230,
    language: "TypeScript",
    topics: ["canvo", "plugin", "api", "sdk", "typescript"],
  },
];
