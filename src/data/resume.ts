import type { ResumeData } from "@/types";

export const resumeData: ResumeData = {
  summary:
    "Founder and full-stack developer building products end-to-end. As CEO of Propeida, a computer-based testing platform, I own everything from architecture to execution. I also work freelance, shipping production-grade web products — from Web3 dApps to business websites — with a focus on performance, clean architecture, and design quality.",
  experience: [
    {
      company: "Propeida",
      location: "Remote",
      role: "CEO & Founder",
      period: "2025 \u2014 Present",
      achievements: [
        "Founded Propeida, a computer-based testing (CBT) platform built for exam reliability at scale",
        "Architected and built the full-stack platform — authoring tools, proctoring flows, and real-time result scoring",
        "Designed the platform around reliability and fairness — automatic grading, instant results, and audit trails for every session",
        "Led product strategy, UI/UX, infrastructure, and go-to-market from zero to launch as a solo engineer",
      ],
    },
    {
      company: "Self-employed",
      location: "Remote",
      role: "Freelance Full-Stack Developer",
      period: "2024 \u2014 Present",
      achievements: [
        "Built Redact, a non-custodial on-chain privacy dApp on Monad with encrypted balance hiding and verified smart contracts",
        "Designed and developed ERGO Automotive's brand experience — interactive configurator and multi-model showcase",
        "Shipped client landing pages focused on conversion, including Aremco Heating, Cooling & Construction's business site",
        "Delivered 20+ projects across landing pages, e-commerce, and Web3 — consistently hitting 90+ Lighthouse scores",
      ],
    },
    {
      company: "Self-employed",
      location: "Remote",
      role: "Freelance Web Developer",
      period: "2024",
      achievements: [
        "Converted Figma designs into pixel-perfect, responsive Next.js and Tailwind CSS implementations",
        "Built fast, mobile-first landing pages for small businesses establishing an online presence",
        "Developed a repeatable client workflow — discovery, design review, build, and handoff",
      ],
    },
  ],
  education: [
    {
      degree: "B.Eng. Electrical Engineering",
      school: "University of Ilorin",
      period: "3 yrs",
    },
    {
      degree: "Self-Taught Software Engineer",
      school: "Independent study",
      period: "2024 \u2014 Present",
      details: "Focused on frontend engineering, system design, and full-stack development.",
    },
  ],
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "Rust", "Go", "SQL", "HTML/CSS"] },
    { category: "Frontend", items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion", "Storybook", "Radix UI"] },
    { category: "Backend", items: ["Node.js", "Express", "Fastify", "PostgreSQL", "Redis", "GraphQL", "WebSockets", "Kafka"] },
    { category: "Infrastructure", items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Turbopack", "Webpack"] },
    { category: "Leadership", items: ["Technical Strategy", "Mentorship", "Architecture Reviews", "Cross-team Collaboration", "Hiring"] },
  ],
  certifications: [
    "AWS Solutions Architect — Professional",
    "Google Cloud Professional Cloud Architect",
    "Certified Kubernetes Administrator (CKA)",
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Professional Working" },
    { language: "German", proficiency: "Conversational" },
  ],
};
