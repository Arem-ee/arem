"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span" | "section";
  delay?: number;
  duration?: number;
  once?: boolean;
  from?: "left" | "right" | "none";
}

const offset = 12;

function buildVariants(from: FadeInProps["from"]): Variants {
  const x = from === "left" ? -offset : from === "right" ? offset : 0;
  return {
    hidden: { opacity: 0, x },
    visible: { opacity: 1, x: 0 },
  };
}

function FadeIn({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  duration = 0.7,
  once = true,
  from = "left",
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Element = Tag as unknown as React.ElementType;
    return <Element className={cn(className)}>{children}</Element>;
  }

  return (
    <motion.div
      className={cn(Tag === "span" ? "inline-block" : undefined, className)}
      variants={buildVariants(from)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export { FadeIn };