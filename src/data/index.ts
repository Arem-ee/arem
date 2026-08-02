import type {
  Article,
  Experience,
  Favorite,
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
      "Architecting scalable, resilient systems that handle millions of users without breaking a sweat – from monoliths to micro-frontends.",
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

export const favorites: Favorite[] = [
  {
    icon: "Goal",
    image: "/images/projects/cr7.png",
    title: "Football",
    line: "CR7 set the standard: relentless, disciplined, and clutch in every final. I carry that energy into every sprint and every ship.",
    funFact: "Kicked a ball before I wrote a line of code and the order still holds.",
  },
  {
    icon: "Clapperboard",
    image: "/images/projects/ironman.png",
    title: "Movies",
    line: "Tony Stark is the ultimate engineer-hero. Suit up, build the thing, then upgrade it. I relate more than I should.",
    funFact: "I can quote the entire first Iron Man. I will not apologise.",
  },
  {
    icon: "Music2",
    image: "/images/projects/music.png",
    title: "Music",
    line: "Afrobeats is the soundtrack to the build. Burna, Wizkid, and Rema keep the energy high and the commits coming.",
    funFact: "Shipping features with Burna Boy on repeat is a documented workflow.",
  },
  {
    icon: "BookOpen",
    image: "/images/projects/books.png",
    title: "Books",
    line: "Books are the cheat codes. Clean architecture by day, sci-fi by night; there is always another level to unlock.",
    funFact: "My favourite reads this year: books on systems, and a few on spaceships.",
  },
  {
    icon: "Gamepad2",
    image: "/images/projects/games.png",
    title: "Games",
    line: "FIFA for the winning mindset, Factorio for the pure joy of optimisation. Both are systems thinking in disguise.",
    funFact: "My Factorio factory ships more belts than most startups ship features.",
  },
];

export const experiences: Experience[] = [
  {
    role: "CEO & Founder",
    company: "Propeida",
    companyUrl: "https://propeida.com",
    duration: "2025 \u2014 Present",
    summary:
      "Founded and leading Propeida, a computer-based testing (CBT) platform built for exam reliability at scale. I own the product vision, architecture, and engineering – from the testing engine to the candidate experience.",
    achievements: [
      "Architected and built the full-stack CBT platform – authoring tools, proctoring flows, and real-time result scoring for high-stakes examinations",
      "Designed the platform around reliability and fairness, with automatic grading, instant result delivery, and audit trails for every session",
      "Led every stage from zero to launch – product strategy, UI/UX, infrastructure, and go-to-market",
      "Built the entire codebase as a solo engineer, prioritising clean architecture and maintainability for a growing team",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Self-employed",
    duration: "2024 \u2014 Present",
    summary:
      "Delivering production-grade web products for startups and businesses – from Web3 dApps to brand and business websites. Each engagement is scoped, designed, built, and shipped end-to-end.",
    achievements: [
      "Built Redact, a non-custodial on-chain privacy dApp on Monad with encrypted balance hiding and verified smart contracts",
      "Designed and developed ERGO Automotive's brand experience – an interactive configurator and multi-model showcase with sub-2s load times",
      "Shipped client landing pages focused on conversion – including Aremco Heating, Cooling & Construction's business site",
      "Delivered 20+ projects across landing pages, e-commerce, and Web3 – consistently hitting 90+ Lighthouse scores",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-employed",
    duration: "2024",
    summary:
      "Started freelancing while studying – building responsive websites and design-to-code implementations for small businesses and personal brands.",
    achievements: [
      "Converted Figma designs into pixel-perfect, responsive Next.js and Tailwind CSS implementations",
      "Built fast, mobile-first landing pages for local businesses looking to establish an online presence",
      "Developed a repeatable client workflow – discovery, design review, build, and handoff – used in every engagement since",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Pageon Checkout Redesign",
    slug: "stripe-checkout-redesign",
    description:
      "Complete redesign of Pageon's payment checkout experience – serving millions of transactions daily across 35+ countries.",
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
      "CLI tool for running performance budgets in CI – catches regressions before they ship to production.",
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
  {
    title: "Redact – On-Chain Privacy",
    slug: "redact",
    description:
      "A non-custodial privacy dApp on Monad that hides wallet balances until you choose to reveal them. Encrypted on-chain, verified by users.",
    image: "/images/projects/redact.jpg",
    technologies: ["React", "TypeScript", "Solidity", "Wagmi", "Monad"],
    category: "Full Stack",
    metrics: "10K+ TPS chain, <$0.01 fees",
    liveUrl: "https://redact-nine.vercel.app",
    githubUrl: "https://github.com/Arem-ee/Redact",
    featured: true,
  },
  {
    title: "ERGO Automotive – Brand Experience",
    slug: "ergo-automotive",
    description:
      "A premium luxury EV brand website with interactive configurator, 3D vehicle showcases, and a seamless test-drive booking experience.",
    image: "/images/projects/ergo.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    metrics: "4 vehicle models, 1K+ bookings",
    liveUrl: "https://ergo-website-seven.vercel.app",
    featured: true,
  },
  {
    title: "Mobile Landing Page – Figma Design",
    slug: "mobile-landing-page",
    description:
      "A pixel-perfect mobile landing page design in Figma – focused on conversion-driven layout, clear information hierarchy, and smooth prototyping.",
    image: "/images/projects/mobile-landing.jpg",
    technologies: ["Figma", "UI/UX Design", "Prototyping"],
    category: "Mobile",
    metrics: "Figma prototype with 5+ screens",
    liveUrl: "https://boho-dwarf-46414877.figma.site",
    featured: true,
  },
  {
    title: "Aremco – Business Landing Page",
    slug: "aremco",
    description:
      "A clean, professional landing page for Aremco Heating, Cooling & Construction – establishing brand presence and generating leads.",
    image: "/images/projects/aremco.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Frontend",
    metrics: "Live business site",
    liveUrl: "https://aremco-seven.vercel.app",
    featured: true,
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
      "The technical and product decisions behind one of the highest-impact redesigns I led – and what we learned about checkout psychology along the way.",
  },
  {
    title: "Building a Real-Time Sync Engine With CRDTs",
    slug: "building-real-time-sync-crdts",
    date: "2024-12-18",
    readingTime: "12 min read",
    summary:
      "Lessons from building Canvo's real-time collaboration layer from scratch – CRDT selection, conflict resolution, and scaling to 10K concurrent users.",
  },
  {
    title: "Performance Budgets That Actually Work",
    slug: "performance-budgets-that-work",
    date: "2024-10-05",
    readingTime: "7 min read",
    summary:
      "How we established and enforced performance budgets at Nexlayer – from CI gates to team culture changes that stuck.",
  },
  {
    title: "Designing APIs Frontend Developers Love",
    slug: "designing-apis-frontend-developers-love",
    date: "2024-08-22",
    readingTime: "8 min read",
    summary:
      "What I've learned about API design from shipping platforms consumed by thousands of developers – consistency, ergonomics, and the human side of APIs.",
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
      "What I learned growing frontend teams from 5 to 50 engineers – org design, code ownership, and maintaining velocity without sacrificing quality.",
  },
  {
    title: "Accessibility Is Not a Feature – It's Infrastructure",
    slug: "accessibility-is-infrastructure",
    date: "2024-03-12",
    readingTime: "6 min read",
    summary:
      "How we treated accessibility as platform infrastructure at Pageon – automated audits, component contracts, and the shift from reactive fixes to proactive design.",
  },
  {
    title: "What Nobody Tells You About Micro-Frontends",
    slug: "what-nobody-tells-you-about-micro-frontends",
    date: "2024-01-28",
    readingTime: "9 min read",
    summary:
      "The hard lessons from shipping micro-frontends in production – shared dependency hell, performance overhead, and when not to use them.",
  },
  {
    title: "Building a Plugin Platform: Lessons From Canvo",
    slug: "building-plugin-platform-lessons",
    date: "2023-11-15",
    readingTime: "8 min read",
    summary:
      "What went into designing Canvo's plugin API – sandboxing, security, developer experience, and growing an ecosystem from zero to 800 plugins.",
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
      "One of the strongest system thinkers I've worked with. Arem approaches problems at the right level of abstraction – never over-engineering, but never cutting corners. Every system he's touched has been measurably better after his involvement.",
  },
];
