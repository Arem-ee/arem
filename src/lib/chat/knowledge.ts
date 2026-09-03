export interface QAPair {
  id: string;
  questions: string[];
  answer: string;
}

export const greeting =
  "Hi, I'm Arem. Ask me anything about me, my projects, or my writing.";

export const fallbackAnswer =
  "I don't have an answer set up for that yet, but you can reach me directly through the contact form or by email at toromadeadesina@gmail.com.";

export const suggestedQuestions = [
  "What do you build?",
  "What are you studying?",
  "What is Propeida?",
  "How can I reach you?",
];

export const qaPairs: QAPair[] = [
  {
    id: "intro",
    questions: [
      "who are you",
      "tell me about yourself",
      "introduce yourself",
      "who is Arem",
      "what is this site about",
    ],
    answer:
      "I'm Arem, short for Toromade Abdulrahman. I'm a fullstack developer and AI engineer, and an electrical engineering student at the University of Ilorin. I build products end to end, from architecture to shipped code, and I also write about self-custody and DAO tooling.",
  },
  {
    id: "build",
    questions: [
      "what do you build",
      "what do you make",
      "what kind of stuff do you make",
      "what kind of things do you create",
      "what do you work on",
      "what are your projects",
    ],
    answer:
      "Mostly web products end to end: schema, API, UI, auth, payments, then the deploy. Lately that has been an exam prep platform, a privacy dApp, a client site with a 3D car configurator, and plain business landing pages.",
  },
  {
    id: "education",
    questions: [
      "what do you study",
      "what are you studying",
      "what's your degree",
      "where do you go to school",
      "tell me about your education",
      "which university",
      "what course are you doing",
    ],
    answer:
      "B.Eng Electrical Engineering at the University of Ilorin, started in 2023. Alongside that I've been teaching myself software engineering since 2022: fullstack engineering, product architecture, and AI-assisted development.",
  },
  {
    id: "propeida",
    questions: [
      "what is Propeida",
      "tell me about Propeida",
      "the exam prep platform",
      "what was PrepIQ",
    ],
    answer:
      "Propeida is my exam prep platform, rebranded from PrepIQ. Practice questions, per-exam leaderboards, referral tracking, and admin question management. UNILORIN Post-UTME is the first supported exam, and it's live at propeida.online.",
  },
  {
    id: "redact",
    questions: [
      "what is Redact",
      "tell me about Redact",
      "the privacy app",
      "the Monad hackathon project",
    ],
    answer:
      "Redact was a hackathon build: a non-custodial stablecoin privacy app on Monad, with a ZK privacy layer for private balance management and a client-side duress mode. It didn't win because an SDK version mismatch blocked the deposit flow, but I documented that honestly in the submission instead of hiding it.",
  },
  {
    id: "auditon",
    questions: [
      "what is Auditon",
      "tell me about Auditon",
      "the compliance platform",
    ],
    answer:
      "Auditon is a B2B SOC 2 compliance orchestration platform I built Go-first, with tenant-aware architecture and enterprise pricing tiers. It's postponed pending equipment funding, not dead.",
  },
  {
    id: "stylearem",
    questions: [
      "what is StyleArem",
      "tell me about StyleArem",
      "the fashion site",
      "the menswear project",
    ],
    answer:
      "StyleArem is a men's fashion e-commerce landing page: collections by lifestyle, product quick view, and a bag drawer with promo codes. It's live at stylearem.vercel.app.",
  },
  {
    id: "aletheia",
    questions: [
      "what is Aletheia",
      "tell me about Aletheia",
      "what is that research studio",
      "the digital growth studio",
    ],
    answer:
      "Aletheia is a digital growth research studio, Greek for truth. It runs a four-phase process across seven investigation areas and delivers a structured assessment brief instead of generic advice. It's live at aletheia-phi-rouge.vercel.app.",
  },
  {
    id: "mobilelp",
    questions: [
      "what is the mobile landing page",
      "tell me about the landing page design",
      "the Figma prototype",
    ],
    answer:
      "A conversion-focused mobile landing page designed and prototyped in Figma: clear hierarchy, persuasive flow, clickable end to end. Shipped as a design prototype.",
  },
  {
    id: "process",
    questions: [
      "how do you work",
      "what is your process",
      "how does a project start",
      "describe your workflow",
    ],
    answer:
      "Four steps: idea, plan it out, build it, ship. Every build starts as a problem I actually hit. I sketch the shape before writing code: the flow, the data, the parts to cut. Nothing counts as done until someone else can run it.",
  },
  {
    id: "ai",
    questions: [
      "how do you use AI",
      "do you use AI tools",
      "what do you think about AI coding tools",
      "does AI write your code",
    ],
    answer:
      "Some of the mechanical work goes to AI tools. I review everything they touch before it goes live. The judgment stays mine; the tools just move faster through the boring parts.",
  },
  {
    id: "writing",
    questions: [
      "where can I read your writing",
      "do you have a blog",
      "what do you write about",
      "any articles",
    ],
    answer:
      "On this site under Writing. Recent pieces: how multisig wallets actually work, self-custody keys seeds and derivation paths, a DAO treasury stack with multisig timelock and Snapshot, and how to verify a wallet is non-custodial before you trust it.",
  },
  {
    id: "contact",
    questions: [
      "how can I reach you",
      "how do I contact you",
      "what's your email",
      "are you available for work",
      "can I hire you",
      "do you do freelance work",
      "how long do replies take",
    ],
    answer:
      "Email is the reliable channel: toromadeadesina@gmail.com. X works too if you're already there (@Arem_ee). There's also a contact form right here on the site. Based in Nigeria, replies within a day or two.",
  },
  {
    id: "services",
    questions: [
      "what services do you offer",
      "what can you help me with",
      "what do you do for clients",
    ],
    answer:
      "Six lanes: technical writing, end-to-end web applications, product strategy, web3 infrastructure, UI systems, and API integrations. Each one has a track record behind it.",
  },
  {
    id: "focus",
    questions: [
      "what are you focused on now",
      "what are you working on currently",
      "current focus",
      "what's next for you",
    ],
    answer:
      "Propeida is the main thing right now: getting more exams onto the platform after launching UNILORIN Post-UTME. The writing continues alongside it.",
  },
  {
    id: "eee-to-code",
    questions: [
      "why software after electrical engineering",
      "how did you get into code",
      "how does engineering connect to programming",
    ],
    answer:
      "Circuits taught me that nothing fails without a reason, and the reason is usually findable. I carried that instinct into code and it hasn't let me down yet.",
  },
  {
    id: "web3",
    questions: [
      "what is your web3 experience",
      "do you work with crypto",
      "blockchain experience",
      "have you built smart contracts",
    ],
    answer:
      "Yes. I write about and build with self-custody tooling: multisig, Safe Protocol Kit, Snapshot, DAO treasury stacks. Redact was a ZK privacy dApp on Monad. Solidity and Ethers.js are part of my normal toolkit.",
  },
  {
    id: "skills",
    questions: [
      "what's your tech stack",
      "what languages do you know",
      "which frameworks do you use",
      "what skills do you have",
    ],
    answer:
      "TypeScript, JavaScript, Go, Solidity, and SQL on the language side. React, Next.js, Tailwind, Three.js, and Framer Motion on the frontend. Node, PostgreSQL, Supabase, and Cloud Run behind. Ethers.js and Wagmi for web3.",
  },
  {
    id: "proud",
    questions: [
      "which project are you most proud of",
      "favorite project",
      "best thing you've built",
    ],
    answer:
      "Propeida. It started as my own problem: exam candidates with no reliable practice ground. Now it's a real product with accounts, payments, and leaderboards, live for UNILORIN Post-UTME candidates.",
  },
  {
    id: "beyond",
    questions: [
      "what do you do outside code",
      "anything personal",
      "your hobbies",
      "what music do you listen to",
    ],
    answer:
      "There's a whole Beyond Code page for that: football, Iron Man movies, afrobeats, books, games. Role models and favourites that keep the balance.",
  },
];