"use client";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";

function AboutSection() {
  return (
    <section id="about" className="border-b py-16 md:py-32">
      <Container size="md">
        <SectionTitle
          label="About"
          title="How I work."
          description="Short version. The long version is in the writing section."
          className="mb-8 md:mb-12"
        />
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <FadeIn>
            <p>
              I write about Web3 infrastructure: multisig wallets,
              self-custody, and DAO tooling. Most posts start as a problem I
              hit while building, worked through until it is reproducible in a
              tutorial.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>
              I build products end to end, from architecture to shipped code.
              Development is AI-assisted: agents handle the mechanical work
              while I own the architecture, the product decisions, and the
              review.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p>
              Current focus: Propeida&apos;s exam prep platform, and a series of
              tutorials on wallet infrastructure.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export { AboutSection };
