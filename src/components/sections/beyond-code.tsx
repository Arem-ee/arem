"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { SpotifyNowPlaying } from "@/components/spotify-now-playing";
import { FadeIn } from "@/components/animations";
import { favorites } from "@/data";
import type { Favorite } from "@/types";

function TiltFlipCard({ favorite, index }: { favorite: Favorite; index: number }) {
  const [flipped, setFlipped] = React.useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      className="group [perspective:1000px]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <motion.button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="block w-full cursor-pointer text-left"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        aria-label={`${favorite.title} — click to flip`}
      >
        <motion.div
          className="relative h-44 rounded-xl border bg-card p-5 shadow-sm transition-shadow group-hover:shadow-md"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
            style={{ backfaceVisibility: "hidden", transform: "translateZ(40px)" }}
          >
            <span className="text-4xl" aria-hidden="true">
              {favorite.emoji}
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {favorite.title}
            </h3>
            <p className="max-w-[240px] text-sm leading-relaxed text-foreground/80">
              {favorite.line}
            </p>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 opacity-0 transition-opacity group-hover:opacity-100">
              Click to flip
            </span>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl bg-secondary px-5 text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(40px)",
            }}
          >
            <p className="text-sm leading-relaxed text-secondary-foreground">
              {favorite.funFact}
            </p>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

function BeyondCodeSection() {
  return (
    <section id="beyond-code" className="border-t py-24 md:py-32">
      <Container size="xl">
        <FadeIn>
          <SectionTitle
            label="Beyond the code"
            title="What I'm into off the clock."
            description="A few favourites that keep the balance — click a card to flip it."
            className="mb-12"
          />
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {favorites.map((favorite, i) => (
            <TiltFlipCard key={favorite.title} favorite={favorite} index={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <SpotifyNowPlaying />
        </div>
      </Container>
    </section>
  );
}

export { BeyondCodeSection };
