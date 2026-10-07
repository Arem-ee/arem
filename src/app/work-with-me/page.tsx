"use client";

import Link from "next/link";
import { ArrowRight, Check, Zap, Clock } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { HoverLift } from "@/components/animations/hover-lift";

const tiers = [
  {
    id: "fractional",
    label: "Fractional CTO",
    description: "Embedded technical leadership for early-stage companies",
    price: "$8K–15K",
    period: "/month",
    commitment: "3–6 months minimum",
    hours: "10–20 hrs/week",
    idealFor: "Seed–Series A startups (0–10 engineers) needing architecture, hiring, and scaling guidance",
    includes: [
      "Weekly 1:1 with founder/leadership",
      "Architecture reviews & technical roadmap",
      "Code review & PR standards",
      "Hiring: sourcing, interviews, onboarding",
      "Vendor evaluation & build-vs-buy decisions",
      "Board/investor technical updates",
      "Incident response & on-call rotation",
    ],
    outcomes: [
      "47% faster release cycles (avg)",
      "30–50% hiring cost reduction",
      "60–80% deployment time improvement",
    ],
    cta: "Start with Audit",
    ctaHref: "/contact?type=fractional",
    featured: true,
  },
  {
    id: "project",
    label: "Project Engagement",
    description: "Fixed-scope delivery for defined product builds",
    price: "$15K–50K",
    period: "/project",
    commitment: "4–12 weeks",
    hours: "Full-time equivalent",
    idealFor: "EdTech platforms, clinic sites, storefronts, mobile landing pages — end-to-end delivery",
    includes: [
      "Discovery & architecture (Week 1)",
      "Design system & component library",
      "Full-stack implementation",
      "Testing, CI/CD, deployment",
      "Handoff docs & 30-day support",
    ],
    outcomes: [
      "Propeida: 250 users launch week, 87% retention",
      "StyleArem: Lighthouse 98, 40+ products",
      "OralCare: 3x booking inquiries",
    ],
    cta: "Scope a Project",
    ctaHref: "/contact?type=project",
    featured: false,
  },
  {
    id: "advisory",
    label: "Technical Advisory",
    description: "Strategic guidance without daily execution",
    price: "$3K–5K",
    period: "/month",
    commitment: "Month-to-month",
    hours: "4–8 hrs/month",
    idealFor: "Founders needing architecture validation, tech due diligence, or scaling strategy",
    includes: [
      "Monthly 90-min strategy session",
      "Async Slack/email access",
      "Architecture review (quarterly)",
      "Hiring plan & interview support",
      "Vendor/tech stack recommendations",
    ],
    outcomes: [
      "Prevent $50K–200K architecture mistakes",
      "Faster technical due diligence",
      "Clear build-vs-buy decisions",
    ],
    cta: "Book Advisory Call",
    ctaHref: "/contact?type=advisory",
    featured: false,
  },
];

const faqs = [
  {
    q: "Do you work with non-technical founders?",
    a: "Yes. Most of my clients are non-technical founders. I translate technical decisions into business outcomes and handle the engineering end-to-end.",
  },
  {
    q: "What's your typical engagement length?",
    a: "Fractional: 3–6 months minimum. Project: 4–12 weeks. Advisory: month-to-month. Most clients extend.",
  },
  {
    q: "Do you only work with EdTech/HealthTech?",
    a: "Those are my deepest domains, but the patterns (user trust, regulated workflows, conversion funnels) transfer. I've shipped fintech, Web3, and e-commerce too.",
  },
  {
    q: "How do we start?",
    a: "Book a 30-min discovery call. If there's fit, I run a paid 1-week audit ($3K) — architecture, codebase, team, roadmap. That audit becomes the engagement scope.",
  },
];

export default function WorkWithMePage() {
  return (
    <>
      <section id="work-with-me" className="border-b py-24 md:py-36">
        <Container size="xl">
          <SectionTitle
            label="Work with me"
            title="Three ways to engage."
            description="Pick the model that fits your stage. All include a paid audit first — so we both know the scope before committing."
            className="mb-16 md:mb-24"
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <FadeIn key={tier.id} from="bottom" delay={tiers.indexOf(tier) * 0.1}>
                <HoverLift lift={-8} scale={1.015}>
                  <article
                    className={`relative flex flex-col h-full rounded-2xl border bg-card p-8 transition-all duration-300 ${
                      tier.featured
                        ? "border-primary/50 shadow-[0_0_0_1px]_theme(colors.primary) dark:shadow-[0_0_0_1px]_theme(colors.primary)"
                        : ""
                    }`}
                  >
                    {tier.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        Most Popular
                      </span>
                    )}

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">{tier.label}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                    </div>

                    <div className="mb-6 space-y-3 text-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                        <span className="text-muted-foreground">{tier.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        <span>{tier.commitment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Zap className="h-4 w-4" aria-hidden="true" />
                        <span>{tier.hours}</span>
                      </div>
                    </div>

                    <div className="mb-6 p-4 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium text-foreground">Ideal for: </p>
                      <p className="mt-1 text-sm text-muted-foreground">{tier.idealFor}</p>
                    </div>

                    <div className="mb-6 flex-1">
                      <h4 className="whisper-label mb-3">What&apos;s included</h4>
                      <ul className="space-y-2 text-sm">
                        {tier.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 pt-4 border-t">
                      <h4 className="whisper-label mb-3">Typical outcomes</h4>
                      <ul className="space-y-2 text-sm">
                        {tier.outcomes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <ArrowRight className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={tier.ctaHref}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                        tier.featured
                          ? "bg-primary text-primary-foreground hover:opacity-90"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                    >
                      {tier.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                </HoverLift>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b py-24 md:py-36">
        <Container size="md">
          <SectionTitle
            label="FAQ"
            title="Common questions."
            className="mb-16"
          />

          <div className="space-y-4 max-w-2xl">
            {faqs.map((faq, i) => (
              <FadeIn key={i} from="bottom" delay={i * 0.05}>
                <details className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary/50">
                  <summary className="flex items-center gap-3 font-medium text-foreground cursor-pointer list-none">
                    <span>{faq.q}</span>
                    <ArrowRight
                      className="ml-auto h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="mt-4 pt-4 border-t text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container size="md">
          <div className="text-center">
            <FadeIn from="none">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                Ready to start?
              </h2>
            </FadeIn>
            <FadeIn from="bottom" delay={0.1}>
              <p className="mt-4 max-w-xl mx-auto text-muted-foreground leading-relaxed">
                Book a 30-min discovery call. No pitch — just figure out if there&apos;s fit.
              </p>
            </FadeIn>
            <FadeIn from="bottom" delay={0.2}>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a Call
                </Link>
                <Link
                  href="mailto:hello@arem.dev"
                  className="inline-flex h-11 items-center justify-center rounded-full border bg-transparent px-7 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Email Instead
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}