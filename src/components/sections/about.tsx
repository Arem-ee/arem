"use client";

import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";
import { AnnotationLine } from "@/components/annotation-line";

const paragraphs = [
  {
    index: "01",
    text: "I'm a fullstack developer and AI engineer. I build products end to end, from architecture to shipped code, owning the product decisions and the review along the way.",
  },
  {
    index: "02",
    text: "I also write about Web3 infrastructure: multisig wallets, self-custody, and DAO tooling. Most posts start as a problem I hit while building, worked through until it is reproducible in a tutorial.",
  },
  {
    index: "03",
    text: "Current focus: Propeida's exam prep platform, and a series of tutorials on wallet infrastructure.",
  },
];

function AboutSection() {
  return (
    <section id="about" className="border-b py-24 md:py-36">
      <Container size="lg">
        <div className="grid gap-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionTitle
              label="About"
              title="About."
              description="Short version. The long version is in the writing section."
            />
            <FadeIn from="left" delay={0.15}>
              <div className="mt-14 flex items-center gap-6">
                <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src="/images/profile-hero.png"
                    alt="Arem, portrait"
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <AnnotationLine
                  label="B.Eng. EEE, UNILORIN"
                  align="right"
                  className="hidden lg:flex"
                />
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <div>
              {paragraphs.map((p, i) => (
                <FadeIn key={p.index} from="left" delay={i * 0.08}>
                  <div className="flex gap-6 border-t py-10 first:border-t-0 first:pt-0">
                    <span className="whisper-label mt-1.5 shrink-0 text-muted-foreground/40">
                      {p.index}
                    </span>
                    <p className="max-w-lg text-xs leading-[1.8] text-muted-foreground sm:text-[13px]">
                      {p.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { AboutSection };