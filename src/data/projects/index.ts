import type { ProjectDetail } from "@/types";

export const projectDetails: ProjectDetail[] = [
  {
    title: "Propeida",
    slug: "propeida",
    description:
      "General entrance exam prep platform, rebranded from PrepIQ. Practice questions, per-exam leaderboards, referral tracking, and admin question management.",
    technologies: ["Next.js", "Supabase", "Paystack", "Tailwind CSS"],
    category: "Full Stack",
    liveUrl: "https://propeida.online",
    featured: true,
    status: "launched",
    statusNote: "Launched. UNILORIN Post-UTME is the first supported exam.",
    problem:
      "Students preparing for university entrance exams had no structured way to practice and measure themselves against other candidates. PrepIQ started as a practice question bank; the move to Propeida added the competitive and administrative layers that make the platform useful to institutions.",
    goals: [
      "Provide practice questions for entrance exams, with answers and explanations",
      "Give students a sense of position via per-exam leaderboards",
      "Let admins manage questions, subjects, and exam configs without code",
      "Track referrals so growth is measurable",
    ],
    architecture:
      "Next.js frontend with Supabase for auth and storage, Paystack for payments, and Tailwind for styling. The student and admin experiences are separate dashboards over the same data model: exams, questions, attempts, and leaderboard scores. Leaderboards compute per exam from attempt data.",
    role: "Sole builder and founder. I own the product, the architecture, and the engineering.",
    stack: [
      { tech: "Next.js", usedFor: "Student practice flow and admin dashboards" },
      { tech: "Supabase", usedFor: "Auth, Postgres, and storage" },
      { tech: "Paystack", usedFor: "Bank transfer and card payments" },
      { tech: "Tailwind CSS", usedFor: "Styling" },
    ],
    technicalDecisions: [
      {
        decision: "Supabase over a custom API",
        rationale:
          "Auth, storage, and Postgres in one managed product. For a solo build, removing the backend API layer means fewer moving parts to secure and maintain.",
      },
      {
        decision: "Paystack for payments",
        rationale:
          "It handles Nigerian bank transfer and card payments natively, which matters for the target audience.",
      },
      {
        decision: "Rebrand from PrepIQ to Propeida",
        rationale:
          "The old name described the product stage. The new one is the company name going forward, so the domain and branding moved with it.",
      },
    ],
    challenges: [
      {
        challenge: "Leaderboard integrity",
        solution:
          "Scores are computed from recorded attempts, with one representative attempt per exam window per student. The rules are explicit in the UI.",
      },
      {
        challenge: "Solo capacity",
        solution:
          "The scope is deliberately bounded: one supported exam at launch, with the model ready for more.",
      },
    ],
    results: [
      "Launched with UNILORIN Post-UTME as the first supported exam",
      "Dual dashboards shipped: student practice flow and admin question management",
      "Referral tracking live and measurable",
    ],
    lessonsLearned: [
      "A narrow launch (one exam) beats a wide one. The model generalises; the operations do not.",
      "Admin tooling is product work, not an afterthought. Question management became the product's highest-impact surface.",
    ],
  },
  {
    title: "Redact",
    slug: "redact",
    description:
      "Non-custodial stablecoin privacy app built on Monad for a hackathon. ZK privacy layer for private balance management, client-side duress mode.",
    technologies: ["TypeScript", "Solidity", "ZK", "Monad"],
    category: "Web3",
    liveUrl: "https://redact-nine.vercel.app",
    githubUrl: "https://github.com/Arem-ee/Redact",
    featured: true,
    status: "did-not-win",
    statusNote:
      "Did not win. A submission-blocking SDK version mismatch prevented the deposit flow from completing; documented in the submission rather than hidden.",
    problem:
      "Wallet balances are public on-chain. Once an address is linked to a person, their holdings and history are readable by anyone. Existing privacy tooling was custodial or too complex for a normal user.",
    goals: [
      "Keep balances private without custody",
      "Work with standard EVM wallets",
      "Add a duress mode that shows a fake balance under coercion",
    ],
    architecture:
      "A smart contract on Monad stores encrypted balance commitments. Deposits commit a hidden amount; withdrawals reveal only what moves. The frontend is a React SPA using Wagmi, with keys generated and held client-side. Duress mode lives in the client: a PIN change flips the UI to a decoy balance while the real funds stay behind the contract.",
    role: "Solo hackathon build. I designed and built the contract, the frontend, and the submission.",
    stack: [
      { tech: "TypeScript", usedFor: "React frontend with Wagmi" },
      { tech: "Solidity", usedFor: "Privacy contract on Monad" },
      { tech: "ZK", usedFor: "Encrypted balance commitments" },
      { tech: "Monad", usedFor: "Fast finality and near-zero fees" },
    ],
    technicalDecisions: [
      {
        decision: "Encrypted commitments over a full ZK proof pipeline",
        rationale:
          "The hackathon timeline did not allow a complete zk-SNARK circuit. Encrypted commitments with a client-side key give most of the privacy with a fraction of the complexity.",
      },
      {
        decision: "Monad over an Ethereum L1",
        rationale:
          "Sub-second finality and near-zero fees fit a privacy app where users may transact frequently.",
      },
    ],
    challenges: [
      {
        challenge: "SDK version mismatch on the final day",
        solution:
          "A relay package version mismatch changed the expected contract ABI, so the deposit flow could not complete within the deadline. Re-deploying with a changed interface was not an option in the remaining hours. This was documented in the submission rather than hidden.",
      },
    ],
    results: [
      "Non-custodial privacy contract deployed and verified on Monad",
      "Client-side duress mode implemented",
      "Submission documented the unresolved deposit flow honestly",
    ],
    lessonsLearned: [
      "Pin dependency versions the moment the contract interface freezes. The mismatch cost the demo.",
      "Honesty about what did not work reads better to technical judges than a polished half-truth.",
    ],
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
    problem:
      "Small SaaS teams need SOC 2 reports for enterprise deals but cannot afford the consulting fees. Auditon aimed to orchestrate the evidence collection and report generation that compliance consultants do by hand.",
    goals: [
      "Collect and organise compliance evidence per tenant",
      "Generate report-ready summaries",
      "Support enterprise pricing tiers with tenant isolation",
    ],
    architecture:
      "Go service with PostgreSQL via GORM, deployed on Cloud Run. Tenant-aware from the start: every table carries a tenant id, every query scopes to it, and pricing tiers map to feature sets.",
    role: "Solo build. I designed the tenant-aware model and built the Go service.",
    stack: [
      { tech: "Go", usedFor: "Service and long-running evidence jobs" },
      { tech: "PostgreSQL", usedFor: "Tenant-scoped data store" },
      { tech: "GORM", usedFor: "ORM layer" },
      { tech: "Cloud Run", usedFor: "Deploy" },
    ],
    technicalDecisions: [
      {
        decision: "Go over Node.js",
        rationale:
          "Long-running evidence collection jobs and predictable memory use are Go's strengths.",
      },
      {
        decision: "Tenant isolation in the schema from day one",
        rationale:
          "Retrofitting tenancy is the expensive version. The schema is scoped from the first migration.",
      },
    ],
    challenges: [
      {
        challenge: "Evidence quality varies wildly across sources",
        solution:
          "A normalised evidence model with source adapters, so each tenant's data lands in the same shape.",
      },
    ],
    results: [
      "Core tenant-aware data model and service built",
      "Enterprise pricing tier structure defined",
    ],
    lessonsLearned: [
      "Compliance tooling is a domain problem first and a software problem second. The model matters more than the stack.",
    ],
  },
  {
    title: "StyleArem",
    slug: "stylearem",
    description:
      "Men's fashion e-commerce landing page. Full storefront layout with collections, a working bag, and social proof built in.",
    technologies: ["React", "Vite", "Tailwind CSS"],
    category: "Frontend",
    liveUrl: "https://stylearem.vercel.app",
    featured: true,
    status: "shipped",
    statusNote: "Shipped. Men's fashion storefront, live.",
    problem:
      "Men's fashion online is spread across marketplaces where every listing looks the same. StyleArem takes the opposite approach: one curated point of view, with collections by lifestyle, full product detail, and reviews in a single storefront.",
    goals: [
      "Present collections by lifestyle: streetwear, formal, essentials, and active",
      "Let shoppers inspect a product without leaving the grid",
      "Keep the bag visible at all times with running totals",
      "Answer common questions on the page with an FAQ",
    ],
    architecture:
      "React single-page storefront built with Vite and styled with Tailwind. Catalog, quick-view modal, bag drawer, FAQ, and newsletter sections share one client-side product model: items with sizes, colors, prices, ratings, and reviews.",
    role: "Designed and built end to end: layout, catalog, quick view, bag drawer, FAQ, and footer.",
    stack: [
      { tech: "React", usedFor: "Catalog, quick view, and bag state" },
      { tech: "Vite", usedFor: "Build" },
      { tech: "Tailwind CSS", usedFor: "Styling" },
      { tech: "Plus Jakarta Sans", usedFor: "Type" },
    ],
    technicalDecisions: [
      {
        decision: "Category pills over separate pages",
        rationale:
          "One collections section with category pills keeps every product two clicks away. Separate pages would add routes without adding value at this scale.",
      },
      {
        decision: "Quick-view modal over product pages",
        rationale:
          "Size, color, quantity, materials, and reviews open over the grid, so comparing items never loses scroll position.",
      },
      {
        decision: "Bag as a slide-over drawer",
        rationale:
          "Running subtotal, quantities, a promo field, and a free-shipping progress bar stay visible while shopping continues underneath.",
      },
      {
        decision: "Social proof in the hero",
        rationale:
          "Avatar stack and member count sit next to the headline, where a first-time visitor decides whether to keep scrolling.",
      },
    ],
    challenges: [
      {
        challenge: "Scope stops at the front end",
        solution:
          "Bag math, promos, and the order confirmation all run in browser state. No backend or payment is wired, so the page never charges anything: the confirmation is local state, not a receipt.",
      },
    ],
    results: [
      "Live storefront at stylearem.vercel.app",
      "Catalog across six lifestyle categories with quick view and reviews",
      "Bag drawer with quantities, promo codes, and free-shipping progress",
      "FAQ and newsletter sections shipped",
    ],
    lessonsLearned: [
      "Front-end state carries a storefront surprisingly far: bag, promos, and totals all work without a backend.",
    ],
  },
  {
    title: "Aletheia",
    slug: "aletheia",
    description:
      "Digital growth research studio. A four-phase process across seven investigation areas that turns a business's digital presence and buyer pathways into a structured assessment brief.",
    technologies: ["Vite", "React", "Tailwind CSS"],
    category: "Frontend",
    logo: "/logos/aletheia.svg",
    liveUrl: "https://aletheia-phi-rouge.vercel.app",
    featured: true,
    status: "shipped",
    statusNote: "Shipped. Live research studio delivering structured assessment briefs.",
    problem:
      "Businesses often redesign or spend on ads before understanding their digital presence, buyer decision pathways, and market positioning. Generic advice wastes budget; structured diagnosis comes first.",
    goals: [
      "Investigate a business's digital presence across seven areas: brand authority, website experience, lead generation, trust signals, competitor positioning, and more",
      "Run a four-phase process: research, diagnosis, strategy, and implementation",
      "Deliver a structured assessment brief instead of generic advice",
    ],
    architecture:
      "A Vite and React single-page studio site with Tailwind styling. The name is Greek for truth, fitting a research-first approach. Content is structured to guide a business from investigation through a clear, actionable brief.",
    role: "Client project. I designed and built the studio site end to end.",
    stack: [
      { tech: "Vite", usedFor: "Build and dev" },
      { tech: "React", usedFor: "Single-page site" },
      { tech: "Tailwind CSS", usedFor: "Styling" },
    ],
    technicalDecisions: [
      {
        decision: "Single-page studio site over a multi-page app",
        rationale:
          "The studio sells a diagnostic process, not a dashboard. One focused page communicates the method clearly without extra navigation.",
      },
      {
        decision: "Research-led content structure",
        rationale:
          "Seven investigation areas and four phases are presented as a framework, so a visitor understands what will be assessed before any commitment.",
      },
    ],
    challenges: [
      {
        challenge: "Explaining a diagnostic product without sounding generic",
        solution:
          "Framed every section as an investigation area with a concrete output, so the value is a structured brief, not vague consulting.",
      },
    ],
    results: [
      "Live research studio shipped at aletheia-phi-rouge.vercel.app",
      "Clear four-phase process and seven-area framework presented as the product",
    ],
    lessonsLearned: [
      "Naming matters. Aletheia, Greek for truth, signals the studio's research-first identity.",
    ],
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
    problem:
      "Most landing pages are designed on desktop canvases and degrade on mobile. This was an exercise in designing mobile-first from the first frame: a landing page where the layout, hierarchy, and interaction are native to the phone, not stretched to fit it.",
    goals: [
      "Design a conversion-focused landing page on a mobile canvas",
      "Establish a clear information hierarchy for a small screen",
      "Prototype the flow so the interactions are testable, not assumed",
    ],
    architecture:
      "A Figma design system with components for each section: hero, value proposition, social proof, and call to action. The prototype wires the primary flow end to end, including form states and error handling.",
    role: "Solo design exercise. Mobile-first canvas, interactive prototype.",
    stack: [
      { tech: "Figma", usedFor: "Design system and interactive prototype" },
      { tech: "Prototyping", usedFor: "Clickable flow with form states" },
    ],
    technicalDecisions: [
      {
        decision: "Mobile canvas from the start",
        rationale:
          "Designing on a phone-sized canvas forces decisions about what matters. Desktop layouts were never the constraint.",
      },
      {
        decision: "Interactive prototype over static mockups",
        rationale:
          "A clickable prototype shows the flow to stakeholders in seconds. Static art invites debate about pixels instead of decisions.",
      },
    ],
    challenges: [
      {
        challenge: "Keeping the scroll story short",
        solution:
          "Each section carries one message and one action. Anything that did not serve the conversion goal was cut.",
      },
    ],
    results: [
      "Clickable mobile prototype shipped on Figma",
      "Component-based system ready to extend into a full product design",
    ],
    lessonsLearned: [
      "A prototype settles design arguments faster than a spec ever will.",
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectDetails.map((p) => p.slug);
}

export function getRelatedProjects(slug: string, count = 2): ProjectDetail[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];
  return projectDetails
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, count);
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectDetail | undefined;
  next: ProjectDetail | undefined;
} {
  const index = projectDetails.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: projectDetails[index - 1],
    next: projectDetails[index + 1],
  };
}
