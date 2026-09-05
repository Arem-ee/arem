"use client";

import type { LucideIcon } from "lucide-react";
import {
  Lightbulb,
  PencilRuler,
  Wrench,
  Rocket,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { cn } from "@/lib/utils";

interface Step {
  step: string;
  icon: LucideIcon;
  title: string;
  body: string;
  highlight?: boolean;
}

const steps: Step[] = [
  {
    step: "01",
    icon: Lightbulb,
    title: "Idea",
    body: "Every build starts as a problem I actually hit.",
  },
  {
    step: "02",
    icon: PencilRuler,
    title: "Plan it out",
    body: "I sketch the shape before writing code: the flow, the data, the parts to cut.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Build it",
    body: "I write the code and ship it, reviewing everything an AI tool touches before it goes live.",
    highlight: true,
  },
  {
    step: "04",
    icon: Rocket,
    title: "Ship",
    body: "Deployed, verified, documented. You get something that actually runs, not just a handoff.",
  },
];

function HowIWorkSection() {
  return (
    <section
      id="process"
      className="relative z-10 border-b bg-primary py-24 md:-mt-40 md:py-36"
    >
      <Container size="lg">
        <FadeIn from="left">
          <SectionTitle
            label="Process"
            title="How I work."
            description="From a problem to a shipped build, in four steps."
            tone="on-primary"
          />
        </FadeIn>

        <div className="relative mt-16 md:mt-20">
          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn
                  key={step.step}
                  from={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.06}
                  className={cn(step.highlight && "lg:-mt-8")}
                >
                  <div
                    className={cn(
                      "relative rounded-xl p-6",
                      step.highlight
                        ? "z-10 bg-[#0a0a0a] p-7 shadow-[0_18px_40px_rgba(10,10,10,0.22)] lg:scale-[1.06] dark:shadow-[0_0_44px_rgba(245,197,24,0.35)]"
                        : "border border-[#0a0a0a]/10 bg-[#0a0a0a]/5 shadow-[0_10px_24px_rgba(10,10,10,0.08)]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full",
                        step.highlight
                          ? "bg-white/10 text-primary"
                          : "bg-[#0a0a0a]/10 text-[#0a0a0a]",
                        "lg:mx-auto"
                      )}
                    >
                      <Icon
                        className="h-7 w-7"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className={cn(
                        "whisper-label mt-4 block lg:text-center",
                        step.highlight
                          ? "text-primary/60"
                          : "text-[#0a0a0a]/60"
                      )}
                    >
                      {step.step}
                    </span>
                    <h3
                      className={cn(
                        "mt-3 text-lg font-semibold tracking-tight lg:text-center",
                        step.highlight ? "text-primary" : "text-[#0a0a0a]"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-xs text-xs leading-[1.8] sm:text-[13px] lg:mx-auto lg:text-center",
                        step.highlight
                          ? "text-primary/80"
                          : "text-[#0a0a0a]/70"
                      )}
                    >
                      {step.body}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HowIWorkSection };