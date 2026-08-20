"use client";

import { Lightbulb, Brain, Terminal, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { cn } from "@/lib/utils";

interface Step {
  icon: LucideIcon;
  step: string;
  title: string;
  body: string;
  highlight?: boolean;
}

const steps: Step[] = [
  {
    icon: Lightbulb,
    step: "Step 01",
    title: "Idea",
    body: "Every build starts as a problem I actually hit. If it hurts enough to fix, it is worth a product.",
  },
  {
    icon: Brain,
    step: "Step 02",
    title: "Claude",
    body: "Claude handles the mechanical work: scaffolding and boilerplate. The architecture and the decisions stay with me.",
    highlight: true,
  },
  {
    icon: Terminal,
    step: "Step 03",
    title: "Coding agent",
    body: "The agent edits the repo directly, runs the tests, and fixes what breaks. I review every change before it lands.",
  },
  {
    icon: Rocket,
    step: "Step 04",
    title: "Shipped",
    body: "Deployed, verified, and documented. A build is not done until someone else can run it.",
  },
];

function HowIWorkSection() {
  return (
    <section id="process" className="border-b py-24 md:py-36">
      <Container size="lg">
        <FadeIn from="left">
          <SectionTitle
            label="Process"
            title="How I work."
            description="From a problem to a shipped build, in four steps."
          />
        </FadeIn>

        <div className="relative mt-16">
          <div
            className="absolute inset-x-0 top-8 hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn
                  key={step.step}
                  from={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.06}
                >
                  <div className="relative">
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full border",
                        step.highlight
                          ? "border-transparent bg-foreground"
                          : "border-border bg-card"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-6 w-6",
                          step.highlight
                            ? "text-primary"
                            : "text-foreground"
                        )}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="whisper-label mt-7 block">
                      {step.step}
                    </span>
                    <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-xs leading-[1.8] text-muted-foreground sm:text-[13px]">
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