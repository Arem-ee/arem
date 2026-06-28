"use client";

import { useRef } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

type UseRevealAnimationOptions = UseInViewOptions & {
  once?: boolean;
};

const defaultOptions: UseRevealAnimationOptions = {
  once: true,
  margin: "-80px",
};

export function useRevealAnimation(options: UseRevealAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...defaultOptions, ...options });

  return { ref, isInView };
}
