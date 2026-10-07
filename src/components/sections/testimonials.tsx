"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/animations";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <FadeIn from="bottom" delay={index * 0.1}>
      <article className="relative flex flex-col h-full rounded-2xl border bg-card p-8 transition-colors hover:border-primary/50">
        <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" aria-hidden="true" />
        <div className="relative z-10">
          <p className="text-base leading-relaxed text-foreground">&ldquo;{testimonial.review}&rdquo;</p>
          <div className="mt-6 flex items-center gap-4">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
                width={40}
                height={40}
              />
            ) : (
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-medium",
                  initials.length === 1 ? "text-xl" : "text-lg"
                )}
                aria-hidden="true"
              >
                {initials}
              </div>
            )}
            <div>
              <p className="font-medium text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <span className="font-semibold">{testimonial.metric}</span>
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

function TestimonialsSection() {
  return (
    <section aria-label="Testimonials" className="border-b bg-background py-16 md:py-24">
      <Container size="xl">
        <div className="mb-16 md:mb-24">
          <FadeIn from="left">
            <p className="whisper-label text-muted-foreground/60">Testimonials</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              What clients say.
            </h2>
          </FadeIn>
        </div>

        <FadeIn from="bottom">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
            ))}
          </div>
        </FadeIn>

        <FadeIn from="bottom" delay={0.3}>
          <p className="mt-10 text-center text-xs text-muted-foreground/50">
            More references available on request.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}

export { TestimonialsSection };