import type {
  Article,
  Experience,
  Project,
  SkillCategory,
  Stat,
  Strength,
  Testimonial,
} from "@/types";

export const stats: Stat[] = [
  { value: "2+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "10M+", label: "Users Impacted" },
  { value: "20+", label: "Technologies" },
];

export const strengths: Strength[] = [
  {
    title: "Product Thinking",
    description:
      "I build with the end-user in mind, balancing technical excellence with product goals to deliver meaningful impact at every stage.",
    icon: "Lightbulb",
  },
  {
    title: "System Design",
    description:
      "Architecting scalable, resilient systems that handle millions of users without breaking a sweat — from monoliths to micro-frontends.",
    icon: "Layers",
  },
  {
    title: "Performance",
    description:
      "Obsessed with speed. I optimise everything from database queries to bundle sizes for sub-second experiences everywhere.",
    icon: "Zap",
  },
  {
    title: "Team Leadership",
    description:
      "Mentoring engineers, setting technical direction, and fostering a culture of ownership and high-quality output across organisations.",
    icon: "Users",
  },
];

export const experiences: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Nexlayer",
    companyUrl: "https://nexlayer.io",
    duration: "2025 \u2014 Present",
    summary:
      "Building the platform that powers the modern web. Working across the frontend platform team to improve developer experience and framework performance for millions of developers worldwide.",
    achievements: [
      "Reduced Next.js cold-start build times by 43% through incremental caching redesign adopted by the core framework",
      "Led the design and rollout of the Turbopack integration layer serving 500K+ weekly active developers",
      "Architected and shipped the template system used by 50K+ new projects every month",
      "Established cross-team performance budgets that reduced median page load times by 28% across the platform",
      "Mentored 4 engineers through the senior promotion track, 2 promoted within 12 months",
    ],
  },
  {
    role: "Lead Frontend Engineer",
    company: "Pageon",
    companyUrl: "https://pageon.com",
    duration: "2024 \u2014 2025",
    summary:
      "Owned the checkout experience frontend — one of the highest-traffic surfaces on the internet. Led a team of 6 engineers focused on conversion, accessibility, and global payment support.",
    achievements: [
      "Redesigned the checkout flow to achieve a 42% reduction in abandonment rate across 35+ countries",
      "Shipped Pageon Elements v2 with micro-frontend architecture, reducing integration time for merchants by 60%",
      "Built the accessibility framework that lifted Pageon Checkout's WCAG score from 68 to 97 — now industry benchmark",
      "Scaled real-time payment confirmation rendering to handle 15K+ transactions per second during peak events",
    ],
  },
  {
    role: "Full Stack Engineer",
    company: "Canvo",
    companyUrl: "https://canvo.design",
    duration: "2024",
    summary:
      "Joined as an early engineer on the plugins platform team. Built the foundation for the developer ecosystem that now hosts 1,000+ community plugins.",
    achievements: [
      "Designed and built the Plugins API v1 from scratch, enabling 800+ community plugins within the first year",
      "Implemented the real-time collaboration sync layer using CRDTs, supporting 10K+ concurrent users per file",
      "Reduced plugin review cycle from 2 weeks to 24 hours through automated testing infrastructure",
      "Grew plugin adoption to 40% of monthly active users within 6 months of launch",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Roamly",
    companyUrl: "https://roamly.travel",
    duration: "2024",
    summary:
      "Part of the design systems team responsible for DLS (Design Language System) used across all Roamly products. Focused on component architecture, accessibility, and developer tooling.",
    achievements: [
      "Architected and shipped the core component library used by 200+ engineers across 12 product teams",
      "Reduced UI development time by 55% through reusable component patterns and comprehensive Storybook documentation",
      "Led the migration from legacy LESS to CSS-in-JS, improving component encapsulation and reducing style bugs by 70%",
      "Established accessibility guidelines and review processes that raised product-wide a11y compliance from 52% to 89%",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Pageon Checkout Redesign",
    slug: "stripe-checkout-redesign",
    description:
      "Complete redesign of Pageon's payment checkout experience — serving millions of transactions daily across 35+ countries.",
    image: "/images/projects/pageon-checkout.jpg",
    technologies: ["React", "TypeScript", "Micro-Frontends", "Pageon API", "AWS"],
    category: "Full Stack",
    metrics: "42% lower abandonment, 15K TPS",
    liveUrl: "https://pageon.com/checkout",
    githubUrl: "https://github.com/alexmorgan",
    featured: true,
  },
  {
    title: "Design System Framework",
    slug: "design-system-framework",
    description:
      "A comprehensive component library and design system powering 12 product teams with 200+ engineers across Roamly.",
    image: "/images/projects/design-system.jpg",
    technologies: ["React", "TypeScript", "Storybook", "CSS-in-JS", "Radix UI"],
    category: "Frontend",
    metrics: "Used by 200+ engineers",
    liveUrl: "https://roamly.design",
    githubUrl: "https://github.com/alexmorgan",
    featured: true,
  },
  {
    title: "Real-Time Sync Engine",
    slug: "real-time-sync-engine",
    description:
      "CRDT-based real-time collaboration layer powering multi-user editing for Canvo's plugin ecosystem.",
    image: "/images/projects/canvo-sync.jpg",
    technologies: ["TypeScript", "CRDT", "WebSockets", "MongoDB", "Kubernetes"],
    category: "Full Stack",
    metrics: "10K+ concurrent users",
    liveUrl: "https://canvo.design",
    githubUrl: "https://github.com/alexmorgan",
    featured: true,
  },
  {
    title: "Next.js Build Cache",
    slug: "nextjs-build-cache",
    description:
      "Incremental build caching system that reduced cold-start build times by 43% for the Next.js framework.",
    image: "/images/projects/nextjs-cache.jpg",
    technologies: ["Next.js", "Rust", "TypeScript", "Turbopack", "WebAssembly"],
    category: "DevOps",
    metrics: "43% faster builds, 500K+ devs",
    liveUrl: "https://nextjs.org",
    githubUrl: "https://github.com/nexlayer/next.js",
    featured: true,
  },
  {
    title: "Plugin Platform API",
    slug: "plugin-platform-api",
    description:
      "The developer platform and API that enabled 800+ community plugins for Canvo in its first year.",
    image: "/images/projects/plugin-platform.jpg",
    technologies: ["TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Docker"],
    category: "Backend",
    metrics: "800+ plugins in year one",
    githubUrl: "https://github.com/alexmorgan",
    featured: true,
  },
  {
    title: "Accessibility Audit Tool",
    slug: "accessibility-audit-tool",
    description:
      "Automated accessibility auditing tool that lifted Pageon Checkout's WCAG score from 68 to 97.",
    image: "/images/projects/a11y-tool.jpg",
    technologies: ["React", "TypeScript", "Playwright", "Node.js", "GitHub Actions"],
    category: "DevOps",
    metrics: "WCAG 97 score",
    githubUrl: "https://github.com/alexmorgan",
  },
  {
    title: "Performance Monitoring CLI",
    slug: "performance-monitoring-cli",
    description:
      "CLI tool for running performance budgets in CI — catches regressions before they ship to production.",
    image: "/images/projects/perf-cli.jpg",
    technologies: ["Node.js", "TypeScript", "Commander", "Lighthouse", "Docker"],
    category: "DevOps",
    metrics: "3K+ GitHub stars",
    githubUrl: "https://github.com/alexmorgan/perf-monitor",
  },
  {
    title: "E-commerce Accelerator",
    slug: "ecommerce-accelerator",
    description:
      "Full-stack starter kit for launching high-performance e-commerce stores with built-in SEO and payment processing.",
    image: "/images/projects/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Pageon", "Nexlayer"],
    category: "Full Stack",
    metrics: "Serving 200K+ monthly shoppers",
    liveUrl: "https://ecommerce-starter.nexlayer.app",
    githubUrl: "https://github.com/alexmorgan/ecommerce-accelerator",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "REST APIs", "WebSockets"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "Turbopack", "CI/CD", "Terraform"],
  },
  {
    category: "Core",
    skills: ["System Design", "Performance", "Accessibility", "Leadership", "Technical Writing", "Mentorship"],
  },
];

