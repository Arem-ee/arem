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
  from?: "left" | "right" | "top" | "bottom" | "none";
}

const offset = 8;

function buildVariants(from: FadeInProps["from"]): Variants {
  const x = from === "left" ? -offset : from === "right" ? offset : 0;
  const y = from === "top" ? -offset : from === "bottom" ? offset : 0;
  return {
    hidden: { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0 },
  };
}

function FadeIn({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  duration = 0.8,
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
      transition={{ duration, delay, ease: [0.22, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export { FadeIn };