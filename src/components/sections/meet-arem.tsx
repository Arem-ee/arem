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

const shapeRadius = "56% 44% 50% 50% / 50% 56% 44% 50%";

function MeetAremSection() {
  return (
    <section id="meet" className="border-b py-24 md:py-48">
      <Container size="xl">
        <div className="grid gap-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:col-start-1">
            <FadeIn from="left">
              <div className="relative mx-auto max-w-sm lg:max-w-none lg:-mt-48">
                <div className="relative aspect-[4/5]">
                  <div
                    className="absolute -inset-6 bg-primary lg:-inset-8"
                    style={{ borderRadius: shapeRadius }}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl">
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
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 lg:col-start-7">
            <SectionTitle
              label="Meet Arem"
              title={
                <>
                  An engineering student who{" "}
                  <span className="bg-primary px-1 text-[#0a0a0a]">
                    builds
                  </span>{" "}
                  and writes.
                </>
              }
              description="Not a biography. The route from circuits to products, and why the writing came with it."
              className="mb-14"
            />
            <div className="space-y-8">
              {paragraphs.map((text, i) => (
                <FadeIn key={i} from="left" delay={0.1 + i * 0.06}>
                  <p className="max-w-lg text-xs leading-[1.8] text-muted-foreground sm:text-[13px]">
                    {text}
                  </p>
                </FadeIn>
              ))}
            </div>
            <FadeIn from="left" delay={0.3}>
              <p className="mt-16 text-base font-semibold tracking-tight text-foreground">
                Arem
              </p>
              <p className="whisper-label mt-2">Toromade Abdulrahman</p>
              <p className="whisper-label mt-1">Writer and builder</p>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { MeetAremSection };