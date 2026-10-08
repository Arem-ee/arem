/**
 * ==========================================================================
 * Kinetic Portfolio & Zigzag Showcase - Central Content Store
 * Global: window.SITE
 * ==========================================================================
 */

window.SITE = {
  brand: {
    name: "Arem",
    description: "Fullstack developer and AI engineer based in Nigeria. I build products end to end, from architecture to shipped code."
  },

  navigation: [
    { label: "Work", href: "index.html#work" },
    { label: "Design", href: "/design.html" },
    { label: "Writing", href: "/writing.html" },
    { label: "Contact", href: "index.html#contact" }
  ],

  hero: {
    headlineLeft: "AREM",
    headlineRight: "",
    subtextLeft: "Hey there, I'm Toromade Abdulrahman. A student at the University of Ilorin, Nigeria. My vision is to solve real-world challenges through enterprise and technology, but currently I'm open to freelance work.",
    subtextRight: "Based in Nigeria, studying electrical engineering at the University of Ilorin."
  },

  remainingBody: {
    statement: "I build things that ship — and keep working after they do.",
    paragraph: "Sole builder of Propeida, the exam-prep platform that served 250+ active users in its launch week, alongside shipped Web3, e-commerce, and design work. Studying electrical engineering at the University of Ilorin, and open to the right project."
  },

  footer: {
    description: "Based in Nigeria, open to the right project. The form below is the fastest way to reach me.",
    pages: [
      { label: "Work", href: "index.html#work" },
      { label: "Design", href: "/design.html" },
      { label: "Writing", href: "/writing.html" },
      { label: "Contact", href: "index.html#contact" }
    ],
    social: [
      { label: "GitHub", href: "https://github.com/Arem-ee" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/toromadeabdulrahman" },
      { label: "X", href: "https://x.com/Arem_ee" }
    ],
    copyrightName: "Arem. All rights reserved."
  },

  contact: {
    options: [
      { value: "project", label: "A new project" },
      { value: "role", label: "A full-time role" },
      { value: "collaboration", label: "A collaboration" },
      { value: "other", label: "Something else" }
    ],
    successTitle: "Message received.",
    successBody: "Thank you for reaching out. I will get back to you shortly."
  },

  projects: [
    {
      id: 1,
      slug: "propeida",
      title: "Propeida",
      summary: "General entrance exam prep platform, rebranded from PrepIQ. Practice questions, per-exam leaderboards, referral tracking, and admin question management.",
      role: "Sole builder & founder — product, architecture, and engineering",
      year: "2025",
      tools: "Next.js, Supabase, Paystack, Tailwind CSS",
      world: "sage",
      image: "assets/project-1.jpg",
      alt: "Propeida exam-prep platform overview",
      problem: [
        "Students preparing for university entrance exams had no structured way to practice and measure themselves against other candidates. PrepIQ started as a practice question bank; the move to Propeida added the competitive and administrative layers that make the platform useful to institutions.",
        "The product needed practice questions with explanations, per-exam leaderboards, an admin surface for publishing questions without code, and referral tracking so growth is measurable."
      ],
      process: [
        "Next.js frontend with Supabase for auth and storage, Paystack for payments, and Tailwind for styling. Student and admin dashboards sit over one shared data model: exams, questions, attempts, and leaderboard scores.",
        "Leaderboard scores are computed from recorded attempts, with one representative attempt per exam window per student, and the rules are explicit in the UI. Supabase replaced a custom API to keep a solo build's moving parts minimal."
      ],
      result: "Launched for UNILORIN Post-UTME: 250+ active users in launch week, 87% session retention through exam date, 1,200+ practice attempts in the first 3 weeks, and admin question publishing cut from hours to minutes."
    },
    {
      id: 2,
      slug: "redact",
      title: "Redact",
      summary: "Non-custodial stablecoin privacy app built on Monad for a hackathon. ZK privacy layer for private balance management, client-side duress mode.",
      role: "Solo hackathon build — contract, frontend, and submission",
      year: "2026",
      tools: "TypeScript, Solidity, ZK, Monad",
      world: "cream",
      image: "assets/project-2.jpg",
      alt: "Redact privacy app overview",
      problem: [
        "Wallet balances are public on-chain. Once an address is linked to a person, their holdings and history are readable by anyone. Existing privacy tooling was either custodial or too complex for a normal user.",
        "The build had to keep balances private without taking custody, work with standard EVM wallets, and add a duress mode that shows a fake balance under coercion."
      ],
      process: [
        "A smart contract on Monad stores encrypted balance commitments: deposits commit a hidden amount, withdrawals reveal only what moves. Keys are generated and held client-side in a React app using Wagmi.",
        "Duress mode lives in the client — a PIN change flips the UI to a decoy balance while real funds stay behind the contract. Encrypted commitments were chosen over a full zk-SNARK pipeline to fit the hackathon timeline without custody."
      ],
      result: "Non-custodial privacy contract deployed and verified on Monad testnet, client-side duress mode implemented, 120+ GitHub stars. Did not win — a last-day SDK version mismatch blocked the deposit flow; it was documented in the submission rather than hidden, and judges cited the transparency."
    },
    {
      id: 3,
      slug: "stylearem",
      title: "StyleArem",
      summary: "Men's fashion e-commerce landing page. Full storefront layout with collections, a working bag, and social proof built in.",
      role: "Designed & built end to end",
      year: "2026",
      tools: "React, Vite, Tailwind CSS",
      world: "sage",
      image: "assets/project-3.jpg",
      alt: "StyleArem storefront overview",
      problem: [
        "Men's fashion online is spread across marketplaces where every listing looks the same. StyleArem takes the opposite approach: one curated point of view, with collections by lifestyle, full product detail, and reviews in a single storefront.",
        "The build needed collections by lifestyle, product inspection without leaving the grid, a bag that stays visible with running totals, and answers to common questions on the page."
      ],
      process: [
        "React single-page storefront built with Vite and Tailwind. Catalog, quick-view modal, bag drawer, FAQ, and newsletter sections share one client-side product model: items with sizes, colors, prices, ratings, and reviews.",
        "Category pills keep every product two clicks away, quick view opens over the grid so comparing never loses scroll position, and the bag runs as a slide-over drawer with promo codes and a free-shipping progress bar — all browser state, no backend."
      ],
      result: "Lighthouse 98/100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO. Six lifestyle categories, 40+ products with quick view and reviews, and a component-based design system ready for backend integration."
    },
    {
      id: 4,
      slug: "oralcare",
      title: "Oralcare",
      summary: "A dental clinic site. Booking flow, a team directory, a four-step process explainer, and patient testimonials, built as a full marketing site rather than a single landing page.",
      role: "Designed & built end to end",
      year: "2026",
      tools: "React, Vite, Tailwind CSS",
      world: "cream",
      image: "assets/project-4.jpg",
      alt: "Oralcare dental clinic site overview",
      problem: [
        "A dental clinic wins patients on trust: who will treat them, what happens step by step, and what other patients say. A single landing page with a phone number does not carry that weight.",
        "The site needed a team directory with profiles, a four-step process explainer, trust signals early, and booking one click away from every section."
      ],
      process: [
        "React single-page marketing site with Vite and Tailwind: hero, trust stats, about, team grid, four-step process, testimonials, insights, and booking sections on one page with anchor navigation.",
        "Trust stats sit directly under the hero, where a nervous patient decides whether to keep reading. Each specialist gets a face and a booking link, and four named steps turn an unknown into a sequence."
      ],
      result: "Lighthouse 96/100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO. Four trust stats, four doctor profiles, and the four-step process all above the fold on mobile, with a 12+ component library reusable for future clinic sites."
    },
    {
      id: 5,
      slug: "mobile-landing-page",
      title: "Buzz Kitchen",
      summary: "Conversion-focused mobile landing page designed and prototyped in Figma: clear hierarchy, persuasive flow, clickable end to end.",
      role: "Solo design exercise — mobile-first canvas, interactive prototype",
      year: "2026",
      tools: "Figma, Prototyping",
      world: "sage",
      image: "assets/project-5.jpg",
      alt: "Buzz Kitchen mobile landing page prototype",
      problem: [
        "Most landing pages are designed on desktop canvases and degrade on mobile. This was an exercise in designing mobile-first from the first frame: a landing page where the layout, hierarchy, and interaction are native to the phone, not stretched to fit it.",
        "The work needed a conversion-focused landing page on a mobile canvas, a clear information hierarchy for a small screen, and a prototype where the interactions are testable, not assumed."
      ],
      process: [
        "A Figma design system with components for each section — hero, value proposition, social proof, call to action — with the primary flow wired end to end, including form states and error handling.",
        "Each section carries one message and one action; anything that did not serve the conversion goal was cut. Auto-layout and variants keep the file ready for developer handoff."
      ],
      result: "A 14-screen clickable prototype covering hero → value → social proof → CTA → form → success, an 8-component design system with prototyped validation states, and a flow settled end to end in Figma."
    }
  ]
};
