"use client";

import Link from "next/link";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/animations";

function ValueSection() {
  return (
    <section
      aria-label="What working with me gets you"
      className="border-b py-16 md:py-24"
    >
      <Container size="md">
        <FadeIn from="none">
          <p className="whisper-label text-muted-foreground/60">Why me</p>
          <p className="mt-6 max-w-2xl text-lg font-medium tracking-tight text-foreground sm:text-xl">
            I can take your business from an idea or a messy system to
            something that actually works and makes money.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            I have done it before. The projects and the words from real
            clients below are the proof, not promises.{" "}
            <Link
              href="/#work"
              className="font-medium text-foreground decoration-primary underline-offset-4 transition-colors hover:underline"
            >
              See the proof
            </Link>
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}

export { ValueSection };
