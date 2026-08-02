"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Goal, Clapperboard, Music2, BookOpen, Gamepad2, RotateCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { SpotifyNowPlaying } from "@/components/spotify-now-playing";
import { FadeIn } from "@/components/animations";
import { favorites } from "@/data";
import { getFavoriteImage } from "@/data/assets";
import type { Favorite } from "@/types";

const favoriteIcons: Record<string, LucideIcon> = {
  Goal,
  Clapperboard,
  Music2,
  BookOpen,
  Gamepad2,
};

function TiltFlipCard({ favorite, index }: { favorite: Favorite; index: number }) {
  const [flipped, setFlipped] = React.useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
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

  const Icon = favoriteIcons[favorite.icon] ?? Goal;

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
        aria-label={`${favorite.title} - click to flip`}
      >
        <motion.div
          className="relative overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow group-hover:shadow-md"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative flex flex-col"
            style={{ backfaceVisibility: "hidden", transform: "translateZ(30px)" }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={getFavoriteImage(favorite.image)}
                alt={favorite.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
              <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 text-foreground shadow-sm backdrop-blur">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {favorite.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/85">
                {favorite.line}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100">
                <RotateCw className="h-3 w-3" />
                Flip for a fun fact
              </span>
            </div>
          </div>

          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary p-5 text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(30px)",
            }}
          >
            <Icon className="h-6 w-6 text-secondary-foreground" />
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
    <section id="beyond-code" className="border-t py-16 md:py-32">
      <Container size="xl">
        <FadeIn>
          <SectionTitle
            label="Beyond the code"
            title="What I'm into off the clock."
            description="A few role models and favourites that keep the balance - click a card to flip it."
            className="mb-12"
          />
        </FadeIn>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
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
