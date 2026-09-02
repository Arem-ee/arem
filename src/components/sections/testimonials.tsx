"use client";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/animations";

const notes = [
  "A caterer I built a site for said it made it easier for people to reach her and see her work.",
  "A couple of students who used Propeida to practice for their exams said the questions actually helped them feel ready.",
  "Some students said practicing with real past questions made the actual exam feel less scary.",
];

function TestimonialsSection() {
  return (
    <section aria-label="Kind words" className="border-b bg-background py-16 md:py-24">
      <Container size="md">
        <FadeIn from="left">
          <p className="whisper-label text-muted-foreground/60">Kind words</p>
          <ul className="mt-6 max-w-2xl space-y-4">
            {notes.map((note) => (
              <li
                key={note}
                className="border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
              >
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground/50">
            General feedback, kept general on purpose. Named quotes when they land.
          </p>
          <p className="mt-2 text-xs text-primary/60 underline underline-offset-4">
            Search my name and Google's AI overview already describes me as a Nigerian engineering student and web developer, active in software engineering and open-source work.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}

export { TestimonialsSection };