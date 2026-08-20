"use client";

import type { LucideIcon } from "lucide-react";
import {
  PenLine,
  AppWindow,
  Compass,
  Layers,
  Component,
  Workflow,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";

interface Capability {
  icon: LucideIcon;
  title: string;
  line: string;
}

const capabilities: Capability[] = [
  {
    icon: PenLine,
    title: "Technical Writing",
    line: "Tutorials and field notes that turn working code into something the next person can follow.",
  },
  {
    icon: AppWindow,
    title: "Web Applications",
    line: "End to end builds: schema, API, UI, auth, payments, and the deploy after.",
  },
  {
    icon: Compass,
    title: "Product Strategy",
    line: "Scoping and sequencing, the decisions that decide what ships this week instead of next.",
  },
  {
    icon: Layers,
    title: "Web3 Infrastructure",
    line: "Multisig, self-custody, and DAO tooling, explained and deployed in the same breath.",
  },
  {
    icon: Component,
    title: "UI Systems",
    line: "Interfaces and design systems built to stay consistent as the product keeps growing.",
  },
  {
    icon: Workflow,
    title: "API Integrations",
    line: "Third-party services stitched in cleanly: payments, auth, data, and the edge cases between.",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="border-b py-24 md:py-36">
      <Container size="lg">
        <SectionTitle
          label="Services"
          title="What I can help with."
          description="Six lanes of work, each with a track record behind it."
          className="mb-16 md:mb-24"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <FadeIn
                key={cap.title}
                from={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.05}
              >
                <div className="group h-full border bg-card p-7 transition-colors duration-300 hover:bg-foreground">
                  <Icon
                    className="h-5 w-5 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 text-base font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-background">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-xs leading-[1.8] text-muted-foreground transition-colors duration-300 group-hover:text-background/70 sm:text-[13px]">
                    {cap.line}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export { ServicesSection };