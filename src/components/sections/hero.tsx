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

const pills = ["Solo builder", "Student, EEE", "Fullstack + AI"];

function HeroSection() {
  return (
    <section id="hero" className="border-b">
      <Container size="lg">
        <div className="relative py-24 md:py-36">
          <AnnotationLine
            label="University of Ilorin, EEE"
            className="absolute left-0 top-0 hidden -translate-y-full lg:flex"
          />
          <AnnotationLine
            label="Available for freelance work"
            align="right"
            className="absolute right-0 top-0 hidden -translate-y-full lg:flex"
          />
          <div className="mb-6 flex justify-center lg:hidden">
            <AnnotationLine label="Available for freelance work" className="flex" />
          </div>

          <FadeIn from="none">
            <h1 className="flex flex-col text-center text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl xl:mr-[540px]">
              <span>I&apos;m Arem, a fullstack</span>
              <span>developer and AI engineer.</span>
            </h1>
          </FadeIn>

          <div className="relative z-10 mx-auto mt-10 h-[300px] w-[240px] md:mt-12 md:h-[347px] md:w-[300px] xl:absolute xl:left-1/2 xl:top-[31px] xl:mx-0 xl:mt-0 xl:h-[416px] xl:w-[360px] xl:translate-x-[calc(-50%+44px)]">
            <Image
              src="/images/profile-hero.png"
              alt="Arem"
              fill
              priority
              quality={90}
              className="object-cover object-top"
              sizes="(max-width: 768px) 60vw, 360px"
            />
          </div>

          <FadeIn from="none">
            <p className="mx-auto mt-8 max-w-md text-center text-sm font-normal leading-snug text-muted-foreground sm:text-base md:mt-12 xl:mt-[290px]">
              Fullstack developer and AI engineer.
            </p>
          </FadeIn>
          <FadeIn from="none">
            <p className="mx-auto mt-5 max-w-md text-center text-xs leading-[1.8] text-muted-foreground sm:text-[13px]">
              I build products end to end, from architecture to shipped code. I
              also write about self-custody and DAO tooling.
            </p>
          </FadeIn>

          <FadeIn from="none">
            <div className="mt-10 flex justify-center">
              <Link
                href="/#work"
                className="inline-flex h-11 items-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                See my work
              </Link>
            </div>
          </FadeIn>

          <FadeIn from="none">
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {pills.map((pill) => (
                <span key={pill} className="pill-label">
                  {pill}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn from="none">
            <ul className="mt-12 flex flex-col items-center gap-3">
              {heroLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={
                      link.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
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
      </Container>
    </section>
  );
}

export { HeroSection };