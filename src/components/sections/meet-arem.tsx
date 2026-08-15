"use client";

import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";

const paragraphs = [
  "I came to software through electrical engineering. Circuits and signals taught me that nothing fails without a reason, and that the reason is usually findable. I carried that instinct into code, and it has not let me down since.",
  "The writing came from the building. Every time I worked a problem out to the end, I wrote the note, then tightened it into a tutorial. The answer is the easy part. Keeping the reasoning is the work.",
  "Propeida started as that same instinct pointed at my own situation: exam candidates with no reliable practice ground. It is now a product with accounts, payments, and leaderboards. I build the way I study, one layer at a time, checking the load at every step.",
];

function MeetAremSection() {
  return (
    <section id="meet" className="border-b py-24 md:py-44">
      <Container size="xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:col-start-1">
            <FadeIn from="left">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div
                  className="absolute -inset-x-10 -top-12 bottom-8 rounded-[50%] bg-primary/15 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-border bg-card">
                  <Image
                    src="/images/profile-hero.png"
                    alt="Arem, portrait"
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="(max-width: 1024px) 60vw, 35vw"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 lg:col-start-7">
            <SectionTitle
              label="Meet Arem"
              title="An engineering student who builds and writes."
              description="Not a biography. The route from circuits to products, and why the writing came with it."
              folio="04"
              className="mb-12"
            />
            <div className="space-y-7">
              {paragraphs.map((text, i) => (
                <FadeIn key={i} from="left" delay={0.1 + i * 0.06}>
                  <p className="max-w-lg text-sm leading-[1.8] text-muted-foreground sm:text-[15px]">
                    {text}
                  </p>
                </FadeIn>
              ))}
            </div>
            <FadeIn from="left" delay={0.3}>
              <p className="mt-14 font-display text-lg font-medium tracking-[-0.01em] text-foreground">
                Arem
              </p>
              <p className="whisper-label mt-1.5">Writer and builder</p>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { MeetAremSection };