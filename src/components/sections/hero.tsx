"use client";

import * as React from "react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/animations";
import { socialLinks } from "@/constants";
import { GitHubIcon, TwitterIcon } from "@/lib/icons";
import { Mail } from "lucide-react";

function useIsDesktop(query = "(min-width: 768px)") {
  const getSnapshot = React.useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );
  const getServerSnapshot = React.useCallback(() => false, []);

  return React.useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    getSnapshot,
    getServerSnapshot
  );
}

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
  const isDesktop = useIsDesktop();
  const heroSrc = isDesktop
    ? "/images/projects/landscape-hero-image.png"
    : "/images/profile-hero.png";

  return (
    <section id="hero" className="relative border-b">
      <Container size="xl">
        <div className="grid items-center gap-12 py-20 md:py-32 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <FadeIn>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              University of Ilorin - Electrical Engineering
            </p>
            <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Arem
            </h1>
            <p className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl">
              Web3 technical writer and builder.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              I write about self-custody and DAO tooling, and I build products
              end to end, from architecture to shipped code.
            </p>

            <ul className="mt-8 space-y-2">
              {heroLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="group inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="w-16 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                      {link.label}
                    </span>
                    <span className="inline-flex items-center gap-2 underline decoration-border underline-offset-4 transition-colors group-hover:decoration-primary">
                      {link.icon}
                      {link.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              className={`relative overflow-hidden rounded-xl border bg-card ${
                isDesktop ? "aspect-[3/2]" : "aspect-[4/5]"
              }`}
            >
              <Image
                key={heroSrc}
                src={heroSrc}
                alt="Arem"
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
