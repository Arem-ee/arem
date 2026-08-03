import type { ResumeData } from "@/types";

export const resumeData: ResumeData = {
  summary:
    "Web3 technical writer and builder. Electrical engineering student at the University of Ilorin. I write about self-custody and DAO tooling, and I build products end to end, from architecture to shipped code.",
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
      role: "Freelance Web3 & Product Builder",
      period: "2024 \u2013 Present",
      achievements: [
        "Built Redact, a non-custodial privacy dApp on Monad for a hackathon, with a ZK privacy layer and client-side duress mode",
        "Designed and built ERGO Automotive's brand experience: a 3D car configurator with Three.js and React Three Fiber, plus logo and identity",
        "Built Auditon, a SOC 2 compliance orchestration platform in Go, now postponed pending equipment funding",
        "Shipped client sites including Aremco Heating, Cooling & Construction's business landing page",
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
      details: "Web3 engineering, product architecture, and full-stack development.",
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
