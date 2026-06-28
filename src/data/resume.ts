import type { ResumeData } from "@/types";

export const resumeData: ResumeData = {
  summary:
    "Senior Software Engineer with 12+ years of experience architecting and building high-performance web applications at scale. I've led major initiatives at Pageon, Canvo, Roamly, and Nexlayer — spanning payment systems, real-time collaboration engines, design systems, and developer tooling. Passionate about system design, performance, accessibility, and growing great engineering teams.",
  experience: [
    {
      company: "Nexlayer",
      location: "Remote",
      role: "Senior Software Engineer",
      period: "2025 \u2014 Present",
      achievements: [
        "Reduced Next.js cold-start build times by 43% through incremental caching redesign adopted by the core framework",
        "Led design and rollout of the Turbopack integration layer serving 500K+ weekly active developers",
        "Architected the template system used by 50K+ new projects every month, reducing time-to-deploy by 65%",
        "Established cross-team performance budgets that reduced median page load times by 28% across the platform",
        "Mentored 4 engineers through the senior promotion track, 2 promoted within 12 months",
      ],
    },
    {
      company: "Pageon",
      location: "Remote",
      role: "Lead Frontend Engineer",
      period: "2024 \u2014 2025",
      achievements: [
        "Redesigned the checkout flow achieving a 42% reduction in abandonment rate across 35+ countries",
        "Shipped Pageon Elements v2 with micro-frontend architecture, reducing integration time for merchants by 60%",
        "Built the accessibility framework that lifted Pageon Checkout's WCAG score from 68 to 97",
        "Scaled real-time payment confirmation rendering to handle 15K+ transactions per second during peak events",
        "Managed and mentored a team of 6 frontend engineers, conducting regular 1:1s and career growth planning",
      ],
    },
    {
      company: "Canvo",
      location: "Remote",
      role: "Full Stack Engineer",
      period: "2024",
      achievements: [
        "Designed and built the Plugins API v1 from scratch, enabling 800+ community plugins within the first year",
        "Implemented real-time collaboration sync layer using CRDTs, supporting 10K+ concurrent users per file",
        "Reduced plugin review cycle from 2 weeks to 24 hours through automated testing infrastructure",
        "Grew plugin adoption to 40% of monthly active users within 6 months of launch",
      ],
    },
    {
      company: "Roamly",
      location: "Remote",
      role: "Frontend Engineer",
      period: "2024",
      achievements: [
        "Architected and shipped the core DLS component library used by 200+ engineers across 12 product teams",
        "Reduced UI development time by 55% through reusable component patterns and comprehensive Storybook documentation",
        "Led the migration from legacy LESS to CSS-in-JS, reducing style bugs by 70%",
        "Established accessibility guidelines that raised product-wide a11y compliance from 52% to 89%",
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
