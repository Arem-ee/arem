"use client";

import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";

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
                      className="object-cover [mask-image:linear-gradient(to_bottom,black_70%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_99%)]"
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
            <FadeIn from="left" delay={0.1}>
              <div className="overflow-hidden rounded-xl border bg-card shadow-[0_10px_24px_rgba(10,10,10,0.08)]">
                <div className="flex items-center gap-2 border-b px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
                  <span className="ml-2 rounded-md border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                    meet-arem.md
                  </span>
                </div>
                <div className="space-y-5 px-4 py-5 font-mono text-[13px] leading-[1.8] sm:px-5">
                  <div className="flex gap-4">
                    <span className="w-5 shrink-0 select-none text-right text-muted-foreground/40" aria-hidden="true">1</span>
                    <span className="text-muted-foreground/60">{"/**"}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-5 shrink-0 select-none text-right text-muted-foreground/40" aria-hidden="true">2</span>
                    <p className="text-foreground">
                      I came to software through electrical engineering. Circuits and signals taught me that nothing fails without a reason, and that the reason is usually findable. I carried that instinct into code, and it has not let me down since.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-5 shrink-0 select-none text-right text-muted-foreground/40" aria-hidden="true">3</span>
                    <p className="text-foreground">
                      The writing came from the building. Every time I worked a problem out to the end, I wrote the note, then tightened it into a <span className="font-semibold text-primary">tutorial</span>. The answer is the easy part. Keeping the reasoning is the work.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-5 shrink-0 select-none text-right text-muted-foreground/40" aria-hidden="true">4</span>
                    <p className="text-foreground">
                      <span className="font-semibold text-primary">Propeida</span> started as that same instinct pointed at my own situation: exam candidates with no reliable practice ground. It is now a product with accounts, payments, and leaderboards. I build the way I study, one layer at a time, checking the load at every step.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-5 shrink-0 select-none text-right text-muted-foreground/40" aria-hidden="true">5</span>
                    <span className="text-muted-foreground/60">{"*/"}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
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