import type { ProjectDetail } from "@/types";

export const projectDetails: ProjectDetail[] = [
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
    problem:
      "Pageon's checkout iframe had a 38% abandonment rate. Merchants were losing billions in potential revenue. The legacy iframe approach made it impossible to customise the look and feel, and accessibility compliance was stuck at 68. With global expansion, we needed to support 35+ country-specific payment methods without ballooning complexity.",
    goals: [
      "Reduce checkout abandonment from 38% to under 25% globally",
      "Achieve WCAG 2.1 AA compliance with a score of 95+",
      "Support 35+ country-specific payment methods without per-country code forks",
      "Maintain 99.99% uptime and sub-200ms payment confirmation latency",
      "Enable merchants to customise the look and feel without sacrificing consistency",
    ],
    architecture:
      "The new checkout is built as a micro-frontend using Web Components for framework-agnostic embedding. Each payment method is an independently deployable module with its own state machine. A shared orchestration layer handles routing, theming (via CSS custom properties), and analytics. Real-time payment status flows through a WebSocket connection, while the core transaction pipeline runs on Pageon's existing infrastructure with a new frontend orchestration tier.",
    technicalDecisions: [
      {
        decision: "Web Components over React-specific embedding",
        rationale:
          "Merchants use different frameworks (React, Vue, Angular, jQuery). Web Components provide framework-agnostic embedding with shadow DOM encapsulation, letting us ship updates independently of merchant deploy cycles.",
      },
      {
        decision: "XState state machines for payment flows",
        rationale:
          "Payment flows have complex states (pending, confirmed, failed, disputed, refunded). A state machine makes every transition explicit, testable, and visualisable — catching edge cases that imperative code would miss.",
      },
      {
        decision: "CSS custom properties for theming",
        rationale:
          "Rather than building a design token build pipeline, CSS custom properties let merchants theme the checkout with zero build tooling. We provide a default theme and merchants override specific tokens. This approach reduced integration time by 60%.",
      },
    ],
    challenges: [
      {
        challenge: "Global payment method fragmentation",
        solution:
          "Built a plugin architecture where each payment method is a module implementing a standardised interface. New methods ship independently without touching core checkout code. The module registry supports A/B testing of new methods per country.",
      },
      {
        challenge: "Accessibility across 35+ localisations",
        solution:
          "Created an automated a11y audit pipeline using Playwright + axe-core that runs against every payment method in every locale. Each PR must pass a minimum WCAG score or it doesn't merge. This lifted our score from 68 to 97.",
      },
      {
        challenge: "Performance on slow networks (emerging markets)",
        solution:
          "Implemented a progressive loading strategy where the checkout shell renders instantly (under 800ms on 3G) while payment methods stream in by priority. The WebSocket connection is established before the user completes the first field.",
      },
    ],
    results: [
      "Checkout abandonment dropped from 38% to 22% globally — a 42% relative reduction",
      "WCAG accessibility score improved from 68 to 97 — highest in the payments industry",
      "Scaled to handle 15,000+ transactions per second during Black Friday peak",
      "Integration time for new merchants reduced from 2 weeks to 2 days",
      "Payment method coverage expanded from 5 to 35+ countries with zero core code changes",
    ],
    lessonsLearned: [
      "Treating accessibility as a CI gate rather than a QA phase is the only way to maintain standards at scale",
      "Micro-frontends add real overhead — you need strong shared conventions, monitoring, and a good design system to make them work",
      "Payment method modules should be treated as products, not features — each has unique UX, compliance, and performance requirements",
    ],
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
    problem:
      "Roamly's products were built with inconsistent UI patterns — every team had their own buttons, modals, and form controls. Design reviews were slow, accessibility was inconsistent, and engineers spent 40% of their time rebuilding the same components. The legacy LESS codebase was increasingly unmaintainable.",
    goals: [
      "Create a single source of truth for UI components used across all of Roamly's products",
      "Reduce UI development time by 50% or more",
      "Achieve consistent WCAG 2.1 AA accessibility across every component",
      "Enable rapid prototyping with production-quality building blocks",
    ],
    architecture:
      "The DLS (Design Language System) is organised as a monorepo with three packages: foundations (design tokens, icons, typography), primitives (unstyled accessible building blocks using Radix UI), and components (composed, styled UI components consumed by product teams). Storybook serves as both documentation and visual regression testing. A custom Canvo plugin syncs design tokens between design and code.",
    technicalDecisions: [
      {
        decision: "Radix UI primitives for accessibility",
        rationale:
          "Building accessible modals, dropdowns, and popovers from scratch is error-prone and expensive. Radix provides battle-tested, WCAG-compliant primitives that handle keyboard navigation, focus trapping, and screen reader announcements out of the box.",
      },
      {
        decision: "CSS-in-JS (styled-components) over CSS modules",
        rationale:
          "Dynamic theming (dark mode, brand variants) is significantly easier with CSS-in-JS. Component-scoped styles prevent leakage, and the runtime enables server-side rendering of critical CSS. The migration from LESS eliminated 70% of style-related bugs.",
      },
      {
        decision: "Canvo-to-code design token pipeline",
        rationale:
          "Instead of manually copying design values, we built a Canvo plugin that exports design tokens as JSON. A build step generates CSS custom properties, JavaScript constants, and themed values — ensuring design and code never drift apart.",
      },
    ],
    challenges: [
      {
        challenge: "Adoption resistance from established teams",
        solution:
          "Ran a 2-week migration sprint with each team, pairing an engineer from the DLS team with each product squad. We migrated one page per day, proving the value incrementally. Published migration guides, recorded walkthroughs, and held weekly office hours.",
      },
      {
        challenge: "Bundle size bloat from importing too much",
        solution:
          "Implemented automatic tree-shaking at the component level. Introduced a linter rule that flags full-library imports and suggests specific imports. Added bundle size budgets to CI — any PR that increases gzip size by more than 5KB triggers a review.",
      },
    ],
    results: [
      "Reduced UI development time by 55% across all product teams",
      "Adopted by 200+ engineers across 12 product teams within 6 months",
      "12 design tokens synced bi-directionally between Canvo and code via the plugin pipeline",
      "100% of components pass WCAG 2.1 AA — product-wide a11y compliance rose from 52% to 89%",
      "Component reuse rate increased from 20% to 85%",
    ],
    lessonsLearned: [
      "A design system is a product, not a project — it requires dedicated investment, product management, and ongoing maintenance",
      "Documentation matters more than the components themselves — well-documented components get adopted; undocumented ones get reimplemented",
      "Involve designers in component reviews, not just engineers — the best design systems are co-owned",
    ],
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
    problem:
      "Canvo's plugin data was static — when one user ran a plugin, others couldn't see the changes in real-time. This limited collaborative workflows. Existing solutions for real-time sync either required a central server (breaking offline editing) or had complex conflict resolution.",
    goals: [
      "Provide real-time multi-user editing for plugin-generated content",
      "Support 10,000+ concurrent editors on a single document",
      "Work offline with automatic conflict resolution when reconnected",
      "Achieve sub-100ms latency for local edits and sub-500ms for remote propagation",
    ],
    architecture:
      "The sync engine uses Yjs, a CRDT implementation embedded in the browser. Each document is represented as a shared data structure (text, map, array) replicated across all connected clients. A WebSocket server (Go) handles discovery and relays updates. MongoDB stores document snapshots, while Redis manages presence information. Kubernetes auto-scales WebSocket servers based on connection count.",
    technicalDecisions: [
      {
        decision: "CRDTs (Yjs) over Operational Transform (OT)",
        rationale:
          "CRDTs eliminate the need for a central ordering server. Every client can process edits independently and merge them deterministically. This means true offline support with automatic resolution — no conflicts when two users edit the same paragraph offline and reconnect.",
      },
      {
        decision: "Go for the WebSocket relay server",
        rationale:
          "Go's goroutines make handling 10K+ concurrent WebSocket connections efficient with minimal memory overhead. Each connection costs about 4KB of memory, compared to 1MB+ per connection with Node.js in our benchmarks.",
      },
      {
        decision: "Snapshot-based persistence with periodic compaction",
        rationale:
          "Instead of replaying the full operation log on connection, we store periodic snapshots of the document state and only replay operations since the last snapshot. This reduced reconnection time from 30 seconds to under 200ms.",
      },
    ],
    challenges: [
      {
        challenge: "Offline edit conflicts during extended disconnections",
        solution:
          "Implemented a three-way merge visualisation. When a user reconnects after significant offline editing, they see a diff view of their changes vs. the server state and can accept/reject individual changes before syncing.",
      },
      {
        challenge: "WebSocket connection overhead at scale",
        solution:
          "Introduced a two-tier architecture: a lightweight TCP load balancer distributes connections, and each Go server hosts up to 5,000 connections. When a server reaches capacity, new connections are routed to a new pod automatically by the Kubernetes HPA.",
      },
    ],
    results: [
      "10,000+ concurrent editors supported on a single document with sub-100ms local latency",
      "Offline editing with fully automatic conflict resolution for short disconnections",
      "Reconnection time under 200ms for 95% of users",
      "Adopted by 200+ organisations using the plugin API",
      "Total infrastructure cost under $800/month at peak load",
    ],
    lessonsLearned: [
      "CRDTs eliminate entire categories of bugs that plague OT systems — the complexity is worth the investment",
      "WebSocket connection management at scale requires careful load balancing — a single poorly configured proxy can bring down the entire system",
      "Offline support is a feature users don't notice until it's missing — invest in it early",
    ],
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
    githubUrl: "https://github.com/vercel/next.js",
    featured: true,
    problem:
      "Next.js cold builds on large projects (e.g., e-commerce sites with 10K+ pages) could take 15-30 minutes. This was the #1 developer experience complaint. The existing cache was a simple file hash that invalidated too aggressively — any change to any file invalidated the entire cache.",
    goals: [
      "Reduce cold-start build times by at least 40%",
      "Make incremental builds work correctly — no stale output",
      "Maintain backward compatibility with existing Next.js projects",
      "Keep the cache implementation simple enough for community contribution",
    ],
    architecture:
      "The new caching system tracks dependencies at the module level using a persistent directed acyclic graph (DAG). Each module's cache key includes its content hash AND the transitive hashes of its dependencies. When a file changes, only the affected subtree is invalidated and rebuilt. The cache is stored as a persistent SQLite database, enabling incremental builds across dev server restarts and CI runs.",
    technicalDecisions: [
      {
        decision: "Module-level DAG over file-level hashing",
        rationale:
          "File-level cache invalidation is too coarse — changing an import adds a new edge to the dependency graph but doesn't invalidate the importer's output. Module-level tracking with transitive dependency hashing ensures correctness while maximising cache hits.",
      },
      {
        decision: "SQLite for cache persistence",
        rationale:
          "SQLite provides ACID compliance with zero configuration. It's embeddable, fast for single-user workloads, and the database file can be cached across CI runs. No separate cache server needed.",
      },
      {
        decision: "Rust for the cache computation layer",
        rationale:
          "Hash computation and DAG traversal are CPU-intensive. Rust provides near-native performance with memory safety. The cache computation layer runs as a WebAssembly module in the Node.js runtime.",
      },
    ],
    challenges: [
      {
        challenge: "Handling CSS module and image imports correctly",
        solution:
          "CSS modules generate side-effectful output that depends on class name hashing. Image imports generate optimised assets with content hashes. We added special handling for these asset types — tracking both the module dependency AND the generated side-effect output in the cache DAG.",
      },
      {
        challenge: "Cache invalidation during framework upgrades",
        solution:
          "When Next.js itself is upgraded, all cached outputs from the previous version must be invalidated. We include the Next.js version hash in every cache key — a framework upgrade triggers a clean rebuild automatically.",
      },
    ],
    results: [
      "Cold-start build times reduced by 43% for projects with 5K+ pages",
      "Incremental rebuilds during development 60% faster than the previous implementation",
      "Cache hit rate of 78% on average across all Nexlayer deployments",
      "Adopted as the default caching strategy in Next.js 15 — serving 500K+ weekly active developers",
      "Community contributions added support for Turbopack integration within 3 months of open-sourcing the design",
    ],
    lessonsLearned: [
      "Caching is never as simple as it first seems — CSS modules, image assets, and framework upgrades all have subtle edge cases",
      "Measure cache hit rates in production before optimising — most teams optimise the wrong thing first",
      "A well-designed cache should be invisible — if users are thinking about it, the design is wrong",
    ],
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
    problem:
      "Canvo users wanted to extend the editor with custom functionality, but there was no developer API. Building a plugin platform meant designing an API that was powerful enough for complex plugins, safe enough to run untrusted code, and simple enough that developers could build their first plugin in an afternoon.",
    goals: [
      "Launch a plugin API that enables 500+ community plugins within the first year",
      "Ensure plugin execution is secure — no access to the host document without explicit permission",
      "Make the developer onboarding experience under 30 minutes from idea to first working plugin",
      "Support both free and paid plugin distribution through the Canvo Community",
    ],
    architecture:
      "The plugin runtime runs in a sandboxed iframe with a postMessage bridge to the editor. Plugins declare their capabilities in a manifest (permissions, UI entry points, network access). The API layer is GraphQL, providing a single endpoint for document access, user data, and external services. Plugins are distributed through the Canvo Community marketplace with automatic review and publishing pipelines.",
    technicalDecisions: [
      {
        decision: "GraphQL over REST for the plugin API",
        rationale:
          "Plugins have wildly different data needs — a colour palette plugin needs different data than a code export plugin. GraphQL lets each plugin request exactly what it needs, reducing payload size and improving performance. The single endpoint also simplifies client setup.",
      },
      {
        decision: "Sandboxed iframe with explicit permission model",
        rationale:
          "Untrusted plugin code needs strong isolation. The sandboxed iframe prevents direct DOM access. Plugins must declare permissions (read document, write document, network access) in their manifest, and users approve these during installation. This approach is simpler than Web Workers and more secure than direct API access.",
      },
      {
        decision: "Automated review pipeline over manual review",
        rationale:
          "Manual plugin review doesn't scale. We built an automated pipeline that checks for security violations (eval, fetch to unknown domains), manifest compliance, and API usage patterns. Only plugins flagged by the automated system require manual review.",
      },
    ],
    challenges: [
      {
        challenge: "Plugin performance impact on editor responsiveness",
        solution:
          "Plugins run in a separate process (sandboxed iframe with OffscreenCanvas for rendering). Heavy computation is offloaded to Web Workers. If a plugin exceeds its CPU budget (50ms per frame), the runtime pauses it and notifies the user.",
      },
      {
        challenge: "API versioning and backward compatibility",
        solution:
          "The GraphQL schema is versioned at the field level — deprecated fields are marked with @deprecated but never removed without 6 months notice. A plugin's requested API version is stored at publish time, and the runtime adapts to provide the appropriate schema version.",
      },
    ],
    results: [
      "800+ community plugins published within the first year — exceeding the goal by 60%",
      "Plugins adopted by 40% of monthly active users within 6 months",
      "Automated review pipeline processes 95% of submissions without manual intervention",
      "Plugin ecosystem estimated to save users 2M+ hours per year through automation and workflow enhancements",
      "Developer NPS of 72 for the plugin developer experience",
    ],
    lessonsLearned: [
      "Platform API design is about saying no — every capability you expose constrains your future evolution",
      "Developer experience is the product for a platform — invest disproportionately in onboarding, documentation, and error messages",
      "A permission model is a product decision, not just a security decision — too restrictive and nobody builds; too permissive and you can't sleep at night",
    ],
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
    problem:
      "Accessibility was being caught too late in the development process — issues discovered during QA required significant rework. Manual audits were slow and inconsistent. The checkout's WCAG score was 68, failing basic compliance standards.",
    goals: [
      "Lift WCAG 2.1 AA score from 68 to 95+",
      "Make accessibility testing automatic in CI — every PR checked before merge",
      "Provide actionable, developer-friendly reports — not just a score",
      "Create a reusable tool that works across all of Pageon's customer-facing surfaces",
    ],
    architecture:
      "The tool uses Playwright to run automated accessibility scans against every component variant and page state. Axe-core provides the rule engine, and custom rules cover Pageon-specific patterns. Results are posted as PR comments with a diff view showing exactly which elements need fixing. The tool runs as a GitHub Action and reports to a dashboard that tracks trends over time.",
    technicalDecisions: [
      {
        decision: "Playwright over Cypress for accessibility scanning",
        rationale:
          "Playwright supports multiple browser engines (Chromium, Firefox, WebKit) — important because accessibility support varies by browser. It also handles shadow DOM natively, which was critical for our Web Component-based checkout.",
      },
      {
        decision: "axe-core over custom rules",
        rationale:
          "axe-core is the industry standard for automated accessibility testing, backed by Deque Systems. Its rule set covers all WCAG 2.1 AA criteria. We supplemented with custom rules for Pageon-specific patterns (payment form labels, error announcement timing).",
      },
      {
        decision: "PR comment reports over dashboard-only",
        rationale:
          "Developers don't check dashboards during code review. By posting results directly on the PR with before/after screenshots and element selectors, we made it impossible to miss. Fixes could be requested and verified within the same PR.",
      },
    ],
    challenges: [
      {
        challenge: "High false positive rate for dynamic payment flows",
        solution:
          "Payment forms have complex dynamic behaviour (conditional fields, real-time validation). We added state-machine-aware scanning that tests each state independently and filters out false positives caused by transient states.",
      },
      {
        challenge: "Making the team care about the score",
        solution:
          "We gamified it. Each team had a weekly accessibility score posted in Slack. Teams that maintained 95+ for a month got to pick the team lunch spot. Competition between teams drove engagement faster than any policy mandate.",
      },
    ],
    results: [
      "WCAG score improved from 68 to 97 — highest in the payments industry",
      "Accessibility testing integrated into every PR — zero regressions shipped in 18 months",
      "95% of accessibility issues caught during development rather than QA",
      "Tool adopted by 4 additional Pageon teams for their surfaces",
      "Reduced manual QA time for accessibility audits by 80%",
    ],
    lessonsLearned: [
      "Automated testing catches about 40% of accessibility issues — you still need manual testing (screen readers, keyboard navigation, zoom)",
      "The biggest impact comes from making accessibility part of the development workflow, not a separate QA phase",
      "Team culture beats tooling every time — find ways to make accessibility visible and celebrated",
    ],
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
    problem:
      "Performance regressions were being discovered in production by real users. Teams had no standard way to enforce performance budgets in CI. Lighthouse reports were run manually and inconsistently — if at all.",
    goals: [
      "Run Lighthouse performance audits automatically in CI on every PR",
      "Compare results against a baseline and fail the build if budgets are exceeded",
      "Provide clear, actionable reports showing exactly which metrics regressed",
      "Make configuration simple — a single JSON file in the project root",
    ],
    architecture:
      "A Node.js CLI built with Commander.js that wraps Lighthouse in headless Chrome mode. It compares PR results against the main branch baseline and posts a formatted report as a PR comment. Configuration is a `perf.config.json` file with metric thresholds, device profiles (mobile/desktop), and paths to test.",
    technicalDecisions: [
      {
        decision: "Lighthouse over custom performance tests",
        rationale:
          "Lighthouse provides standardised, auditable performance metrics (LCP, CLS, INP, TBT). Custom tests are easy to game accidentally. Lighthouse ensures we're measuring what users actually experience.",
      },
      {
        decision: "PR comment reports over a dashboard",
        rationale:
          "Performance feedback needs to be where developers are already working. A dashboard that nobody checks is useless. A PR comment with a clear PASS/FAIL and delta from baseline gets immediate attention.",
      },
    ],
    challenges: [
      {
        challenge: "Flaky results from CI environment variability",
        solution:
          "We run 3 passes of Lighthouse and take the median. The baseline is recalculated weekly to account for gradual infrastructure changes. A 5% threshold prevents noise from triggering false failures.",
      },
    ],
    results: [
      "3,000+ stars on GitHub — adopted by teams at Shopify, Nexlayer, and Auth0",
      "Used internally to enforce budgets across 15+ frontend repositories",
      "Average performance regression detection time reduced from 2 weeks (post-deploy) to under 10 minutes (in CI)",
      "Zero performance-related production incidents in the year following adoption",
    ],
    lessonsLearned: [
      "Performance budgets only work if the team agrees on them — involve engineers in setting the thresholds",
      "A passing build is a commitment — once you enforce budgets in CI, every team member is responsible for performance",
      "The 5% threshold rule prevents noise while catching real regressions — tune it for your specific stack",
    ],
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
    problem:
      "Small to medium businesses launching online stores faced a fragmented technology landscape. Shopify was expensive, WooCommerce was slow, and custom builds required months of development. There was no well-designed, open-source option that balanced performance, cost, and developer experience.",
    goals: [
      "Enable launching a production-ready store in under 30 minutes",
      "Achieve Lighthouse performance scores above 95 on mobile and desktop",
      "Provide built-in SEO, analytics, and marketing tools out of the box",
      "Support Pageon payment processing with 20+ country-specific payment methods",
    ],
    architecture:
      "A Next.js app with server-side rendering for SEO, ISR for product catalog pages, and React Server Components for the admin dashboard. PostgreSQL handles product, inventory, and order data. Pageon processes payments with webhooks for async confirmation. Media is served via CloudFront with automatic AVIF/WebP conversion.",
    technicalDecisions: [
      {
        decision: "ISR for product pages over full SSG",
        rationale:
          "E-commerce inventory and pricing change frequently. ISR provides fresh content without a full rebuild, and product pages that haven't changed are served from cache. Worst-case refresh is within 60 seconds.",
      },
      {
        decision: "Pageon Connect for multi-merchant support",
        rationale:
          "Pageon Connect handles marketplace-style payments, merchant onboarding, and compliance. Using it from day one meant the platform could support multiple merchants without an architecture overhaul later.",
      },
    ],
    challenges: [
      {
        challenge: "Inventory race conditions during flash sales",
        solution:
          "Implemented PostgreSQL advisory locks for inventory reservation. Combined with a Redis-based rate limiter, this handles 1,000+ concurrent checkout attempts without overselling. Mock audits show zero oversells at 5K concurrent users.",
      },
    ],
    results: [
      "Average store setup time of 22 minutes from clone to first product listed",
      "Lighthouse scores of 98 (mobile) and 100 (desktop) on the product page",
      "Handles 200K+ monthly shoppers with 99.9% uptime during peak traffic",
      "Adopted by 100+ small businesses in the first 6 months",
      "Open-source community with 40+ contributors and 600+ GitHub stars",
    ],
    lessonsLearned: [
      "Inventory management at scale requires distributed locking — don't underestimate this until it fails in production",
      "SEO is a first-class feature, not an afterthought — product pages must be structured for rich search results from day one",
      "A well-designed starter kit can have more impact than a custom build for most businesses",
    ],
  },
  {
    title: "Redact — On-Chain Privacy",
    slug: "redact",
    description:
      "A non-custodial privacy dApp on Monad that hides wallet balances until you choose to reveal them. Encrypted on-chain, verified by users.",
    image: "/images/projects/redact.jpg",
    technologies: ["React", "TypeScript", "Solidity", "Wagmi", "Monad", "Tailwind CSS"],
    category: "Full Stack",
    metrics: "10K+ TPS chain, <$0.01 fees",
    liveUrl: "https://redact-nine.vercel.app",
    githubUrl: "https://github.com/Arem-ee/Redact",
    featured: true,
    problem:
      "Wallet addresses are public by default. Once your address is linked to your name, anyone can look up your full portfolio — what you hold, how much, every transaction you've ever made. Existing privacy solutions were either custodial (holding your keys) or technically complex (requiring zk-proofs). Users needed a simple, auditable way to keep their balances private without trusting a third party.",
    goals: [
      "Hide wallet balances on-chain so nobody can read them without permission",
      "Remain fully non-custodial — users never give up their keys",
      "Work with existing EVM wallets (MetaMask, WalletConnect, etc.)",
      "Keep transaction fees under $0.01 so privacy isn't a luxury",
      "Provide duress mode for physical security threats",
    ],
    architecture:
      "Redact uses a smart contract on Monad that stores encrypted balance commitments. When a user deposits, their balance is committed to the contract as a hash — visible only to the holder of the decryption key. The frontend is a React SPA that connects via Wagmi and handles PIN-based local encryption. Withdrawals are signed transactions that reveal only the amount being moved, preserving privacy of the remaining balance. The contract is verified on Monad Explorer for full transparency.",
    technicalDecisions: [
      {
        decision: "On-chain encryption commitments over zk-proofs",
        rationale:
          "zk-proofs provide stronger privacy guarantees but add significant complexity and gas costs. Encrypted commitments with a local PIN give users 99% of the privacy benefit with 10x better UX and near-zero gas overhead. Users can verify the contract themselves.",
      },
      {
        decision: "Monad over Ethereum L1",
        rationale:
          "Monad delivers 10,000+ TPS throughput with sub-second finality and sub-$0.01 fees. For a privacy app where users may want to make frequent deposits/withdrawals, high throughput and low fees are essential for a good UX. Ethereum L1 gas costs would make small transactions uneconomical.",
      },
      {
        decision: "PIN-based local encryption over server-side auth",
        rationale:
          "A PIN that never leaves the browser means Redact never holds user data. The encrypted balance commitment is stored on-chain, the PIN is stored nowhere. If Redact's servers went down tomorrow, users can still access their funds by interacting with the contract directly.",
      },
    ],
    challenges: [
      {
        challenge: "Balancing privacy with regulatory compliance",
        solution:
          "Redact is non-custodial and doesn't hold user funds. There's no KYC requirement because there's no intermediary. The smart contract is fully transparent and verified. Users self-report for tax purposes just as they would with any self-custodied wallet.",
      },
      {
        challenge: "Preventing brute force PIN attacks",
        solution:
          "After 5 incorrect PIN attempts, the vault locks for 24 hours. The PIN is combined with a hardware-derived key from the user's wallet signature — an attacker would need both the user's seed phrase and their PIN to decrypt the balance.",
      },
    ],
    results: [
      "Fully non-custodial privacy with verified smart contract on Monad Explorer",
      "Average transaction fee under $0.01 — viable for frequent use",
      "Duress mode provides physical security without visible differences",
      "Works with any EVM wallet — no proprietary software required",
    ],
    lessonsLearned: [
      "Privacy UX is harder than privacy tech — hiding a balance is simple; making the reveal feel natural is the real design challenge",
      "Building on a high-throughput L1 (Monad) unlocks UX patterns that are impossible on Ethereum L1 (sub-$0.01 fees make frequent deposits viable)",
      "A verified contract is worth more than a whitepaper — users trust what they can read",
    ],
  },
  {
    title: "ERGO Automotive — Brand Experience",
    slug: "ergo-automotive",
    description:
      "A premium luxury EV brand website with interactive configurator, 3D vehicle showcases, and a seamless test-drive booking experience.",
    image: "/images/projects/ergo.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js App Router"],
    category: "Frontend",
    metrics: "4 vehicle models, 1K+ bookings",
    liveUrl: "https://ergo-website-seven.vercel.app",
    featured: true,
    problem:
      "ERGO Automotive needed a brand website that conveyed precision engineering and luxury without being physically present. The existing site was static, slow, and didn't let potential buyers explore vehicle options interactively. Conversion from interest to test-drive booking was low because users couldn't visualise their ideal configuration.",
    goals: [
      "Create a brand experience that communicates engineering excellence and luxury",
      "Build an interactive vehicle configurator with real-time pricing updates",
      "Achieve sub-2-second LCP on all pages with rich vehicle imagery",
      "Drive test-drive bookings as the primary conversion metric",
      "Support 4 vehicle models with room to expand the lineup",
    ],
    architecture:
      "Built with Next.js App Router for server-rendered pages with instant navigation via RSC. The configurator is a client component with Zustand state management — selections update pricing and imagery in real-time without page reloads. Vehicle imagery uses next/image with AVIF/WebP formats and responsive breakpoints. The booking flow collects user preferences and submits via API route with validation.",
    technicalDecisions: [
      {
        decision: "Next.js App Router over plain React CSR",
        rationale:
          "SEO is critical for an automotive brand — product pages, model specs, and pricing need to be indexable. App Router provides SSR for content pages and seamless client-side transitions for the interactive configurator. RSC means most pages ship zero JavaScript to the browser.",
      },
      {
        decision: "Zustand for configurator state over Context API",
        rationale:
          "The configurator has complex state (model, color, wheels, interior, package) that updates pricing dynamically. Zustand provides fine-grained subscriptions — only components that depend on a specific value re-render when it changes, avoiding the Context re-render cascade problem.",
      },
    ],
    challenges: [
      {
        challenge: "Vehicle imagery performance with high-res product shots",
        solution:
          "Used next/image with AVIF format, device-aware breakpoints (640/768/1024/1536), and priority loading for hero images. Total image payload for the configurator page is under 400KB despite showing full-vehicle renders.",
      },
      {
        challenge: "Configurator state persistence across navigation",
        solution:
          "Configurator state is persisted to sessionStorage so users can browse model pages and return to their configuration without losing selections. The Zustand store hydrates from sessionStorage on mount.",
      },
    ],
    results: [
      "Four vehicle models showcased with full specs, pricing, and imagery",
      "Interactive configurator with real-time pricing across 4 dimensions (color, wheels, interior, package)",
      "Lighthouse performance score target of 95+ on all pages",
      "Seamless test-drive booking flow with validation and confirmation",
      "Responsive design across all device sizes with touch-friendly interactions",
    ],
    lessonsLearned: [
      "A configurator is a product, not a form — every selection should feel delightful, not transactional",
      "Vehicle imagery is the most important asset — invest in high-quality renders and optimise them aggressively",
      "Brand websites benefit from SSR for discoverability and client interactivity for engagement — the App Router handles this split naturally",
    ],
  },
  {
    title: "Mobile Landing Page — Figma Design",
    slug: "mobile-landing-page",
    description:
      "A pixel-perfect mobile landing page design in Figma — focused on conversion-driven layout, clear information hierarchy, and smooth prototyping.",
    image: "/images/projects/mobile-landing.jpg",
    technologies: ["Figma", "UI/UX Design", "Prototyping", "Design Systems"],
    category: "Mobile",
    metrics: "Figma prototype with 5+ screens",
    liveUrl: "https://boho-dwarf-46414877.figma.site",
    featured: true,
    problem:
      "The client needed a mobile-first landing page that converts visitors into users. The challenge was balancing rich product information with a clean, thumb-friendly layout that loads instantly and guides the user toward a single call-to-action without friction.",
    goals: [
      "Design a mobile-first landing page with clear visual hierarchy",
      "Optimise the layout for thumb-zone reachability and one-handed use",
      "Create a prototyping flow that demonstrates the user journey end-to-end",
      "Establish reusable design tokens and components for future pages",
    ],
    architecture:
      "The design is built in Figma using auto-layout with a responsive grid system. Components are organised in a design system library — buttons, cards, input fields, and navigation elements are all variants of master components. The prototype connects 5+ key screens with smart-animate transitions that simulate the native app feel. Design tokens (spacing, typography, color) are defined as Figma variables for consistency.",
    technicalDecisions: [
      {
        decision: "Mobile-first over desktop-down",
        rationale:
          "Over 70% of landing page traffic comes from mobile devices. Designing mobile-first ensures the core experience is optimised for the primary use case, then expanding to desktop breakpoints with additional whitespace and multi-column layouts.",
      },
      {
        decision: "Figma variables for design tokens",
        rationale:
          "Figma variables bind colors, spacing, and typography to a single source of truth. Changing the primary color updates every instance across all screens. This is the design equivalent of CSS custom properties and enables the same systematic consistency.",
      },
    ],
    challenges: [
      {
        challenge: "Balancing content density with mobile readability",
        solution:
          "Used progressive disclosure — key value propositions are visible above the fold, with secondary details revealed through expandable sections. Typography uses a 1.25 line-height ratio for comfortable mobile reading. Touch targets are minimum 44px per WCAG guidelines.",
      },
      {
        challenge: "Design-to-development handoff accuracy",
        solution:
          "Every component includes specs for spacing, typography, color, and behavior. The design system library ensures developers have exact values for every property. Figma's Dev Mode provides direct CSS values for rapid implementation.",
      },
    ],
    results: [
      "5+ screen mobile landing page design with full prototype flow",
      "Design system with reusable components, variants, and design tokens",
      "Thumb-zone-optimized layout with minimum 44px touch targets",
      "Smart-animate transitions for native-app feel in the prototype",
      "Comprehensive Dev Mode specs for engineering implementation",
    ],
    lessonsLearned: [
      "A design system library pays for itself by the second screen — never build mobile screens without reusable components",
      "Prototyping with smart-animate reveals UX issues that static mockups hide — always prototype the full flow before handing off",
      "The gap between Figma design and implementation is smallest when design tokens are treated as source of truth in both tools",
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
