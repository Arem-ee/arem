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
import { cn } from "@/lib/utils";

interface Capability {
  icon: LucideIcon;
  title: string;
  line: string;
  span: string;
  offset: string;
  indent: string;
  from: "left" | "right";
}

const capabilities: Capability[] = [
  {
    icon: PenLine,
    title: "Technical Writing",
    line: "Tutorials and field notes that turn working code into something the next person can follow.",
    span: "lg:col-span-5 lg:col-start-1",
    offset: "lg:mt-0",
    indent: "ml-0 w-full",
    from: "left",
  },
  {
    icon: AppWindow,
    title: "Web Applications",
    line: "End to end builds: schema, API, UI, auth, payments, and the deploy after.",
    span: "lg:col-span-6 lg:col-start-7",
    offset: "lg:mt-16",
    indent: "ml-10 w-[calc(100%-2.5rem)]",
    from: "right",
  },
  {
    icon: Compass,
    title: "Product Strategy",
    line: "Scoping and sequencing, the decisions that decide what ships this week instead of next.",
    span: "lg:col-span-4 lg:col-start-1",
    offset: "lg:mt-8",
    indent: "mr-10 w-[calc(100%-2.5rem)] self-end",
    from: "left",
  },
  {
    icon: Layers,
    title: "Web3 Infrastructure",
    line: "Multisig, self-custody, and DAO tooling, explained and deployed in the same breath.",
    span: "lg:col-span-5 lg:col-start-7",
    offset: "lg:mt-10",
    indent: "ml-12 w-[calc(100%-3rem)]",
    from: "right",
  },
  {
    icon: Component,
    title: "UI Systems",
    line: "Interfaces and design systems built to stay consistent as the product keeps growing.",
    span: "lg:col-span-5 lg:col-start-1",
    offset: "lg:mt-10",
    indent: "mr-14 w-[calc(100%-3.5rem)] self-end",
    from: "left",
  },
  {
    icon: Workflow,
    title: "API Integrations",
    line: "Third-party services stitched in cleanly: payments, auth, data, and the edge cases between.",
    span: "lg:col-span-4 lg:col-start-7",
    offset: "lg:mt-6",
    indent: "ml-8 w-[calc(100%-2rem)]",
    from: "right",
  },
];

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="border-b py-24 md:py-36">
      <Container size="xl">
        <SectionTitle
          label="Capabilities"
          title="Arem can help you with."
          description="Six lanes of work, each with a track record behind it. If it is on this list, it is something I have done for someone or for the record."
          className="mb-16 md:mb-20"
        />

        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <FadeIn
                key={cap.title}
                from={cap.from}
                delay={0.05}
                className={cn(cap.indent, cap.span, cap.offset)}
              >
                <div className="group h-full rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(26,23,19,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(216,162,46,0.35)]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-medium tracking-tight text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
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

export { CapabilitiesSection };