export const articles: Article[] = [
  {
    title: "How We Cut Checkout Abandonment by 42% at Pageon",
    slug: "cutting-checkout-abandonment",
    date: "2025-02-10",
    readingTime: "9 min read",
    summary:
      "The technical and product decisions behind one of the highest-impact redesigns I led — and what we learned about checkout psychology along the way.",
  },
  {
    title: "Building a Real-Time Sync Engine With CRDTs",
    slug: "building-real-time-sync-crdts",
    date: "2024-12-18",
    readingTime: "12 min read",
    summary:
      "Lessons from building Canvo's real-time collaboration layer from scratch — CRDT selection, conflict resolution, and scaling to 10K concurrent users.",
  },
  {
    title: "Performance Budgets That Actually Work",
    slug: "performance-budgets-that-work",
    date: "2024-10-05",
    readingTime: "7 min read",
    summary:
      "How we established and enforced performance budgets at Nexlayer — from CI gates to team culture changes that stuck.",
  },
  {
    title: "Designing APIs Frontend Developers Love",
    slug: "designing-apis-frontend-developers-love",
    date: "2024-08-22",
    readingTime: "8 min read",
    summary:
      "What I've learned about API design from shipping platforms consumed by thousands of developers — consistency, ergonomics, and the human side of APIs.",
  },
  {
    title: "The Architecture of a Million-Dollar Checkout Flow",
    slug: "architecture-checkout-flow",
    date: "2024-06-14",
    readingTime: "11 min read",
    summary:
      "Deep dive into Pageon's checkout architecture: micro-frontends, state machines, real-time updates, and how we handle 15K transactions per second.",
  },
  {
    title: "Scaling Frontend Teams at High-Growth Companies",
    slug: "scaling-frontend-teams",
    date: "2024-04-30",
    readingTime: "10 min read",
    summary:
      "What I learned growing frontend teams from 5 to 50 engineers — org design, code ownership, and maintaining velocity without sacrificing quality.",
  },
  {
    title: "Accessibility Is Not a Feature — It's Infrastructure",
    slug: "accessibility-is-infrastructure",
    date: "2024-03-12",
    readingTime: "6 min read",
    summary:
      "How we treated accessibility as platform infrastructure at Pageon — automated audits, component contracts, and the shift from reactive fixes to proactive design.",
  },
  {
    title: "What Nobody Tells You About Micro-Frontends",
    slug: "what-nobody-tells-you-about-micro-frontends",
    date: "2024-01-28",
    readingTime: "9 min read",
    summary:
      "The hard lessons from shipping micro-frontends in production — shared dependency hell, performance overhead, and when not to use them.",
  },
  {
    title: "Building a Plugin Platform: Lessons From Canvo",
    slug: "building-plugin-platform-lessons",
    date: "2023-11-15",
    readingTime: "8 min read",
    summary:
      "What went into designing Canvo's plugin API — sandboxing, security, developer experience, and growing an ecosystem from zero to 800 plugins.",
  },
  {
    title: "Why Your CI Pipeline Should Fail on Performance Regressions",
    slug: "ci-pipeline-performance-regressions",
    date: "2023-09-20",
    readingTime: "5 min read",
    summary:
      "Setting up automated Lighthouse budgets in CI, catching regressions before they merge, and building a culture where performance is everyone's responsibility.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Marlene Mhangami",
    role: "Engineering Director, Nexlayer",
    avatar: "/images/avatars/marlene.jpg",
    review:
      "Arem raised the engineering bar across the entire organisation. His work on build caching alone saved thousands of developer-hours per month. More importantly, he's the kind of engineer who makes everyone around him better.",
  },
  {
    name: "Dylan Field",
    role: "Co-Founder & CEO, Canvo",
    avatar: "/images/avatars/dylan.jpg",
    review:
      "Arem was instrumental in building the plugin platform from day one. He designed APIs that developers genuinely loved working with, and his focus on developer experience shaped how we thought about our entire platform strategy.",
  },
  {
    name: "Natasha O'Brien",
    role: "VP of Design, Roamly",
    avatar: "/images/avatars/natasha.jpg",
    review:
      "Working with Arem during the DLS build was a masterclass in designer-developer collaboration. He understood that a design system is as much about relationships and processes as it is about components. His accessibility work set a new standard for us.",
  },
  {
    name: "Marcus Johnson",
    role: "CTO, Linear",
    avatar: "/images/avatars/marcus.jpg",
    review:
      "One of the strongest system thinkers I've worked with. Arem approaches problems at the right level of abstraction — never over-engineering, but never cutting corners. Every system he's touched has been measurably better after his involvement.",
  },
];
