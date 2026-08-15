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
  numeral: string;
  span: string;
  offset: string;
  indent: string;
  padding: string;
  tilt?: string;
  from: "left" | "right";
}

const capabilities: Capability[] = [
  {
    icon: PenLine,
    title: "Technical Writing",
    line: "Tutorials and field notes that turn working code into something the next person can follow.",
    numeral: "01",
    span: "lg:col-span-5 lg:col-start-1",
    offset: "lg:mt-0",
    indent: "ml-0 w-full",
    padding: "p-7",
    from: "left",
  },
  {
    icon: AppWindow,
    title: "Web Applications",
    line: "End to end builds: schema, API, UI, auth, payments, and the deploy after.",
    numeral: "02",
    span: "lg:col-span-5 lg:col-start-7",
    offset: "lg:mt-24",
    indent: "ml-10 w-[calc(100%-2.5rem)]",
    padding: "p-8",
    tilt: "-rotate-[0.5deg]",
    from: "right",
  },
  {
    icon: Compass,
    title: "Product Strategy",
    line: "Scoping and sequencing, the decisions that decide what ships this week instead of next.",
    numeral: "03",
    span: "lg:col-span-4 lg:col-start-1",
    offset: "lg:mt-14",
    indent: "mr-10 w-[calc(100%-2.5rem)] self-end",
    padding: "p-6",
    from: "left",
  },
  {
    icon: Layers,
    title: "Web3 Infrastructure",
    line: "Multisig, self-custody, and DAO tooling, explained and deployed in the same breath.",
    numeral: "04",
    span: "lg:col-span-5 lg:col-start-7",
    offset: "lg:mt-10",
    indent: "ml-6 w-[calc(100%-1.5rem)]",
    padding: "p-8",
    tilt: "rotate-[0.4deg]",
    from: "right",
  },
  {
    icon: Component,
    title: "UI Systems",
    line: "Interfaces and design systems built to stay consistent as the product keeps growing.",
    numeral: "05",
    span: "lg:col-span-5 lg:col-start-1",
    offset: "lg:mt-16",
    indent: "mr-14 w-[calc(100%-3.5rem)] self-end",
    padding: "p-6",
    from: "left",
  },
  {
    icon: Workflow,
    title: "API Integrations",
    line: "Third-party services stitched in cleanly: payments, auth, data, and the edge cases between.",
    numeral: "06",
    span: "lg:col-span-4 lg:col-start-7",
    offset: "lg:mt-12",
    indent: "ml-12 w-[calc(100%-3rem)]",
    padding: "p-7",
    from: "right",
  },
];

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="border-b py-24 md:py-40">
      <Container size="xl">
        <SectionTitle
          label="Capabilities"
          title="Arem can help you with."
          description="Six lanes of work, each with a track record behind it. If it is on this list, it is something I have done for someone or for the record."
          folio="05"
          className="mb-16 md:mb-24"
        />

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <FadeIn
                key={cap.title}
                from={cap.from}
                className={cn(cap.indent, cap.span, cap.offset)}
              >
                <div
                  className={cn(
                    "group h-full rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(26,23,19,0.04)] transition-transform duration-300 hover:-translate-y-0.5",
                    "hover:shadow-[0_18px_45px_-22px_rgba(199,149,42,0.4)]",
                    cap.padding,
                    cap.tilt && `lg:${cap.tilt}`
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="whisper-label text-muted-foreground/40">
                      {cap.numeral}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-medium tracking-[-0.01em] text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.75] text-muted-foreground">
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