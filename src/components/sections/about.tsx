"use client";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/animations";

const paragraphs = [
  {
    index: "01",
    text: "I write about Web3 infrastructure: multisig wallets, self-custody, and DAO tooling. Most posts start as a problem I hit while building, worked through until it is reproducible in a tutorial.",
  },
  {
    index: "02",
    text: "I build products end to end, from architecture to shipped code. Development is AI-assisted: agents handle the mechanical work while I own the architecture, the product decisions, and the review.",
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
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionTitle
              label="About"
              title="How I work."
              description="Short version. The long version is in the writing section."
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div>
              {paragraphs.map((p, i) => (
                <FadeIn key={p.index} from="left" delay={i * 0.08}>
                  <div className="flex gap-6 border-t py-8 first:border-t-0 first:pt-0">
                    <span className="whisper-label mt-1 shrink-0 text-muted-foreground/50">
                      {p.index}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-[1.75]">
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