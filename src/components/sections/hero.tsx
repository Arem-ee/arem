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

const shapeRadius = "56% 44% 50% 50% / 50% 56% 44% 50%";

function HeroSection() {
  return (
    <section id="hero" className="border-b">
      <Container size="lg">
        <div className="relative py-24 md:py-36">
          <AnnotationLine
            label="University of Ilorin, EEE"
            className="absolute left-0 top-20 hidden lg:flex"
          />

          <div
            className="relative mx-auto mb-16 h-72 w-60 bg-primary md:absolute md:left-1/2 md:top-0 md:z-10 md:mb-0 md:h-[420px] md:w-[320px] md:-translate-x-1/2"
            style={{ borderRadius: shapeRadius }}
          >
            <div
              className="absolute inset-1.5 overflow-hidden"
              style={{ borderRadius: shapeRadius }}
            >
              <Image
                src="/images/profile-hero.png"
                alt="Arem"
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 320px"
              />
            </div>
          </div>

          <span
            className="pill-label absolute left-0 top-[45%] hidden lg:inline-flex"
            aria-hidden="true"
          >
            Solo builder
          </span>
          <span
            className="pill-label absolute right-0 top-[30%] hidden lg:inline-flex"
            aria-hidden="true"
          >
            Student, EEE
          </span>
          <span
            className="pill-label absolute right-0 bottom-[22%] hidden lg:inline-flex"
            aria-hidden="true"
          >
            Web3 + AI
          </span>

          <div className="relative md:pt-44">
            <FadeIn from="left">
              <p className="whisper-label mb-6 md:hidden">
                University of Ilorin, EEE
              </p>
            </FadeIn>
            <FadeIn from="left" delay={0.08}>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Hi, I&apos;m Arem (Toromade Abdulrahman), a student.
              </h1>
            </FadeIn>
            <FadeIn from="left" delay={0.16}>
              <p className="mt-6 max-w-md text-sm font-normal leading-snug text-muted-foreground sm:text-base">
                Web3 technical writer and builder.
              </p>
            </FadeIn>
            <FadeIn from="left" delay={0.24}>
              <p className="mt-5 max-w-md text-xs leading-[1.8] text-muted-foreground sm:text-[13px]">
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

            <FadeIn from="left" delay={0.36}>
              <div className="mt-10">
                <Link
                  href="/#work"
                  className="inline-flex h-11 items-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  See my work
                </Link>
              </div>
            </FadeIn>

            <FadeIn from="left" delay={0.44}>
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