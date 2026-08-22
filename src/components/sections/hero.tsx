"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/animations";
import { AnnotationLine } from "@/components/annotation-line";
import { socialLinks } from "@/constants";
import { GitHubIcon, TwitterIcon } from "@/lib/icons";

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

const pills = ["Solo builder", "Student, EEE", "Web3 + AI"];

function HeroSection() {
  return (
    <section id="hero" className="border-b">
      <Container size="lg">
        <div className="relative py-24 md:py-36">
          <AnnotationLine
            label="University of Ilorin, EEE"
            className="absolute left-0 top-20 hidden lg:flex"
          />

          <div className="relative z-10 mx-auto mb-16 h-72 w-60 md:absolute md:left-1/2 md:top-[56px] md:mb-0 md:h-[200px] md:w-[300px] md:-translate-x-1/2">
            <Image
              src="/images/profile-hero.png"
              alt="Arem"
              fill
              priority
              quality={90}
              className="object-cover object-top"
              sizes="(max-width: 768px) 60vw, 300px"
            />
            <span
              className="pill-label absolute -top-3 right-8 hidden md:inline-flex"
              aria-hidden="true"
            >
              Solo builder
            </span>
            <span
              className="pill-label absolute -bottom-3 left-10 hidden md:inline-flex"
              aria-hidden="true"
            >
              Student, EEE
            </span>
            <span
              className="pill-label absolute -bottom-3 -right-4 hidden md:inline-flex"
              aria-hidden="true"
            >
              Web3 + AI
            </span>
          </div>

          <div className="relative z-0">
            <FadeIn from="left">
              <p className="whisper-label mb-6 md:hidden">
                University of Ilorin, EEE
              </p>
            </FadeIn>
            <FadeIn from="left" delay={0.08}>
              <h1 className="flex flex-col text-3xl font-semibold tracking-tight sm:text-4xl md:items-center md:text-5xl">
                <span className="md:mr-[calc(50%-18px)] md:self-end">
                  I&apos;m Arem,
                </span>
                <span className="md:mt-[240px]">a student who builds</span>
                <span>and writes about them.</span>
              </h1>
            </FadeIn>
            <FadeIn from="none" delay={0.16}>
              <p className="mt-6 max-w-md text-sm font-normal leading-snug text-muted-foreground sm:text-base md:mx-auto md:text-center">
                Web3 technical writer and builder.
              </p>
            </FadeIn>
            <FadeIn from="none" delay={0.24}>
              <p className="mt-5 max-w-md text-xs leading-[1.8] text-muted-foreground sm:text-[13px] md:mx-auto md:text-center">
                I write about self-custody and DAO tooling, and I build
                products end to end, from architecture to shipped code.
              </p>
            </FadeIn>

            <FadeIn from="left" delay={0.32}>
              <div className="mt-8 flex flex-wrap justify-center gap-2 md:hidden">
                {pills.map((pill) => (
                  <span key={pill} className="pill-label">
                    {pill}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn from="none" delay={0.36}>
              <div className="mt-10 md:flex md:justify-center">
                <Link
                  href="/#work"
                  className="inline-flex h-11 items-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  See my work
                </Link>
              </div>
            </FadeIn>

            <FadeIn from="none" delay={0.44}>
              <ul className="mt-12 flex flex-col items-center gap-3">
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
                      className="group inline-flex items-center gap-4 text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-[13px]"
                    >
                      <span className="w-14 shrink-0 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
                        {link.label}
                      </span>
                      <span className="inline-flex items-center gap-2 decoration-primary underline-offset-4 transition-colors group-hover:underline">
                        {link.icon}
                        {link.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };