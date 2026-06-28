"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data";


function TestimonialsSection() {
  const [[current, direction], setCurrent] = React.useState([0, 0]);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const total = testimonials.length;

  const goTo = React.useCallback((index: number) => {
    setCurrent((prev) => {
      const dir = index > prev[0] ? 1 : -1;
      return [index, dir];
    });
  }, []);

  const next = React.useCallback(() => {
    setCurrent((prev) => {
      const nextIndex = (prev[0] + 1) % total;
      return [nextIndex, 1];
    });
  }, [total]);

  const prev = React.useCallback(() => {
    setCurrent((prev) => {
      const prevIndex = (prev[0] - 1 + total) % total;
      return [prevIndex, -1];
    });
  }, [total]);

  React.useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  function pauseAutoScroll() {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function resumeAutoScroll() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000);
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  const [imgErrors, setImgErrors] = React.useState<Record<number, boolean>>({});
  const t = testimonials[current];

  return (
    <section id="testimonials" className="border-t py-24 md:py-32">
      <Container size="md">
        <SectionTitle
          label="Testimonials"
          title="Kind words from colleagues."
          description="What it&apos;s like working with me, from the people who know best."
          align="center"
          className="mb-16"
        />

        <div
          className="relative mx-auto max-w-2xl overflow-hidden"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="rounded-xl border bg-card p-8 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                  {imgErrors[current] ? (
                    <span>{t.name.charAt(0)}</span>
                  ) : (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                      onError={() => setImgErrors((prev) => ({ ...prev, [current]: true }))}
                    />
                  )}
                </div>
                <div>
                  <p className="text-base font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <blockquote className="text-base leading-relaxed text-muted-foreground">
                &ldquo;{t.review}&rdquo;
              </blockquote>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-foreground"
                      : "w-1.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { TestimonialsSection };
