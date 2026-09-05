"use client";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/animations";

function ValueSection() {
  return (
    <section
      aria-label="Why work with me"
      className="border-b py-16 md:py-24"
    >
      <Container size="md">
        <FadeIn from="none">
          <p className="whisper-label text-muted-foreground/60">Why me</p>
          <div className="mt-6 max-w-2xl space-y-5 text-sm leading-[1.8] text-muted-foreground sm:text-[15px]">
            <p>
              Here is the honest version. Plenty of people can write code.
              Fewer people can take a rough idea, own the whole thing end to
              end, and actually ship something that works and makes you
              money, without disappearing halfway through or running way
              over budget. That is the part I actually care about.
            </p>
            <p>
              I do not just build what is asked for, I figure out what the
              business actually needs first, build it clean enough to grow
              instead of breaking the moment it gets real traffic, and stay
              on it until it is genuinely working, not just handed off and
              forgotten. If you want someone who treats your problem like
              it is their own problem, that is me.
            </p>
            <p className="font-medium text-foreground">
              Below are a few of my many projects.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

export { ValueSection };
