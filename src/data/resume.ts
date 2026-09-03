import type { ResumeData } from "@/types";

export const resumeData: ResumeData = {
  summary:
    "Fullstack developer and AI engineer. I build products end to end, from architecture to shipped code. Electrical engineering student at the University of Ilorin.",
  experience: [
    {
      company: "Propeida",
      location: "Remote",
      role: "CEO & Founder",
      period: "2025 \u2013 Present",
      achievements: [
        "Founded Propeida (formerly PrepIQ), a general entrance exam prep platform",
        "Built the full stack: dual student and admin dashboards, per-exam leaderboards, referral tracking, and admin question management",
        "Shipped with Next.js, Supabase, Paystack, and Tailwind",
        "Launched with UNILORIN Post-UTME as the first supported exam",
      ],
    },
    {
      company: "Self-employed",
      location: "Remote",
      role: "Freelance Fullstack & Product Builder",
      period: "2024 \u2013 Present",
      achievements: [
        "Built Redact, a non-custodial privacy dApp on Monad for a hackathon, with a ZK privacy layer and client-side duress mode",
        "Designed and built StyleArem, a men's fashion e-commerce landing page with a product catalog, quick view, and bag drawer",
        "Built Auditon, a SOC 2 compliance orchestration platform in Go, now postponed pending equipment funding",
        "Shipped client sites including Aletheia, a digital growth research studio",
      ],
    },
    {
      company: "Self-employed",
      location: "Remote",
      role: "Freelance Web Developer",
      period: "2024",
      achievements: [
        "Converted Figma designs into responsive Next.js and Tailwind CSS implementations",
        "Built mobile-first landing pages for small businesses",
        "Developed a repeatable client workflow: discovery, design review, build, handoff",
      ],
    },
  ],
  education: [
    {
      degree: "B.Eng. Electrical Engineering",
      school: "University of Ilorin",
      period: "2023 \u2013 Present",
    },
    {
      degree: "Self-Taught Software Engineer",
      school: "Independent study",
      period: "2022 \u2013 Present",
      details: "Fullstack engineering, product architecture, and AI-assisted development.",
    },
  ],
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Go", "Solidity", "SQL"] },
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Three.js", "React Three Fiber", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "PostgreSQL", "GORM", "Supabase", "Cloud Run"] },
    { category: "Web3", items: ["Ethers.js", "Wagmi", "Safe Protocol Kit", "Snapshot", "Monad"] },
    { category: "Writing", items: ["Tutorials", "Technical Documentation", "Product Specs"] },
  ],
  certifications: [],
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "Yoruba", proficiency: "Native" },
  ],
};
