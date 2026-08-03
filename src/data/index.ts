import type { Experience, Favorite, Project } from "@/types";

export const favorites: Favorite[] = [
  {
    icon: "Goal",
    image: "/images/projects/cr7.png",
    imagePosition: "top",
    title: "Football",
    line: "CR7 set the standard: relentless, disciplined, and clutch in every final. Suiii. I carry that energy into every sprint and every ship.",
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
    line: "Books are the cheat codes. Clean architecture by day, sci-fi by night; there is always another level to grind.",
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
    duration: "2025 \u2013 Present",
    summary:
      "Building Propeida, an entrance exam prep platform (formerly PrepIQ). I own the product, the architecture, and the engineering.",
    achievements: [
      "Dual dashboard for students and admins, with per-exam leaderboards and referral tracking",
      "Admin question management covering question banks, subjects, and exam configs",
      "Built with Next.js, Supabase, Paystack, and Tailwind, shipped end to end",
      "Launched with UNILORIN Post-UTME as the first supported exam",
    ],
  },
  {
    role: "Freelance Web3 & Product Builder",
    company: "Self-employed",
    duration: "2024 \u2013 Present",
    summary:
      "Contract work across Web3 and product engineering: dApps, dashboards, and client sites, scoped and shipped end to end.",
    achievements: [
      "Built Redact, a non-custodial privacy dApp on Monad for a hackathon, with a ZK privacy layer and client-side duress mode",
      "Designed and built ERGO Automotive's brand experience, a 3D car configurator with Three.js and React Three Fiber, plus logo and identity",
      "Built Auditon, a SOC 2 compliance orchestration platform in Go, now postponed pending equipment funding",
      "Shipped client sites including Aremco Heating, Cooling & Construction's business landing page",
    ],
  },
  {
    role: "Electrical Engineering Student",
    company: "University of Ilorin",
    duration: "2023 \u2013 Present",
    summary:
      "Studying electrical engineering. The coursework feeds directly into the product work: signals, circuits, and systems thinking.",
    achievements: [
      "Coursework in circuits, signals, and embedded systems",
      "Engineering fundamentals applied to architecture and protocol design",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Propeida",
    slug: "propeida",
    description:
      "General entrance exam prep platform, rebranded from PrepIQ. Practice questions, per-exam leaderboards, referral tracking, and admin question management.",
    technologies: ["Next.js", "Supabase", "Paystack", "Tailwind CSS"],
    category: "Full Stack",
    logo: "/logos/propeida.svg",
    liveUrl: "https://propeida.com",
    featured: true,
    status: "launched",
    statusNote: "Launched. UNILORIN Post-UTME is the first supported exam.",
  },
  {
    title: "Redact",
    slug: "redact",
    description:
      "Non-custodial stablecoin privacy app built on Monad for a hackathon. ZK privacy layer for private balance management, client-side duress mode.",
    technologies: ["TypeScript", "Solidity", "ZK", "Monad"],
    category: "Web3",
    logo: "/logos/redact.svg",
    liveUrl: "https://redact-nine.vercel.app",
    githubUrl: "https://github.com/Arem-ee/Redact",
    featured: true,
    status: "did-not-win",
    statusNote:
      "Did not win. A submission-blocking SDK version mismatch prevented the deposit flow from completing; documented in the submission rather than hidden.",
  },
  {
    title: "Auditon",
    slug: "auditon",
    description:
      "B2B SOC 2 compliance orchestration platform. Tenant-aware architecture with enterprise pricing tiers.",
    technologies: ["Go", "PostgreSQL", "GORM", "Cloud Run"],
    category: "Backend",
    featured: true,
    status: "postponed",
    statusNote: "Postponed. Pending equipment funding.",
  },
  {
    title: "ERGO Automotive",
    slug: "ergo-automotive",
    description:
      "Client site for an automotive brand with a 3D car configurator (Three.js / React Three Fiber), plus brand identity and logo design.",
    technologies: ["Next.js", "Three.js", "React Three Fiber", "TypeScript"],
    category: "Frontend",
    logo: "/logos/ergo.svg",
    liveUrl: "https://ergo-website-seven.vercel.app",
    featured: true,
    status: "shipped",
    statusNote: "Shipped. Client site with configurator, brand identity, and logo.",
  },
  {
    title: "Aremco",
    slug: "aremco",
    description:
      "Business landing page for Aremco Heating, Cooling & Construction. Services, contact path, and quote request flow, mobile-first.",
    technologies: ["Next.js", "Tailwind CSS"],
    category: "Frontend",
    logo: "/logos/aremco.svg",
    liveUrl: "https://aremco-seven.vercel.app",
    featured: true,
    status: "shipped",
    statusNote: "Shipped. Live business site for Aremco Heating, Cooling & Construction.",
  },
  {
    title: "Mobile Landing Page",
    slug: "mobile-landing-page",
    description:
      "Conversion-focused mobile landing page designed and prototyped in Figma: clear hierarchy, persuasive flow, clickable end to end.",
    technologies: ["Figma", "Prototyping"],
    category: "Mobile",
    logo: "/logos/figma.svg",
    liveUrl: "https://boho-dwarf-46414877.figma.site",
    featured: true,
    status: "shipped",
    statusNote: "Shipped as a design prototype. Clickable mobile landing, built in Figma.",
  },
];
