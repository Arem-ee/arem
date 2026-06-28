export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Are you currently available for new opportunities?",
    answer:
      "I'm currently open to senior individual contributor and staff engineer roles at companies building developer tools, design platforms, or products at scale. I'm especially interested in opportunities where I can work on platform architecture, developer experience, and performance.",
  },
  {
    question: "What's your preferred tech stack?",
    answer:
      "TypeScript is my default language for most projects. For frontend, I reach for React with Next.js, Tailwind CSS, and Framer Motion. For backend, Node.js with PostgreSQL and Redis. I'm also comfortable with Go and Rust for performance-critical systems. But I believe the right stack depends on the problem — I've shipped production code in Python, Ruby, and Swift when the context demanded it.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. I've worked remotely for most of my career and have strong async communication practices. I'm also open to hybrid arrangements if the team is in the San Francisco Bay Area. I believe remote work, when done well with good documentation and async-first culture, can be more productive than in-office work for deep technical tasks.",
  },
  {
    question: "Do you take freelance or consulting projects?",
    answer:
      "I occasionally take on selective consulting engagements — typically architecture reviews, performance audits, or design system setup. I prefer engagements where I can have meaningful impact in 2-4 weeks rather than ongoing maintenance work. If you have a specific project in mind, reach out and I'll be upfront about whether I'm a good fit.",
  },
  {
    question: "How do you approach mentorship?",
    answer:
      "Mentorship is one of the most rewarding parts of engineering. I focus on three areas: technical judgement (when to optimise, when to simplify), communication (writing design docs, giving technical talks), and career growth (navigating promotions, building a portfolio of impact). I've mentored 8 engineers through senior promotions and still keep in touch with most of them.",
  },
  {
    question: "What's your engineering philosophy?",
    answer:
      "Build the simplest thing that could possibly work — then make it fast. I believe in shipping early, iterating on real user feedback, and avoiding premature abstraction. Code is a liability, not an asset; every line you don't write is a line that can't break. That said, platform investments (CI/CD, monitoring, design systems) pay compounding returns and should be prioritised accordingly.",
  },
  {
    question: "What types of projects do you enjoy most?",
    answer:
      "I gravitate toward platform and infrastructure work — building the tools, APIs, and systems that enable other engineers to move faster. Design systems, developer tooling, build pipelines, and platform APIs are where I've had the most impact. I also enjoy performance optimisation work: taking a system from slow to fast through systematic measurement and targeted improvements.",
  },
  {
    question: "How do you stay current with technology?",
    answer:
      "I read deeply rather than broadly. Each quarter I pick one area to go deep on — last year it was Rust and CRDTs. I also learn by building: side projects, open-source contributions, and prototyping at work. Conference talks and technical papers (especially from the systems community) are my primary learning channels.",
  },
  {
    question: "What's your approach to code review?",
    answer:
      "Code review is about evaluating design and correctness, not style — that's what formatters and linters are for. I focus on whether the architecture is right, the edge cases are handled, and the abstractions justify themselves. I phrase feedback as questions rather than commands, and I always explain the why behind the what. My goal is to leave every PR better than I found it, whether that's through improved code or a better understanding shared between reviewer and author.",
  },
  {
    question: "What's an engineering mistake you've made that taught you the most?",
    answer:
      "Early in my career, I over-optimised a caching layer before we had production data to validate the design. We spent 3 months building a distributed cache that solved performance problems we didn't actually have — and introduced consistency bugs that we did have to fix. The lesson: measure first, then optimise. Your intuition about where the bottleneck is will be wrong more often than it's right.",
  },
];
