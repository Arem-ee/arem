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
}

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function FadeIn({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  duration = 0.5,
  once = true,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Element = Tag as unknown as React.ElementType;
    return <Element className={cn(className)}>{children}</Element>;
  }

  return (
    <motion.div
      className={cn(Tag === "span" ? "inline-block" : undefined, className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export { FadeIn };
