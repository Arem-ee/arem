"use client";

import Image from "next/image";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/animations";
import { socialLinks } from "@/constants";
import { GitHubIcon, TwitterIcon } from "@/lib/icons";
import { Mail } from "lucide-react";

const heroLinks = [
  {
    label: "X",
    value: "@Arem_ee",
    href: socialLinks.twitter,
    icon: <TwitterIcon className="h-4 w-4 shrink-0" aria-hidden="true" />,
  },
  {
    label: "GitHub",
    value: "Arem-ee",
    href: socialLinks.github,
    icon: <GitHubIcon className="h-4 w-4 shrink-0" aria-hidden="true" />,
  },
  {
    label: "Email",
    value: socialLinks.email,
    href: `mailto:${socialLinks.email}`,
    icon: <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />,
  },
];

function HeroSection() {
  return (
    <section id="hero" className="border-b">
      <Container size="xl">
        <div className="grid items-center gap-16 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 lg:col-start-1">
            <FadeIn from="left">
              <p className="whisper-label mb-8">
                University of Ilorin - Electrical Engineering
              </p>
            </FadeIn>
            <FadeIn from="left" delay={0.08}>
              <h1 className="font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl lg:leading-[1.05]">
                Arem
              </h1>
            </FadeIn>
            <FadeIn from="left" delay={0.16}>
              <p className="mt-6 max-w-md text-lg font-medium text-muted-foreground sm:text-xl">
                Web3 technical writer and builder.
              </p>
            </FadeIn>
            <FadeIn from="left" delay={0.24}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                I write about self-custody and DAO tooling, and I build
                products end to end, from architecture to shipped code.
              </p>
            </FadeIn>

            <FadeIn from="left" delay={0.32}>
              <ul className="mt-12 space-y-3">
                {heroLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      className="group inline-flex items-center gap-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="w-14 shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
                        {link.label}
                      </span>
                      <span className="inline-flex items-center gap-2 transition-colors group-hover:text-primary">
                        {link.icon}
                        {link.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <FadeIn from="right" delay={0.2}>
              <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                <div
                  className="absolute -inset-x-10 -top-12 bottom-4 rounded-[50%] bg-primary/25 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-border bg-card shadow-[0_24px_60px_-30px_rgba(26,23,19,0.18)]">
                  <Image
                    src="/images/profile-hero.png"
                    alt="Arem"
                    fill
                    priority
                    quality={90}
                    className="object-cover"
                    sizes="(max-width: 1024px) 60vw, 35vw"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };