export interface BlogPostData {
  title: string;
  slug: string;
  date: string;
  readingTime: string;
  summary: string;
  tags: string[];
  coverImage: string;
  content: string;
}

export const blogPosts: BlogPostData[] = [
  {
    title: "How We Cut Checkout Abandonment by 42% at Pageon",
    slug: "cutting-checkout-abandonment",
    date: "2025-02-10",
    readingTime: "9 min read",
    summary:
      "The technical and product decisions behind one of the highest-impact redesigns I led — and what we learned about checkout psychology along the way.",
    tags: ["Architecture", "Payments", "UX", "Micro-Frontends"],
    coverImage: "/images/blog/checkout-abandonment.jpg",
    content: `
      <h2>The Problem With Billions in Lost Revenue</h2>
      <p>Pageon's checkout iframe had a 38% abandonment rate. Every percentage point represented hundreds of millions in potential transaction volume lost to friction, confusion, and distrust.</p>
      <p>The legacy approach had fundamental problems: it was an opaque iframe that merchants couldn't customise, it didn't adapt to local payment preferences, and its accessibility score of 68 meant millions of users with disabilities effectively couldn't complete purchases.</p>

      <h2>Understanding Why Users Abandon</h2>
      <p>Before writing a single line of code, we spent six weeks on research. Three patterns emerged:</p>
      <ul>
        <li><strong>Trust gaps:</strong> Users didn't recognise the payment form as part of the merchant's brand — the iframe felt disconnected and suspicious</li>
        <li><strong>Payment method mismatch:</strong> In Germany, 60% of users expected to see PayPal as an option. When they didn't see it, they assumed it wasn't accepted and left</li>
        <li><strong>Form friction:</strong> Each additional field reduced conversion by 5%. Error messages were cryptic, and inline validation was nonexistent</li>
      </ul>

      <h2>The Architectural Shift</h2>
      <p>We moved from a single iframe to a micro-frontend architecture using Web Components. Each payment method is an independently deployable module with its own state machine, managed by XState. The shared orchestration layer handles theming via CSS custom properties, analytics, and payment state routing.</p>
      <p>This architecture let us:</p>
      <ul>
        <li>Deploy new payment methods without touching core checkout code</li>
        <li>Let merchants theme the checkout to match their brand perfectly</li>
        <li>A/B test payment method ordering per country without infrastructure changes</li>
        <li>Load only the payment methods relevant to each user's country</li>
      </ul>

      <h2>Payment Method as a Product</h2>
      <p>One mindset shift made the biggest difference: we started treating each payment method as a product, not a feature. Card payments in the US have different UX requirements than iDEAL in the Netherlands or Konbini in Japan. Each method got its own product spec, design review, and performance budget.</p>
      <p>This meant building a plugin architecture where each payment method implements a standardised interface but owns its rendering, validation, and error handling independently.</p>

      <h2>The Accessibility Payoff</h2>
      <p>We built an automated a11y audit pipeline using Playwright and axe-core that runs against every payment method in every supported locale. Every PR must pass a minimum WCAG score before it merges. This lifted our score from 68 to 97 — highest in the payments industry.</p>
      <p>The unexpected outcome? Accessibility improvements also made the checkout faster and more usable for everyone. Proper form labels, clear error states, and logical tab order benefit all users.</p>

      <h2>Results</h2>
      <p>Abandonment dropped from 38% to 22% — a 42% relative reduction. Integration time for new merchants went from 2 weeks to 2 days. Payment method coverage expanded from 5 to 35+ countries without core code changes. And we proved that investing in accessibility and architecture together creates compounding returns.</p>
    `,
  },
  {
    title: "Building a Real-Time Sync Engine With CRDTs",
    slug: "building-real-time-sync-crdts",
    date: "2024-12-18",
    readingTime: "12 min read",
    summary:
      "Lessons from building Canvo's real-time collaboration layer from scratch — CRDT selection, conflict resolution, and scaling to 10K concurrent users.",
    tags: ["Architecture", "CRDT", "Real-Time", "Backend"],
    coverImage: "/images/blog/crdt-sync.jpg",
    content: `
      <h2>Why Not Operational Transform?</h2>
      <p>When we started building Canvo's collaborative plugin data layer, the established approach was Operational Transform (OT) — used by Google Docs and almost every collaborative editor at the time. OT works well with a central server that orders operations, but it has fundamental limitations:</p>
      <ul>
        <li>Every operation needs to go through the server, making true offline editing impossible</li>
        <li>Conflict resolution logic grows exponentially with the number of supported operations</li>
        <li>P2P collaboration requires complex server infrastructure to manage ordering</li>
      </ul>
      <p>CRDTs (Conflict-Free Replicated Data Types) offered a fundamentally different approach — instead of ordering operations, CRDTs design data structures where concurrent edits merge deterministically without a central authority.</p>

      <h2>Choosing Yjs</h2>
      <p>After evaluating multiple CRDT libraries (Automerge, Yjs, Loro), we chose Yjs. Key factors:</p>
      <ul>
        <li><strong>Performance:</strong> Yjs uses a block-based internal representation that's significantly faster than the tree-based approach in Automerge — especially for large documents</li>
        <li><strong>Garbage collection:</strong> Yjs compacts its internal data structure efficiently, preventing unbounded memory growth over time</li>
        <li><strong>Ecosystem:</strong> Yjs has connectors for WebSocket, WebRTC, and IndexedDB — all of which we used</li>
        <li><strong>Proven at scale:</strong> Yjs powers the collaboration layer in several production applications with millions of users</li>
      </ul>

      <h2>Architecture Overview</h2>
      <p>The sync engine has three layers. The client layer runs Yjs in the browser, managing shared document types (text, map, array). The relay layer is a Go WebSocket server that handles discovery and message broadcasting — it doesn't process or transform operations, just relays them. The persistence layer stores periodic snapshots and operation logs in MongoDB, with Redis for presence information.</p>
      <p>The Go relay server can handle 10,000+ concurrent WebSocket connections with about 4KB of memory per connection. Kubernetes auto-scales based on connection count, and a TCP load balancer distributes connections across pods.</p>

      <h2>Offline Editing: The Hard Part</h2>
      <p>CRDTs make offline editing theoretically simple — edits are just operations that sync later. But the practical challenges were substantial:</p>
      <ul>
        <li><strong>Conflict visualisation:</strong> When two users make conflicting offline edits, we had to build a three-way merge UI showing the user's version, the server version, and the merged result</li>
        <li><strong>Reconnection storms:</strong> When a user comes back online after hours of offline editing, thousands of queued operations sync at once. We implemented a batching strategy that applies operations in chunks and reports progress</li>
        <li><strong>Version vector explosion:</strong> Yjs uses version vectors to track state. With many offline edits, the version vector grows. Periodic compaction keeps this under control</li>
      </ul>

      <h2>Key Lessons</h2>
      <p>CRDTs eliminate entire classes of bugs that plague OT systems. Once you have a correct CRDT implementation, many sync issues simply cannot occur. The complexity is upfront — CRDT data structures are harder to design — but the payoff in system simplicity is enormous.</p>
      <p>The biggest lesson was that WebSocket connection management at scale is harder than the CRDT implementation itself. Load balancing, reconnection backoff, and presence timeout handling required more engineering effort than the core sync logic.</p>
    `,
  },
  {
    title: "Performance Budgets That Actually Work",
    slug: "performance-budgets-that-work",
    date: "2024-10-05",
    readingTime: "7 min read",
    summary:
      "How we established and enforced performance budgets at Nexlayer — from CI gates to team culture changes that stuck.",
    tags: ["Performance", "CI/CD", "DevOps", "Culture"],
    coverImage: "/images/blog/perf-budgets.jpg",
    content: `
      <h2>Empty Budgets Are Worse Than No Budgets</h2>
      <p>I've seen teams spend weeks defining performance budgets that were never enforced, checked, or even remembered. A budget that nobody knows about is a trap — it creates the illusion of performance work without any actual improvement.</p>
      <p>At Nexlayer, we took a different approach: start with the CI gate, not the number. The budget was secondary to the enforcement mechanism.</p>

      <h2>The Three-Budget System</h2>
      <p>We defined three budgets that every project must meet:</p>
      <ul>
        <li><strong>Lighthouse Performance Score:</strong> Minimum 90 on mobile, 95 on desktop. Measured on every PR against staging</li>
        <li><strong>JavaScript Bundle Size:</strong> Maximum 200KB (gzipped) for initial route. Measured by a custom webpack plugin that reports to the PR</li>
        <li><strong>LCP (Largest Contentful Paint):</strong> Under 2.5 seconds on mobile 3G simulated throttling</li>
      </ul>
      <p>Each budget has a threshold (soft failing at 5% over, hard fail at 10% over) and an owner — a specific engineer responsible for monitoring and triaging regressions.</p>

      <h2>Enforcing in CI</h2>
      <p>We built a GitHub Action that runs Lighthouse, checks bundle size, and posts a PR comment with results. The comment includes a PASS/FAIL status, the delta from the main branch baseline, and links to detailed reports.</p>
      <p>The baseline is recalculated weekly by running the same tests against main. This accounts for gradual infrastructure improvements while maintaining the standard. A 5% threshold prevents noise from triggering false failures.</p>

      <h2>The Culture Side</h2>
      <p>CI enforcement only works if the team buys in. We did three things that made the difference:</p>
      <ul>
        <li><strong>Performance guild:</strong> A rotating group of engineers who review PRs with performance impacts and maintain the budget tooling</li>
        <li><strong>Weekly perf review:</strong> A 15-minute meeting where we review the worst-performing pages and decide on remediation</li>
        <li><strong>Celebrating wins:</strong> When a team improved a metric meaningfully, we celebrated it publicly. Performance became a source of pride, not just a gate to pass</li>
      </ul>

      <h2>Results After 6 Months</h2>
      <p>Median page load times across the platform dropped by 28%. Zero performance-related production incidents in the following year. And perhaps most importantly, performance became part of the engineering culture — new engineers learned about budgets during onboarding, not during an incident post-mortem.</p>
    `,
  },
  {
    title: "Designing APIs Frontend Developers Love",
    slug: "designing-apis-frontend-developers-love",
    date: "2024-08-22",
    readingTime: "8 min read",
    summary:
      "What I've learned about API design from shipping platforms consumed by thousands of developers — consistency, ergonomics, and the human side of APIs.",
    tags: ["API Design", "Developer Experience", "Platform", "GraphQL"],
    coverImage: "/images/blog/api-design.jpg",
    content: `
      <h2>The Developer Experience Gap</h2>
      <p>APIs are the user interfaces of backend systems. We spend months designing REST endpoints but hours on the developer experience — the documentation, error messages, and ergonomics that determine whether developers love or hate using our API.</p>
      <p>After building and shipping three developer-facing APIs (Canvo Plugins API, Pageon Elements SDK, and the Nexlayer template system), here's what I've learned about designing APIs that developers genuinely enjoy working with.</p>

      <h2>Principle 1: Design for the Use Case, Not the Database</h2>
      <p>The most common mistake in API design is exposing your database schema as the API response. If the frontend needs a user's name, recent orders, and saved payment methods, don't make them call three endpoints. Design the response to match the frontend's UI needs.</p>
      <p>GraphQL solves this elegantly, but even with REST you can use the concept of includes or side-loading to let clients request related data in a single call. The key insight: the API should model the user journey, not the database schema.</p>

      <h2>Principle 2: Error Messages Are a Product Feature</h2>
      <p>Nothing frustrates developers more than a cryptic error response. A great error response includes three things: a machine-readable code for automation, a human-readable message that explains what went wrong in plain language, and a resolution hint that tells the developer how to fix it.</p>
      <p>Example: <code>INVALID_CARD_NUMBER</code> + "The card number you entered doesn't look right. Please check it and try again." + "Card numbers should be 15-16 digits without spaces or dashes."</p>

      <h2>Principle 3: Evolve, Don't Version</h2>
      <p>URL versioning (v1, v2, v3) creates maintenance headaches and developer confusion. Instead, design your API to be evolvable: add new fields rather than changing existing ones, mark deprecated fields with clear sunset dates, and maintain backward compatibility for at least 6 months.</p>
      <p>At Canvo, we version at the field level in our GraphQL schema — deprecated fields are marked with @deprecated but never removed without notice. The client requests the version it was built against, and the server adapts.</p>

      <h2>The Human Element</h2>
      <p>The best API design advice I can give: have empathy for the developer on the other end. Every mandatory field, every cryptic error, every missing piece of documentation is a tax on developer productivity. Build APIs that respect the people consuming them, and they'll build amazing things with them.</p>
    `,
  },
  {
    title: "The Architecture of a Million-Dollar Checkout Flow",
    slug: "architecture-checkout-flow",
    date: "2024-06-14",
    readingTime: "11 min read",
    summary:
      "Deep dive into Pageon's checkout architecture: micro-frontends, state machines, real-time updates, and how we handle 15K transactions per second.",
    tags: ["Architecture", "Payments", "Micro-Frontends", "React"],
    coverImage: "/images/blog/checkout-architecture.jpg",
    content: `
      <h2>The Scope of the Problem</h2>
      <p>Every day, Pageon processes hundreds of millions of dollars in transactions through its checkout product. The checkout is a surface where milliseconds matter — a 1-second delay can reduce conversion by 7%. And it must work flawlessly across every browser, device, and network condition worldwide.</p>
      <p>When I joined the checkout team, the architecture was a monolithic iframe that had grown beyond its design limits. Every new payment method required touching the core checkout code. Every performance optimisation required understanding the entire codebase. Every accessibility fix was a hero effort.</p>

      <h2>The Micro-Frontend Decomposition</h2>
      <p>We decomposed the checkout into independently deployable modules, each responsible for a specific capability: payment method selection, card details form, alternative payment methods, order summary, and confirmation. Each module is a Web Component with its own XState state machine, bundled separately, and loaded on demand.</p>
      <p>The shared shell handles routing between modules, theming via CSS custom properties, analytics instrumentation, and the WebSocket connection for real-time status updates.</p>

      <h2>State Machines for Payment Flows</h2>
      <p>Payment flows have inherently complex state. A transaction can be: idle, processing, confirming, succeeded, failed, disputed, refunded, or expired. Each state has valid transitions, side effects, and UI states.</p>
      <p>XState gave us a declarative way to model these flows. Each payment method defines its state machine in a single file. The machine is visualisable, testable, and impossible to put into an invalid state. We generate Flow Diagrams from the machine definitions that product managers can review alongside engineers.</p>

      <h2>Real-Time Without Complexity</h2>
      <p>Payment confirmations need to be real-time — users shouldn't see a loading spinner while the backend processes the transaction. We established a WebSocket connection when the checkout loads (piggybacking on the initial HTTP/2 connection). The server pushes payment status updates, and each module's state machine transitions accordingly.</p>
      <p>The key insight: WebSocket connections should be established early, before the user starts typing. By the time they click "Pay", the connection is already warm — zero additional latency.</p>

      <h2>Lessons From Black Friday</h2>
      <p>The architecture handled 15,000 transactions per second during peak Black Friday traffic with 99.99% uptime. The auto-scaling WebSocket servers spun up additional pods within 30 seconds of traffic spikes. Payment confirmation latency remained under 200ms throughout.</p>
      <p>The biggest lesson? State machines saved us from production incidents. When a payment provider returned an unexpected response during peak traffic, the state machine correctly transitioned to a retry state instead of showing a broken UI. That single defence prevented what would have been a major incident.</p>
    `,
  },
  {
    title: "Scaling Frontend Teams at High-Growth Companies",
    slug: "scaling-frontend-teams",
    date: "2024-04-30",
    readingTime: "10 min read",
    summary:
      "What I learned growing frontend teams from 5 to 50 engineers — org design, code ownership, and maintaining velocity without sacrificing quality.",
    tags: ["Engineering Culture", "Leadership", "Team Building", "Process"],
    coverImage: "/images/blog/scaling-teams.jpg",
    content: `
      <h2>The Garage Phase (1-10 Engineers)</h2>
      <p>This is the most productive phase per engineer. No process. Everyone talks to everyone. Decisions are made in Slack or over lunch. Code deploys happen multiple times a day with minimal ceremony. The downside: everything lives in someone's head. There's no documentation, no on-call rotation, and no way to scale beyond the founding team.</p>
      <p>What to preserve: the sense of ownership and mission urgency. What to let go: tribal knowledge and hallway-track decisions.</p>

      <h2>The Squad Phase (10-30 Engineers)</h2>
      <p>At this stage, you need to divide into teams. The most critical decision is how to split. We tried the technical layer approach (UI team, API team, infrastructure team) — it created handoff bottlenecks and nobody felt ownership. The better approach: organise around business domains. Each squad owns a vertical slice from database to UI.</p>
      <p>Key investments at this stage:</p>
      <ul>
        <li><strong>Architecture Decision Records (ADRs):</strong> One-page documents explaining why we chose approach X over Y. Not a design doc — just the decision and its rationale.</li>
        <li><strong>Platform Squad:</strong> A small team focused on infrastructure, CI/CD, and developer tooling. Their customers are other engineers.</li>
        <li><strong>Bootstrap mentorship:</strong> Pair junior engineers with senior engineers for code reviews, design sessions, and on-call shadowing.</li>
      </ul>

      <h2>The Tribe Phase (30-50+ Engineers)</h2>
      <p>At this scale, communication overhead becomes the biggest challenge. The org now needs lightweight processes to maintain alignment without suffocating autonomy.</p>
      <ul>
        <li><strong>Guilds:</strong> Cross-team communities for frontend, testing, accessibility. They define standards, share knowledge, and maintain shared tooling.</li>
        <li><strong>Tech talks:</strong> Weekly lunch-and-learn sessions where teams share what they shipped and what they learned.</li>
        <li><strong>Stakeholder reviews:</strong> Before building, teams present their approach to stakeholders from other squads. Catches design issues early and spreads knowledge.</li>
      </ul>

      <h2>What I'd Do Differently</h2>
      <p>Looking back at three growth cycles, here's what I'd change:</p>
      <ul>
        <li><strong>Invest in testing infrastructure earlier:</strong> The cost of adding tests grows exponentially with codebase size. A solid testing strategy before the codebase reaches 100K lines is worth months of future savings.</li>
        <li><strong>Document decisions while they're fresh:</strong> ADRs written 6 months after the decision are not ADRs — they're history with gaps. Write them as you decide.</li>
        <li><strong>Celebrate wins more visibly:</strong> In high-growth environments, teams move so fast they don't pause to recognise achievements. Acknowledging wins builds the culture you want.</li>
      </ul>
    `,
  },
  {
    title: "Accessibility Is Not a Feature — It's Infrastructure",
    slug: "accessibility-is-infrastructure",
    date: "2024-03-12",
    readingTime: "6 min read",
    summary:
      "How we treated accessibility as platform infrastructure at Pageon — automated audits, component contracts, and the shift from reactive fixes to proactive design.",
    tags: ["Accessibility", "Engineering Culture", "React", "Testing"],
    coverImage: "/images/blog/a11y-infrastructure.jpg",
    content: `
      <h2>The Reactive Trap</h2>
      <p>Most teams treat accessibility as a QA phase — build the feature, then audit it, then fix the issues. This is expensive, demoralising, and produces worse outcomes. When accessibility is a last-minute fix, it's always a trade-off against something else.</p>
      <p>At Pageon, we shifted the model: accessibility is platform infrastructure, not a per-feature concern. Just like you don't rebuild authentication for every feature, you shouldn't rebuild accessibility for every feature.</p>

      <h2>Component Contracts</h2>
      <p>Every component in the design system ships with an accessibility contract: a documented set of guarantees about keyboard interactions, screen reader announcements, focus management, and colour contrast. When a product team uses the Button component, they get accessibility for free.</p>
      <p>This shift was the most impactful thing we did. Instead of 50 teams each worrying about aria labels, they used a Button that already handled them. Accessibility bugs dropped by 80% in the first quarter.</p>

      <h2>Automated Audits in CI</h2>
      <p>We built a Playwright + axe-core pipeline that runs against every component variant and page state on every PR. Results post as a PR comment with the WCAG score, a list of violations, and element selectors. If the score drops below the threshold, the build fails.</p>
      <p>Automated testing catches about 40% of accessibility issues. The remaining 60% — screen reader flow, cognitive load, real-world keyboard navigation — require manual testing. But automating that 40% frees up QA time for the deeper testing.</p>

      <h2>The Gamification That Worked</h2>
      <p>Every team got a weekly accessibility score posted in a shared Slack channel. Teams that maintained 95+ for a month got to pick the team lunch spot. Within three months, competition between teams drove the average score from 72 to 91. Nobody wanted to be the team that brought the score down.</p>

      <h2>The Result</h2>
      <p>Pageon Checkout's WCAG score went from 68 to 97. Zero accessibility regressions shipped in 18 months. And the component contract approach meant that new features launched accessible by default — no last-minute scramble required.</p>
    `,
  },
  {
    title: "What Nobody Tells You About Micro-Frontends",
    slug: "what-nobody-tells-you-about-micro-frontends",
    date: "2024-01-28",
    readingTime: "9 min read",
    summary:
      "The hard lessons from shipping micro-frontends in production — shared dependency hell, performance overhead, and when not to use them.",
    tags: ["Architecture", "Micro-Frontends", "React", "Performance"],
    coverImage: "/images/blog/micro-frontends.jpg",
    content: `
      <h2>The Promise vs. The Reality</h2>
      <p>Micro-frontends promise independent deploys, technology freedom, and scalable organisations. The reality is more nuanced: they deliver on those promises only if you invest heavily in the shared infrastructure, conventions, and monitoring that make them viable.</p>
      <p>After shipping two micro-frontend systems (Pageon Checkout and Nexlayer's dashboard), here's what I wish someone had told me before we started.</p>

      <h2>Shared Dependency Hell</h2>
      <p>The biggest pain point: shared dependencies. If two micro-frontends use different versions of React, you either load React twice (bloating the bundle) or force alignment (defeating independent deployability).</p>
      <p>Our solution: a shared dependency manifest managed by the shell application. Core libraries (React, React Router, the design system) are loaded once by the shell and shared via Webpack 5 Module Federation. Micro-frontends can use different versions of non-core libraries, but the core stack is version-locked across the system.</p>
      <p>This is the single most important architectural decision in a micro-frontend system. Get it wrong and your bundle size grows linearly with every micro-frontend added.</p>

      <h2>The Performance Tax</h2>
      <p>Micro-frontends add performance overhead. Each micro-frontend loads its own CSS, JavaScript, and data. Without careful coordination, users download duplicated dependencies and wait for multiple bootstrap sequences.</p>
      <p>We mitigated this with:</p>
      <ul>
        <li><strong>Shared bundles:</strong> Core dependencies loaded once, cached aggressively</li>
        <li><strong>Prefetching:</strong> The shell prefetches micro-frontend chunks based on predicted user navigation</li>
        <li><strong>Lazy loading with priority:</strong> Above-the-fold micro-frontends load eagerly; below-the-fold ones wait until the viewport approaches</li>
      </ul>

      <h2>When NOT to Use Micro-Frontends</h2>
      <p>If your team has fewer than 15 engineers and you're not experiencing deployment coordination pain, micro-frontends will slow you down. The overhead of shared infrastructure, cross-team alignment, and module boundaries isn't worth it at that scale.</p>
      <p>Micro-frontends are a scaling tool, not an architecture philosophy. Use them when your deployment frequency is constrained by cross-team dependencies, not because they're trendy.</p>
    `,
  },
  {
    title: "Building a Plugin Platform: Lessons From Canvo",
    slug: "building-plugin-platform-lessons",
    date: "2023-11-15",
    readingTime: "8 min read",
    summary:
      "What went into designing Canvo's plugin API — sandboxing, security, developer experience, and growing an ecosystem from zero to 800 plugins.",
    tags: ["Platform", "API Design", "Security", "Developer Experience"],
    coverImage: "/images/blog/plugin-platform.jpg",
    content: `
      <h2>Platform Design Is About Saying No</h2>
      <p>When we started building Canvo's plugin platform, every internal stakeholder wanted their feature exposed in the API. The most important decisions we made were the ones where we said no — capabilities that would have constrained the editor's evolution or compromised security.</p>

      <h2>The Sandbox Architecture</h2>
      <p>Plugins run in sandboxed iframes with a postMessage bridge to the editor. This provides strong isolation — a plugin cannot access the DOM, make arbitrary network requests, or read files from the user's machine. Everything goes through the permission-gated API.</p>
      <p>Each plugin declares its required permissions in a manifest file. Users approve permissions during installation. If a plugin tries to access an API it didn't declare, the runtime blocks the call and logs the violation.</p>

      <h2>Developer Experience as Product</h2>
      <p>We invested heavily in the onboarding experience. Our goal: a developer should go from zero to a working plugin in under 30 minutes. We shipped:</p>
      <ul>
        <li><strong>CLI tool:</strong> <code>create-canvo-plugin</code> scaffolds a project with TypeScript, hot reloading, and a sample plugin</li>
        <li><strong>Live preview:</strong> Changes in the code editor auto-reload in the Canvo UI within 2 seconds</li>
        <li><strong>Error feedback:</strong> Plugin crashes show the stack trace and the exact line of plugin code that failed</li>
        <li><strong>Documentation with runnable examples:</strong> Every API method has a live CodeSandbox that developers can edit and test in real-time</li>
      </ul>

      <h2>The Automated Review Pipeline</h2>
      <p>Manual plugin review doesn't scale. We built an automated pipeline that checks for security violations, manifest compliance, and API usage patterns. Only plugins flagged by the automated system require manual review. This processes 95% of submissions without human intervention.</p>

      <h2>Results</h2>
      <p>800+ plugins published in the first year — 60% above our goal. 40% of monthly active users used at least one plugin within 6 months. Developer NPS of 72 for the platform experience. And the automated review pipeline caught two security issues in the first month that would have been missed in manual review.</p>
    `,
  },
  {
    title: "Why Your CI Pipeline Should Fail on Performance Regressions",
    slug: "ci-pipeline-performance-regressions",
    date: "2023-09-20",
    readingTime: "5 min read",
    summary:
      "Setting up automated Lighthouse budgets in CI, catching regressions before they merge, and building a culture where performance is everyone's responsibility.",
    tags: ["Performance", "CI/CD", "DevOps", "Automation"],
    coverImage: "/images/blog/ci-performance.jpg",
    content: `
      <h2>The Cost of Finding Performance Bugs in Production</h2>
      <p>Performance regressions found in production are the most expensive bugs to fix. By the time a user experiences a slow page, the code has already been reviewed, merged, deployed, and cached. Rolling back is painful, and the fix requires an entire deploy cycle.</p>
      <p>Performance budgets in CI catch these regressions before they merge — when the fix is a single commit away.</p>

      <h2>Setting Up Lighthouse CI</h2>
      <p>We use Lighthouse CI with GitHub Actions. On every PR, the workflow:</p>
      <ol>
        <li>Deploys a preview build to a unique URL</li>
        <li>Runs Lighthouse against 5 key pages (home, product, checkout, search, article)</li>
        <li>Compares results against the main branch baseline</li>
        <li>Posts a PR comment with PASS/FAIL status and metric deltas</li>
      </ol>
      <p>The baseline is recalculated weekly to account for gradual infrastructure improvements. We use a 5% threshold to prevent noise from triggering false failures — anything within 5% of the baseline passes.</p>

      <h2>What We Measure</h2>
      <p>Three metrics, enforced in CI:</p>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> Under 2.5 seconds — measures perceived load speed</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> Under 0.1 — measures visual stability</li>
        <li><strong>INP (Interaction to Next Paint):</strong> Under 200ms — measures responsiveness</li>
      </ul>
      <p>These three metrics (Core Web Vitals) capture what users actually experience. A high Lighthouse score doesn't guarantee good Core Web Vitals, but good Core Web Vitals almost always mean a high Lighthouse score.</p>

      <h2>The Culture Shift</h2>
      <p>CI enforcement alone isn't enough. You need the team to care about performance. Making performance visible in PRs — with clear PASS/FAIL status and delta from baseline — turns performance into a team responsibility rather than an individual concern.</p>
      <p>Within three months of enforcing budgets in CI, performance regressions stopped reaching production entirely. The team had internalised the patterns — nobody wanted to be the one who broke the build with a performance regression.</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
