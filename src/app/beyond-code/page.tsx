import * as React from "react";

import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/layout/page-layout";
import { BeyondCodeSection } from "@/components/sections/beyond-code";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Beyond the code",
  description:
    "The role models, the playlists, and the hours off the clock that keep the balance.",
  path: "/beyond-code",
});

export default function BeyondCodePage() {
  return (
    <PageLayout>
      <section className="border-b py-16 md:py-32">
        <Container size="md">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Off the clock
          </p>
          <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Beyond the code
          </h1>
          <p className="text-lg text-muted-foreground">
            A few role models and favourites that keep the balance - click a card to flip it.
          </p>
        </Container>
      </section>

      <BeyondCodeSection />
    </PageLayout>
  );
}